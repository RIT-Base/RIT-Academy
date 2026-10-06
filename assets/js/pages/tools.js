import { createHtmlLab } from "../labs/html-lab.js";
import { createPythonLab } from "../labs/python-lab.js";
import { createBlocklyLab } from "../labs/blockly-lab.js";
import { ProgressStore } from "../progress-store.js";

const HTML_STARTER = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halaman Percobaan</title>
</head>
<body>
  <h1>Halo, RIT Academy!</h1>
  <p>Coba edit kode ini. Hasilnya akan langsung muncul di panel Live Preview di bawah!</p>
</body>
</html>`;

const PYTHON_STARTER = `nama = input("Siapa namamu? ")
print(f"Halo, {nama}! Selamat datang di Python Lab RIT Academy.")

for i in range(1, 4):
    print(f"Ini baris ke-{i}")
`;

const tabs = ["html", "python", "blockly"];
const initialized = { html: false, python: false, blockly: false };

function activateTab(name) {
  tabs.forEach((t) => {
    document.getElementById(`tab-${t}`).setAttribute("aria-selected", String(t === name));
    document.getElementById(`panel-${t}`).classList.toggle("is-active", t === name);
  });
  initLab(name);
  ProgressStore.unlockAchievement("sandbox-tinkerer");
}

function initLab(name) {
  if (initialized[name]) return;
  initialized[name] = true;
  
  if (name === "html") {
    createHtmlLab({ 
      mount: document.getElementById("html-lab-mount"), 
      starter: HTML_STARTER, 
      showCheck: false,
      autoSaveKey: "rit_tools_html_draft"
    });
  } else if (name === "python") {
    createPythonLab({ 
      mount: document.getElementById("python-lab-mount"), 
      starter: PYTHON_STARTER, 
      showCheck: false,
      autoSaveKey: "rit_tools_python_draft"
    });
  } else if (name === "blockly") {
    // REVISI: Pemanggilan blockly disederhanakan karena UI IDE dan Event Listener
    // sudah dikelola langsung dari dalam file blockly-lab.js
    createBlocklyLab({
      mount: document.getElementById("blockly-mount-root")
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  tabs.forEach((t) => {
    document.getElementById(`tab-${t}`).addEventListener("click", () => activateTab(t));
  });
  // Tab HTML aktif secara default saat halaman pertama kali dimuat
  activateTab("html");
});