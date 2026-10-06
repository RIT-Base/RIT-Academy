// assets/js/labs/html-lab.js
//
// HTML Lab: editor CodeMirror (mode HTML) di satu sisi, iframe preview
// (srcdoc) di sisi lain. Preview auto-update dengan debounce 500ms, plus
// tombol Run untuk refresh manual.

import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";

const DEBOUNCE_MS = 500;

// Utilitas Resizer (Mendukung Mouse & Layar Sentuh Mobile)
export function makeResizable(container, topPane, resizer, bottomPane, onResize = null) {
  let isDragging = false;
  
  const startDrag = (e) => {
    isDragging = true;
    document.body.style.cursor = 'row-resize';
    bottomPane.style.pointerEvents = 'none';
    if(e.type === 'mousedown') e.preventDefault();
  };
  
  const onDrag = (e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const containerRect = container.getBoundingClientRect();
    let newHeight = clientY - containerRect.top;
    
    if (newHeight < 100) newHeight = 100;
    if (newHeight > containerRect.height - 100) newHeight = containerRect.height - 100;
    
    topPane.style.flex = `0 0 ${newHeight}px`;
    if (onResize) onResize();
  };
  
  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
      bottomPane.style.pointerEvents = '';
    }
  };
  
  resizer.addEventListener('mousedown', startDrag);
  resizer.addEventListener('touchstart', startDrag, {passive: true});
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, {passive: true});
  
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);
}

export function createHtmlEditor(mount, starterCode, { readOnly = false, onChange = null, extensions = [] } = {}) {
  const view = new EditorView({
    doc: starterCode || "",
    parent: mount,
    extensions: [
      basicSetup,              // basic editing, scrollbar, dll.
      html(),                  // sintaks HTML
      oneDark,                 // tema gelap
      keymap.of([indentWithTab]), // tab untuk indentasi
      EditorView.editable.of(!readOnly),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged && onChange) {
          onChange(update.state.doc.toString());
        }
      }),
      // Ekstensi tambahan yang diberikan dari luar
      ...extensions,
    ],
  });
  return view;
}


