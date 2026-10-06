// assets/js/labs/blockly-lab.js
//
// Blockly Lab: workspace block coding sederhana (logika, loop, matematika,
// variabel, teks, input-output) yang generate kode Python, lalu dijalankan
// lewat mesin Pyodide yang sama dengan Python Lab (assets/js/labs/python-lab.js).
//
// Blockly dimuat sebagai script klasik (bukan ESM) lewat CDN di tools.html:
//   <script src=".../blockly_compressed.js" defer></script>
//   <script src=".../blocks_compressed.js" defer></script>
//   <script src=".../python_compressed.js" defer></script>
//   <script src=".../msg/en.js" defer></script>
// sehingga `window.Blockly` (core) & `window.python.pythonGenerator` (generator
// Python) sudah siap saat modul ini jalan.

import { createPythonEditor, runPython } from "./python-lab.js";
import { makeResizable } from "./html-lab.js";

const TOOLBOX_XML = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <category name="Logika" colour="#4f46e5">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
  </category>
  <category name="Perulangan" colour="#0ea5b7">
    <block type="controls_repeat_ext">
      <value name="TIMES"><shadow type="math_number"><field name="NUM">5</field></shadow></value>
    </block>
    <block type="controls_whileUntil"></block>
  </category>
  <category name="Matematika" colour="#16a34a">
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_single"></block>
  </category>
  <category name="Teks" colour="#dc2626">
    <block type="text"></block>
    <block type="text_print"></block>
    <block type="text_prompt_ext">
      <value name="TEXT"><shadow type="text"><field name="TEXT">masukkan sesuatu:</field></shadow></value>
    </block>
  </category>
</xml>
`;

const DEFAULT_WORKSPACE_XML = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="text_print" x="12" y="16">
    <value name="TEXT">
      <shadow type="text"><field name="TEXT">Halo, RIT Academy!</field></shadow>
    </value>
  </block>
</xml>
`;

const BLOCKLY_SCRIPTS = [
  "https://unpkg.com/blockly/blockly_compressed.js",
  "https://unpkg.com/blockly/blocks_compressed.js",
  "https://unpkg.com/blockly/python_compressed.js",
  "https://unpkg.com/blockly/msg/en.js"
];

let blocklyLoadingPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = (err) => reject(new Error(`Gagal memuat ${src}`));
    document.head.appendChild(s);
  });
}

export async function ensureBlockly() {
  if (typeof window.Blockly !== "undefined" && typeof window.python !== "undefined") {
    return true;
  }
  if (!blocklyLoadingPromise) {
    blocklyLoadingPromise = (async () => {
      for (const src of BLOCKLY_SCRIPTS) {
        await loadScript(src);
      }
      return true;
    })();
  }
  return blocklyLoadingPromise;
}

