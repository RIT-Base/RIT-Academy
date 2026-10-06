import { EditorView, basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { makeResizable } from "./html-lab.js"; 

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.js";
export const RUN_TIMEOUT_MS = 10000;
let pyodideInstance = null;
let pyodideLoadingPromise = null;

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = () => resolve(); s.onerror = () => reject(new Error("Gagal memuat Pyodide."));
    document.head.appendChild(s);
  });
}

export async function ensurePyodide(onStatus) {
  if (pyodideInstance) return pyodideInstance;
  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      onStatus?.("loading", "Memuat Python (pertama kali agak lama)...");
      await loadScriptOnce(PYODIDE_CDN);
      const pyodide = await window.loadPyodide();
      pyodide.globals.set("_tcc_native_input", (promptText) => {
        const val = window.prompt(promptText ?? "");
        return val === null ? "" : val;
      });
      await pyodide.runPythonAsync(`
import builtins as _tcc_builtins
def _tcc_input_override(prompt=""):
    _val = _tcc_native_input(str(prompt))
    print(f"{prompt}{_val}")
    return _val
_tcc_builtins.input = _tcc_input_override
      `);
      pyodideInstance = pyodide;
      onStatus?.("ready", "Python siap.");
      return pyodide;
    })().catch((err) => {
      pyodideLoadingPromise = null;
      onStatus?.("error", `Gagal memuat Python: ${err.message}`);
      throw err;
    });
  }
  return pyodideLoadingPromise;
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("TIMEOUT")), ms); });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export async function runPython(code, onStatus) {
  const pyodide = await ensurePyodide(onStatus);
  let stdout = ""; let stderr = "";
  pyodide.setStdout({ batched: (msg) => { stdout += msg + "\n"; } });
  pyodide.setStderr({ batched: (msg) => { stderr += msg + "\n"; } });
  try {
    await withTimeout(pyodide.runPythonAsync(code), RUN_TIMEOUT_MS);
    return { stdout, stderr, ok: true, timedOut: false };
  } catch (err) {
    if (err.message === "TIMEOUT") return { stdout, stderr: stderr + "Eksekusi dihentikan (Timeout 10s). Kemungkinan infinite loop.", ok: false, timedOut: true };
    return { stdout, stderr: stderr + String(err.message || err), ok: false, timedOut: false };
  } finally {
    pyodide.setStdout({}); pyodide.setStderr({});
  }
}

export async function runPythonAndEval(code, expr, onStatus) {
  const pyodide = await ensurePyodide(onStatus);
  let stdout = ""; let stderr = "";
  pyodide.setStdout({ batched: (msg) => { stdout += msg + "\n"; } });
  pyodide.setStderr({ batched: (msg) => { stderr += msg + "\n"; } });
  try {
    await withTimeout(pyodide.runPythonAsync(code), RUN_TIMEOUT_MS);
    const result = await withTimeout(pyodide.runPythonAsync(`str(${expr})`), RUN_TIMEOUT_MS);
    return { stdout, stderr, ok: true, result };
  } catch (err) {
    const msg = err.message === "TIMEOUT" ? "Timeout" : String(err.message || err);
    return { stdout, stderr: stderr + msg, ok: false, result: null };
  } finally {
    pyodide.setStdout({}); pyodide.setStderr({});
  }
}

export function createPythonEditor(mount, starterCode, { readOnly = false, onChange = null } = {}) {
  const view = new EditorView({
    doc: starterCode || "",
    parent: mount,
    extensions: [
      basicSetup,
      python(),
      oneDark,
      keymap.of([indentWithTab]),
      EditorView.editable.of(!readOnly),
      EditorView.lineWrapping,
      ...(onChange ? [EditorView.updateListener.of((update) => {
        if (update.docChanged) onChange(update.state.doc.toString());
      })] : [])
    ],
  });
  return view;
}