export function createHtmlLab({ mount, starter, showCheck = false, onCheck = null, checkLabel = "Check", autoSaveKey = null }) {
  mount.innerHTML = "";

  const keyToUse = autoSaveKey || (mount.id === "html-lab-mount" ? "rit_tools_html_draft" : null);
  const savedDraft = keyToUse ? localStorage.getItem(keyToUse) : null;
  const initialCode = (savedDraft !== null && savedDraft.trim() !== "") ? savedDraft : (starter || "");

  // Layout
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
        <span class="material-symbols-outlined" style="font-size: 14px;">visibility</span> Preview
      </button>
    </div>
  `;

  const topPane = document.createElement("div");
  topPane.className = "lab-pane-top";

  const headerTop = document.createElement("div");
  headerTop.className = "pane-header";
  headerTop.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-primary);">code</span> KODE HTML
    <div class="pane-header-actions">
      <button type="button" data-act="reset" style="background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; font-size: 10px;">
        <span class="material-symbols-outlined" style="font-size: 14px;">restart_alt</span> RESET
      </button>
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
  headerBottom.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:14px; color:var(--color-success);">visibility</span> LIVE PREVIEW
    <div class="pane-header-actions">
      <button type="button" data-act="back" title="Back" style="background:transparent; border:none; color:var(--color-text-muted); cursor:pointer; display:flex; align-items:center;">
        <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
      </button>
      <button type="button" data-act="forward" title="Forward" style="background:transparent; border:none; color:var(--color-text-muted); cursor:pointer; display:flex; align-items:center;">
        <span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>
      </button>
      <button type="button" data-act="refresh" title="Refresh" style="background:transparent; border:none; color:var(--color-text-muted); cursor:pointer; display:flex; align-items:center;">
        <span class="material-symbols-outlined" style="font-size:18px;">refresh</span>
      </button>
    </div>
  `;

  const previewShell = document.createElement("div");
  previewShell.className = "preview-shell";
  previewShell.style.flex = "1";

  const iframe = document.createElement("iframe");
  iframe.title = "Preview HTML";
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  previewShell.appendChild(iframe);
  bottomPane.appendChild(headerBottom);
  bottomPane.appendChild(previewShell);

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

  // ---------- Editor ----------
  const DEBOUNCE_MS = 500;
  let debounceTimer = null;
  const view = createHtmlEditor(editorShell, initialCode, {
    onChange: (code) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        renderPreview(code);
        if (keyToUse) {
          try { localStorage.setItem(keyToUse, code); } catch (e) {}
        }
      }, DEBOUNCE_MS);
    },
    extensions: [
      EditorView.theme({
        "&": {
          height: "100%",
          overflow: "auto"   // menampilkan scrollbar saat konten melebihi tinggi
        }
      })
    ]
  });

  function getCode() { return view.state.doc.toString(); }
  function setCode(code) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: code }
    });
    renderPreview(code);
  }

  // ---------- SISTEM NAVIGASI SENDIRI (history di parent) ----------
  let historyUrls = [];
  let historyIndex = -1;
  let isNavigatingProgrammatically = false;

  function addToHistory(url, replace = false) {
    if (replace) {
      // Ganti entri terakhir (misal untuk refresh)
      if (historyUrls.length > 0) {
        historyUrls[historyUrls.length - 1] = url;
      } else {
        historyUrls.push(url);
        historyIndex = 0;
      }
    } else {
      // Jika kita tidak di ujung, potong future
      if (historyIndex < historyUrls.length - 1) {
        historyUrls = historyUrls.slice(0, historyIndex + 1);
      }
      // Hindari duplikat berurutan
      if (historyUrls.length > 0 && historyUrls[historyUrls.length - 1] === url) {
        return;
      }
      historyUrls.push(url);
      historyIndex = historyUrls.length - 1;
    }
    updateNavButtons();
  }

  function navigateTo(url, replace = false) {
    if (isNavigatingProgrammatically) return;
    isNavigatingProgrammatically = true;
    addToHistory(url, replace);
    iframe.src = url;
    isNavigatingProgrammatically = false;
  }

  function goBack() {
    if (historyIndex > 0) {
      historyIndex--;
      isNavigatingProgrammatically = true;
      iframe.src = historyUrls[historyIndex];
      isNavigatingProgrammatically = false;
      updateNavButtons();
    }
  }

  function goForward() {
    if (historyIndex < historyUrls.length - 1) {
      historyIndex++;
      isNavigatingProgrammatically = true;
      iframe.src = historyUrls[historyIndex];
      isNavigatingProgrammatically = false;
      updateNavButtons();
    }
  }

  function refreshPreview() {
    if (historyUrls.length > 0) {
      const current = historyUrls[historyIndex];
      iframe.src = current; // reload
    }
  }

  function updateNavButtons() {
    const backBtn = layout.querySelector('[data-act="back"]');
    const fwdBtn = layout.querySelector('[data-act="forward"]');
    if (backBtn) backBtn.disabled = (historyIndex <= 0);
    if (fwdBtn) fwdBtn.disabled = (historyIndex >= historyUrls.length - 1);
  }

  // ---------- Render Preview (buat blob URL dan tambahkan ke history) ----------
  function buildBlobUrl(htmlCode) {
    // Script injeksi untuk menangkap klik link dan mengirim pesan ke parent
    const script = `
      <script>
        (function() {
          function handleLinkClick(e) {
            const link = e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
            const target = link.getAttribute('target');
            if (target === '_blank' || e.ctrlKey || e.metaKey) {
              // biarkan default (buka tab baru)
              return;
            }
            // Hanya tangani URL absolut (http, https, //)
            if (/^https?:\\/\\//i.test(href) || href.startsWith('//')) {
              e.preventDefault();
              window.parent.postMessage({ type: 'navigate', url: href }, '*');
            }
            // URL relatif tidak ditangani, biarkan default (tidak akan berfungsi)
          }
          document.addEventListener('click', handleLinkClick);
        })();
      <\/script>
    `;
    let modified = htmlCode;
    const bodyClose = '</body>';
    if (modified.includes(bodyClose)) {
      modified = modified.replace(bodyClose, script + bodyClose);
    } else {
      modified = modified + script;
    }
    const blob = new Blob([modified], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }

  function renderPreview(code) {
    const codeToRender = code || getCode();
    const blobUrl = buildBlobUrl(codeToRender);
    // Tambahkan ke history sebagai entri baru (replace false)
    // Tapi jika kita sedang di posisi history yang bukan terakhir, kita potong
    addToHistory(blobUrl, false);
    iframe.src = blobUrl;
    updateNavButtons();
  }

  // ---------- Reset ----------
  function reset() {
    if (keyToUse) {
      try { localStorage.removeItem(keyToUse); } catch (e) {}
    }
    // Reset history
    historyUrls = [];
    historyIndex = -1;
    setCode(starter || "");
    renderPreview(starter || "");
  }

  // ---------- PostMessage dari iframe ----------
  window.addEventListener('message', function(event) {
    // Pastikan pesan berasal dari iframe kita
    if (event.source !== iframe.contentWindow) return;
    if (event.data && event.data.type === 'navigate') {
      const url = event.data.url;
      if (url) {
        navigateTo(url, false);
      }
    }
  });

  // ---------- Pasang event listener tombol ----------
  layout.querySelector('[data-act="back"]')?.addEventListener('click', goBack);
  layout.querySelector('[data-act="forward"]')?.addEventListener('click', goForward);
  layout.querySelector('[data-act="refresh"]')?.addEventListener('click', refreshPreview);
  layout.querySelector('[data-act="reset"]')?.addEventListener('click', reset);

  // ---------- Opsional Check ----------
  if (showCheck && onCheck) {
    const checkBtn = document.createElement('button');
    checkBtn.textContent = checkLabel || 'Check';
    checkBtn.style.marginLeft = 'auto';
    checkBtn.addEventListener('click', async () => {
      renderPreview(); // refresh dulu
      await onCheck(getCode());
    });
    const navDiv = headerBottom.querySelector('div:last-child');
    if (navDiv) navDiv.appendChild(checkBtn);
  }

  // ---------- Inisialisasi ----------
  renderPreview(initialCode);
  updateNavButtons();

  return { getCode, setCode, run: refreshPreview, reset, view };
}