export async function createBlocklyLab({ mount }) {
  if (typeof window.Blockly === "undefined" || typeof window.python === "undefined") {
    mount.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:320px; gap:12px; color:var(--color-text-muted); text-align:center; padding:var(--space-4);">
        <span class="material-symbols-outlined" style="font-size:36px; animation: spin 1s linear infinite; color:var(--color-primary);">sync</span>
        <p style="margin:0; font-size:var(--fs-sm);">Menyiapkan pustaka Blockly Lab (~1.5 MB)...</p>
      </div>
    `;
    try {
      await ensureBlockly();
    } catch (err) {
      mount.innerHTML = `<div class="empty-state card"><p style="color:var(--color-danger)">Gagal memuat Blockly dari CDN. Cek koneksi internet lalu coba lagi.</p></div>`;
      return null;
    }
  }

  mount.innerHTML = "";

  const layout = document.createElement("div");
  layout.className = "ide-layout view-editor";
  
  const mobileBar = document.createElement("div");
  mobileBar.className = "ide-mobile-bar";
  mobileBar.innerHTML = `
    <div class="lab-mobile-view-toggle">
      <button type="button" class="view-btn is-active" data-view="editor">
        <span class="material-symbols-outlined" style="font-size:14px">extension</span> Balok
      </button>
      <button type="button" class="view-btn" data-view="output">
        <span class="material-symbols-outlined" style="font-size:14px">terminal</span> Output
      </button>
    </div>
  `;

  const topPane = document.createElement("div");
  topPane.className = "lab-pane-top";

  const headerTop = document.createElement("div");
  headerTop.className = "pane-header";
  headerTop.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-warning);">extension</span> AREA BALOK
    <div class="pane-header-actions">
      <button type="button" id="blockly-run-btn" style="background: var(--color-accent); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; font-size: 10px; padding: 4px 12px; border-radius: var(--radius-pill); transition: opacity var(--transition-fast);">
        <span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> JALANKAN KE TERMINAL
      </button>
    </div>
  `;

  const workspaceMount = document.createElement("div");
  workspaceMount.style.flex = "1";
  workspaceMount.style.position = "relative";
  
  topPane.appendChild(headerTop);
  topPane.appendChild(workspaceMount);

  const resizer = document.createElement("div");
  resizer.className = "lab-resizer";

  const bottomPane = document.createElement("div");
  bottomPane.className = "blockly-bottom-pane lab-pane-bottom";

  const codeHalf = document.createElement("div");
  codeHalf.className = "blockly-code-half";
  
  const headerCode = document.createElement("div");
  headerCode.className = "pane-header";
  headerCode.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-accent);">terminal</span> KODE (GENERATE)`;
  
  const codeShell = document.createElement("div");
  codeShell.className = "editor-shell";
  codeShell.style.flex = "1";
  codeHalf.appendChild(headerCode);
  codeHalf.appendChild(codeShell);

  const outputHalf = document.createElement("div");
  outputHalf.style.flex = "1";
  outputHalf.style.display = "flex";
  outputHalf.style.flexDirection = "column";
  
  const headerOutput = document.createElement("div");
  headerOutput.className = "pane-header";
  headerOutput.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-text-muted);">subject</span> TERMINAL OUTPUT`;
  
  const outputShell = document.createElement("div");
  outputShell.className = "output-shell";
  outputShell.style.flex = "1";
  outputHalf.appendChild(headerOutput);
  outputHalf.appendChild(outputShell);

  bottomPane.appendChild(codeHalf);
  bottomPane.appendChild(outputHalf);

  layout.appendChild(mobileBar);
  layout.appendChild(topPane);
  layout.appendChild(resizer);
  layout.appendChild(bottomPane);
  mount.appendChild(layout);

  function switchView(viewName) {
    if (viewName === 'editor') {
      layout.classList.remove('view-output');
      layout.classList.add('view-editor');
      setTimeout(() => {
        if (window.Blockly && workspace) window.Blockly.svgResize(workspace);
      }, 50);
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

  const isMobile = window.innerWidth < 768;
  const workspace = window.Blockly.inject(workspaceMount, {
    toolbox: TOOLBOX_XML,
    trashcan: true,
    zoom: {
      controls: true,
      wheel: false,
      startScale: isMobile ? 0.72 : 0.9,
      maxScale: 1.5,
      minScale: 0.4
    },
  });
  const xml = window.Blockly.utils.xml.textToDom(DEFAULT_WORKSPACE_XML);
  window.Blockly.Xml.domToWorkspace(xml, workspace);

  const codeView = createPythonEditor(codeShell, "# Generate kode otomatis...", { readOnly: true });
  function setCodeView(text) { codeView.dispatch({ changes: { from: 0, to: codeView.state.doc.length, insert: text } }); }

  makeResizable(layout, topPane, resizer, bottomPane, () => {
    window.Blockly.svgResize(workspace);
  });

  workspace.addChangeListener(() => {
    try {
      const code = window.python.pythonGenerator.workspaceToCode(workspace);
      setCodeView(code.trim() || "# (area masih kosong)");
    } catch (e) {
      setCodeView(`# Error: ${e.message}`);
    }
  });

  function appendOutputLine(text, kind = "stdout") {
    const line = document.createElement("div");
    line.className = `out-line-${kind}`;
    line.textContent = text;
    outputShell.appendChild(line);
    outputShell.scrollTop = outputShell.scrollHeight;
  }

  async function run() {
    if (window.innerWidth < 768) {
      switchView('output');
    }
    const code = window.python.pythonGenerator.workspaceToCode(workspace);
    const runBtn = layout.querySelector("#blockly-run-btn");
    
    if (runBtn) {
      runBtn.disabled = true;
      runBtn.style.opacity = "0.7";
      runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; animation: spin 1s linear infinite;">sync</span> MEMUAT...`;
    }

    outputShell.innerHTML = "";
    if (!code.trim()) { 
      appendOutputLine("Susun block dulu.", "info"); 
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.style.opacity = "1";
        runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> JALANKAN KE TERMINAL`;
      }
      return; 
    }
    
    appendOutputLine("Menjalankan...", "info");
    const result = await runPython(code, (kind, msg) => appendOutputLine(msg, "info"));
    outputShell.innerHTML = "";
    
    if (result.stdout) appendOutputLine(result.stdout.replace(/\n$/, ""), "stdout");
    if (result.stderr) appendOutputLine(result.stderr.replace(/\n$/, ""), "stderr");

    if (runBtn) {
      runBtn.disabled = false;
      runBtn.style.opacity = "1";
      runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> JALANKAN KE TERMINAL`;
    }
  }

  layout.querySelector("#blockly-run-btn").addEventListener("click", run);
  window.addEventListener("resize", () => window.Blockly.svgResize(workspace));

  return { workspace, run };
}