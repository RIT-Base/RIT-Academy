import { ProgressStore } from "../progress-store.js";
import { ContentLoader } from "../content-loader.js";

function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span> ${message}`;
  root.appendChild(toast);
  
  // Paksa reflow agar transisi CSS jalan
  void toast.offsetWidth;
  toast.classList.add("is-visible");
  
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

async function render() {
  const mount = document.getElementById("profil-mount");
  const index = await ContentLoader.loadCourseIndex();
  
  const doneList = ProgressStore.getDoneList();
  const profile = ProgressStore.getProfile();
  
  // Hitung total modul & cari modul aktif
  let totalModules = 0;
  let activeModuleStr = "Belum mulai";
  let isAllDone = false;
  
  if (index && index.courses) {
    let foundActive = false;
    index.courses.forEach(course => {
      const modules = [...(course.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      totalModules += modules.length;
      
      if (!foundActive) {
        const nextModul = modules.find(m => !ProgressStore.isDone(course.slug, m.slug));
        if (nextModul) {
          activeModuleStr = `${course.title} &rarr; ${nextModul.title}`;
          foundActive = true;
        }
      }
    });
    if (!foundActive && doneList.length > 0) isAllDone = true;
  }

  const percentage = totalModules === 0 ? 0 : Math.round((doneList.length / totalModules) * 100);
  
  let lastDate = "Belum ada";
  if (doneList.length > 0) {
    const dates = doneList.map(d => new Date(d.doneAt).getTime());
    const maxDate = new Date(Math.max(...dates));
    lastDate = maxDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }

  // --- HTML RENDER ---
  mount.innerHTML = `
    <!-- Kartu Identitas -->
    <div class="card" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;"><span class="material-symbols-outlined" style="color: var(--color-primary);">badge</span> Identitas Lokal</h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">Opsional — dipakai Sensei untuk mengenali file progress kamu 😉</p>
      
      <div class="form-group" style="margin: 0;">
        <label for="prof-nickname" class="form-label">Nama panggilan</label>
        <input type="text" id="prof-nickname" class="form-input" value="${profile.nickname}" placeholder="Misal: Budi">
      </div>
      <div class="form-group" style="margin: 0;">
        <label for="prof-kelas" class="form-label">Kelas</label>
        <input type="text" id="prof-kelas" class="form-input" value="${profile.kelas}" placeholder="Misal: X-2">
      </div>
      
      <button type="button" id="btn-save-profile" class="btn btn-outline" style="margin-top: auto; align-self: flex-start;">Simpan Profil</button>
    </div>

    <!-- Kartu Statistik -->
    <div class="card" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;"><span class="material-symbols-outlined" style="color: var(--color-accent);">monitoring</span> Statistik Belajar</h3>
      
      ${doneList.length === 0 ? `
        <div style="text-align: center; padding: var(--space-4) 0;">
          <span style="font-size: 3rem;">👋</span>
          <p class="text-muted" style="margin-top: var(--space-3); margin-bottom: var(--space-4);">Kamu belum menyelesaikan modul apapun. Yuk mulai perjalanan kodemu!</p>
          <a href="belajar.html" class="btn btn-primary">Mulai Belajar</a>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div style="background: var(--color-surface-alt); padding: var(--space-3); border-radius: var(--radius-md);">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 700; text-transform: uppercase;">Selesai</div>
            <div style="font-size: var(--fs-xl); font-weight: 800; color: var(--color-primary);">${doneList.length} <span style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-muted);">/ ${totalModules}</span></div>
          </div>
          <div style="background: var(--color-surface-alt); padding: var(--space-3); border-radius: var(--radius-md);">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 700; text-transform: uppercase;">Kelulusan</div>
            <div style="font-size: var(--fs-xl); font-weight: 800; color: var(--color-accent);">${percentage}%</div>
          </div>
        </div>
        
        <div style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Sedang Di</div>
          <div style="font-weight: 600; font-size: var(--fs-sm);">${isAllDone ? "🥳 Semua modul selesai!" : activeModuleStr}</div>
        </div>
        
        <div style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Terakhir Belajar</div>
          <div style="font-weight: 600; font-size: var(--fs-sm);">${lastDate}</div>
        </div>
      `}
    </div>

    <!-- Kartu Backup -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface-alt); border: 1px solid var(--color-border);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;"><span class="material-symbols-outlined">cloud_sync</span> Cadangkan & Pulihkan Progress</h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">Komputer lab sekolah di-reset tiap selesai dipakai (Deep Freeze) — unduh progressmu, simpan di flashdisk/HP, dan unggah lagi di komputer lain. Aman sampai fitur akun cloud hadir.</p>
      
      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <button type="button" id="btn-download" class="btn btn-primary" style="display: flex; align-items: center; gap: 6px;"><span class="material-symbols-outlined" style="font-size: 18px;">download</span> Download Progress</button>
        <button type="button" id="btn-upload" class="btn btn-outline" style="display: flex; align-items: center; gap: 6px; background: var(--color-surface);"><span class="material-symbols-outlined" style="font-size: 18px;">upload</span> Upload Progress</button>
      </div>
      ${localStorage.getItem("tcc_last_export") ? `<div style="font-size: 10px; color: var(--color-text-faint);">Terakhir export: ${localStorage.getItem("tcc_last_export")}</div>` : ""}
    </div>
  `;

  // --- LOGIKA EVENT LISTENER ---
  
  // Save Profile
  document.getElementById("btn-save-profile").addEventListener("click", () => {
    const nick = document.getElementById("prof-nickname").value.trim();
    const kls = document.getElementById("prof-kelas").value.trim();
    ProgressStore.setProfile({ nickname: nick, kelas: kls });
    showToast("Profil berhasil disimpan!");
  });

  // Download Progress
  document.getElementById("btn-download").addEventListener("click", () => {
    const data = ProgressStore.exportData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const a = document.createElement("a");
    a.href = url;
    a.download = `tcc-progress-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
    
    // Simpan history log kecil
    const logDate = new Date().toLocaleString("id-ID");
    localStorage.setItem("tcc_last_export", logDate);
    showToast("File progress berhasil diunduh.");
    render(); // refresh status kecil
  });

  // Upload Progress
  const fileInput = document.getElementById("import-file");
  document.getElementById("btn-upload").addEventListener("click", () => fileInput.click());
  
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed.app !== "tcc-academy" || parsed.version !== 1 || !Array.isArray(parsed.done)) {
          showToast("File tidak dikenali atau format salah.", "error");
          return;
        }
        
        if (confirm("Modul yang sudah ada akan digabung — riwayat dengan tanggal terbaru yang menang. Lanjutkan?")) {
          ProgressStore.importData(parsed.done);
          if (parsed.profil) ProgressStore.setProfile(parsed.profil);
          
          showToast("Progress berhasil dipulihkan!");
          render(); // render ulang keseluruhan stats
        }
      } catch (err) {
        showToast("Gagal membaca file. Pastikan file JSON valid.", "error");
      }
    };
    reader.readAsText(file);
    fileInput.value = ""; // Reset input
  });
}

document.addEventListener("DOMContentLoaded", render);