function appendOutputLine(outputEl, text, kind = "stdout") {
  const line = document.createElement("div");
  line.className = `out-line-${kind}`;
  line.textContent = text;
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

export function createPythonLab({ mount, starter, showCheck = false, onCheck = null, checkLabel = "Check", autoSaveKey = null }) {
  mount.innerHTML = "";

  const keyToUse = autoSaveKey || (mount.id === "python-lab-mount" ? "rit_tools_python_draft" : null);
  const savedDraft = keyToUse ? localStorage.getItem(keyToUse) : null;
  const initialCode = (savedDraft !== null && savedDraft.trim() !== "") ? savedDraft : (starter || "");
  
  const layout = document.createElement("div");
  layout.className = "ide-layout view-editor";
  
  const mobileBar = document.createElement("div");
  mobileBar.className = "ide-mobile-bar";
  mobileBar.innerHTML = `
    <div class="lab-mobile-view-toggle">
      <button type="button" class="view-btn is-active" data-view="editor">
        <span class="material-symbols-outlined" style="font-size: 14px;">edit</span> Editor
      </button>
      <button type="button" class="view-btn" data-view="output">
        <span class="material-symbols-outlined" style="font-size: 14px;">terminal</span> Output
      </button>
    </div>
  `;

  const topPane = document.createElement("div");
  topPane.className = "lab-pane-top";

  const headerTop = document.createElement("div");
  headerTop.className = "pane-header";
  headerTop.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-accent);">terminal</span> SCRIPT PYTHON
    <div class="pane-header-actions">
      <span class="lab-status" data-status style="color: var(--color-warning); text-transform: none;"></span>
      <button type="button" data-act="reset" style="background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; font-size: 10px;">
        <span class="material-symbols-outlined" style="font-size: 14px;">restart_alt</span> RESET
      </button>
      <button type="button" data-act="run" style="background: var(--color-accent); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; font-size: 10px; padding: 4px 12px; border-radius: var(--radius-pill); transition: opacity var(--transition-fast);">
        <span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> JALANKAN
      </button>
      ${showCheck ? `<button type="button" data-act="check" style="background: var(--color-primary); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; font-size: 10px; padding: 4px 12px; border-radius: var(--radius-pill);"><span class="material-symbols-outlined" style="font-size: 14px;">fact_check</span> ${checkLabel}</button>` : ""}
    </div>
  `;
  
  const editorShell = document.createElement("div");
  editorShell.className = "editor-shell";
  editorShell.style.flex = "1";
  
  topPane.appendChild(headerTop);
  topPane.appendChild(editorShell);

  const resizer = document.createElement("div");
  resizer.className = "lab-resizer";

  const bottomPane = document.createElement("div");
  bottomPane.className = "lab-pane-bottom";

  const headerBottom = document.createElement("div");
  headerBottom.className = "pane-header";
  headerBottom.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-text-muted);">subject</span> TERMINAL OUTPUT`;

  const outputShell = document.createElement("div");
  outputShell.className = "output-shell";
  outputShell.style.flex = "1";
  
  bottomPane.appendChild(headerBottom);
  bottomPane.appendChild(outputShell);

  layout.appendChild(mobileBar);
  layout.appendChild(topPane);
  layout.appendChild(resizer);
  layout.appendChild(bottomPane);
  mount.appendChild(layout);

  makeResizable(layout, topPane, resizer, bottomPane);

  function switchView(viewName) {
    if (viewName === 'editor') {
      layout.classList.remove('view-output');
      layout.classList.add('view-editor');
    } else {
      layout.classList.remove('view-editor');
      layout.classList.add('view-output');
    }
    layout.querySelectorAll('.lab-mobile-view-toggle button').forEach(b => {
      b.classList.toggle('is-active', b.dataset.view === viewName);
    });
  }

  layout.querySelectorAll('.lab-mobile-view-toggle button').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      switchView(b.dataset.view);
    });
  });

  const statusEl = headerTop.querySelector("[data-status]");
  let debounceTimer = null;
  const view = createPythonEditor(editorShell, initialCode, {
    onChange: (code) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (keyToUse) {
          try { localStorage.setItem(keyToUse, code); } catch (e) {}
        }
      }, 500);
    }
  });

  function getCode() { return view.state.doc.toString(); }
  function setCode(code) { view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } }); }
  function reset() {
    if (keyToUse) {
      try { localStorage.removeItem(keyToUse); } catch (e) {}
    }
    setCode(starter || "");
    outputShell.innerHTML = "";
  }

  async function run() {
    if (window.innerWidth < 768) {
      switchView('output');
    }
    const runBtn = layout.querySelector('[data-act="run"]');
    if (runBtn) {
      runBtn.disabled = true;
      runBtn.style.opacity = "0.7";
      runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; animation: spin 1s linear infinite;">sync</span> MEMUAT...`;
    }

    outputShell.innerHTML = "";
    appendOutputLine(outputShell, "Menyiapkan environment Python...", "info");
    
    const setStatus = (kind, msg) => { statusEl.textContent = msg; };
    const result = await runPython(getCode(), setStatus);
    
    outputShell.innerHTML = "";
    if (result.stdout) appendOutputLine(outputShell, result.stdout.replace(/\n$/, ""), "stdout");
    if (result.stderr) appendOutputLine(outputShell, result.stderr.replace(/\n$/, ""), "stderr");
    if (!result.stdout && !result.stderr) appendOutputLine(outputShell, "(tidak ada output)", "info");
    statusEl.textContent = "";

    if (runBtn) {
      runBtn.disabled = false;
      runBtn.style.opacity = "1";
      runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> JALANKAN`;
    }
    
    return result;
  }

  layout.querySelector('[data-act="run"]').addEventListener("click", run);
  layout.querySelector('[data-act="reset"]').addEventListener("click", reset);

  // HACK PRELOAD: Mulai mendownload mesin Python 1 detik setelah editor HTML tampil di layar
  setTimeout(() => {
    ensurePyodide().catch(() => console.log("Preload tertunda, akan dimuat saat tombol Run diklik."));
  }, 1000);

  return { getCode, setCode, run, reset, view };
}