// assets/js/pages/profil.js
// Dashboard profil, progres belajar, koleksi lencana (achievements), dan sertifikat kelulusan.

import { ProgressStore, BADGES_CATALOG } from "../progress-store.js";
import { ContentLoader } from "../content-loader.js";
import { applyTheme, getCurrentTheme } from "../app.js";
import { openCertificateModal } from "../certificate.js";

function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined">${type === "success" ? "check_circle" : "error"}</span> ${message}`;
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
  if (!mount) return;
  const index = await ContentLoader.loadCourseIndex();
  
  // Evaluasi dan buka otomatis lencana untuk course yang sudah 100% tuntas
  if (index && Array.isArray(index.courses)) {
    index.courses.forEach((c) => {
      ProgressStore.isCourseCompleted(c.slug, c.modules);
    });
  }

  const doneList = ProgressStore.getDoneList();
  const profile = ProgressStore.getProfile();
  const currentTheme = getCurrentTheme();
  const unlockedBadges = ProgressStore.getUnlockedAchievements();
  
  // Hitung total modul & cari modul aktif
  let totalModules = 0;
  let activeModuleStr = "Belum mulai";
  let isAllDone = false;
  const completedCourses = [];
  
  if (index && index.courses) {
    let foundActive = false;
    index.courses.forEach(course => {
      const modules = [...(course.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      totalModules += modules.length;

      const isCompleted = ProgressStore.isCourseCompleted(course.slug, modules);
      if (isCompleted) {
        completedCourses.push(course);
      }
      
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
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">Nama ini akan dicantumkan secara resmi pada Sertifikat Kelulusan RIT Academy milikmu.</p>
      
      <div class="form-group" style="margin: 0;">
        <label for="prof-nickname" class="form-label">Nama Lengkap / Panggilan</label>
        <input type="text" id="prof-nickname" class="form-input" value="${profile.nickname}" placeholder="Misal: Kazuki Fujimaru">
      </div>
      <div class="form-group" style="margin: 0;">
        <label for="prof-kelas" class="form-label">Kelas / Angkatan</label>
        <input type="text" id="prof-kelas" class="form-input" value="${profile.kelas}" placeholder="Misal: IF-2024 / RIT Core">
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
          <a href="paths.html" class="btn btn-primary">Mulai Belajar</a>
        </div>
      ` : `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div style="background: var(--color-surface-alt); padding: var(--space-3); border-radius: var(--radius-md);">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 700; text-transform: uppercase;">Selesai</div>
            <div style="font-size: var(--fs-xl); font-weight: 800; color: var(--color-primary-dark);">${doneList.length} <span style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-muted);">/ ${totalModules}</span></div>
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

    <!-- Koleksi Lencana (Achievements, TASK-101) -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2);">
        <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
          <span class="material-symbols-outlined" style="color: #f59e0b;">military_tech</span> Koleksi Lencana Pencapaian
        </h3>
        <span class="badge" style="background: var(--color-surface-alt); border: 1px solid var(--color-border); font-weight: 700; font-size: var(--fs-xs);">
          ${unlockedBadges.length} / ${BADGES_CATALOG.length} Terbuka
        </span>
      </div>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Kumpulkan lencana prestisius dengan menuntaskan setiap jalur pembelajaran dan berpartisipasi aktif dalam ekosistem RIT Academy.
      </p>

      <div class="badge-collection-grid">
        ${BADGES_CATALOG.map((badge) => {
          const isUnlocked = ProgressStore.isAchievementUnlocked(badge.id);
          return `
            <div class="badge-item-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}" style="--badge-color: ${badge.color}; --badge-bg: ${badge.color}15;" title="${badge.desc}">
              <div class="badge-icon-wrap">
                <span class="material-symbols-outlined" style="font-size: 26px;">
                  ${isUnlocked ? badge.icon : 'lock'}
                </span>
              </div>
              <div class="badge-info">
                <span class="badge-title">${badge.title}</span>
                <span class="badge-desc">${badge.desc}</span>
                <span class="badge-status-tag" style="color: ${isUnlocked ? 'var(--color-success)' : 'var(--color-text-faint)'};">
                  <span class="material-symbols-outlined" style="font-size: 13px;">${isUnlocked ? 'check_circle' : 'lock'}</span>
                  ${isUnlocked ? 'Diraih' : 'Terkunci'}
                </span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Sertifikat Kelulusan Saya (TASK-101) -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2);">
        <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
          <span class="material-symbols-outlined" style="color: var(--color-primary);">workspace_premium</span> Sertifikat Kelulusan Saya
        </h3>
        <span class="badge" style="background: var(--color-surface-alt); border: 1px solid var(--color-border); font-weight: 700; font-size: var(--fs-xs);">
          ${completedCourses.length} Sertifikat Resmi
        </span>
      </div>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Sertifikat berstandar industri dengan nomor serial unik terverifikasi yang dapat kamu unduh kapan saja sebagai portofolio keahlianmu.
      </p>

      ${completedCourses.length === 0 ? `
        <div style="text-align: center; padding: var(--space-6) var(--space-4); background: var(--color-surface-alt); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--color-text-faint); margin-bottom: var(--space-2);">history_edu</span>
          <p style="margin: 0 0 var(--space-3) 0; font-weight: 600; color: var(--color-text);">Belum ada sertifikat kelulusan.</p>
          <p class="text-muted" style="margin: 0 auto var(--space-4); max-width: 50ch; font-size: var(--fs-sm);">
            Selesaikan salah satu learning path hingga 100% untuk mengklaim dan menerbitkan sertifikat kelulusan pertamamu!
          </p>
          <a href="paths.html" class="btn btn-primary" style="font-size: var(--fs-sm);">
            <span class="material-symbols-outlined" style="font-size: 18px;">school</span> Jelajahi Learning Paths
          </a>
        </div>
      ` : `
        <div class="cert-collection-grid">
          ${completedCourses.map((c) => {
            const serial = ProgressStore.getCertificateSerial(c.slug);
            const courseDoneList = doneList.filter(d => d.course === c.slug);
            let compDate = new Date();
            if (courseDoneList.length > 0) {
              const maxT = Math.max(...courseDoneList.map(d => new Date(d.doneAt).getTime()));
              compDate = new Date(maxT);
            }
            const dateStr = compDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

            return `
              <div class="cert-item-card">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span class="badge" style="background: var(--color-primary-light); color: var(--color-primary-dark); font-weight: 700; font-size: 10px;">
                    RESMI &bull; TERVERIFIKASI
                  </span>
                  <span style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--color-text-muted);">
                    ${serial}
                  </span>
                </div>
                <div>
                  <h4 style="margin: 0 0 4px 0; font-size: var(--fs-md);">${c.title}</h4>
                  <p class="text-muted" style="margin: 0; font-size: var(--fs-xs);">Tuntas pada: ${dateStr}</p>
                </div>
                <button type="button" class="btn btn-outline btn-view-cert" data-course-slug="${c.slug}" data-course-title="${c.title}" data-cert-date="${dateStr}" data-cert-serial="${serial}" style="margin-top: auto; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: var(--fs-sm);">
                  <span class="material-symbols-outlined" style="font-size: 18px;">visibility</span> Buka Sertifikat
                </button>
              </div>
            `;
          }).join("")}
        </div>
      `}
    </div>

    <!-- Kartu Pengaturan Tampilan (TASK-098) -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
        <span class="material-symbols-outlined" style="color: var(--color-primary-dark);">palette</span> Pengaturan Tampilan
      </h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Pilih tema tampilan RIT Academy (mode saat ini: <strong>${currentTheme === "dark" ? "Mode Gelap (Obsidian)" : "Mode Terang"}</strong>).
      </p>
      
      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <button type="button" id="prof-theme-light" class="btn ${currentTheme === "light" ? "btn-primary" : "btn-outline"}" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">light_mode</span> Mode Terang
        </button>
        <button type="button" id="prof-theme-dark" class="btn ${currentTheme === "dark" ? "btn-primary" : "btn-outline"}" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">dark_mode</span> Mode Gelap
        </button>
      </div>
    </div>

    <!-- Kartu Backup -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface-alt); border: 1px solid var(--color-border);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;"><span class="material-symbols-outlined">cloud_sync</span> Cadangkan & Pulihkan Progress</h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">Komputer lab kampus sering di-reset tiap sesi — unduh progressmu (lengkap dengan profil, lencana, dan sertifikat), simpan di flashdisk/cloud drive, dan unggah lagi di perangkat lain.</p>
      
      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <button type="button" id="btn-download" class="btn btn-primary" style="display: flex; align-items: center; gap: 6px;"><span class="material-symbols-outlined" style="font-size: 18px;">download</span> Download Progress</button>
        <button type="button" id="btn-upload" class="btn btn-outline" style="display: flex; align-items: center; gap: 6px; background: var(--color-surface);"><span class="material-symbols-outlined" style="font-size: 18px;">upload</span> Upload Progress</button>
      </div>
      ${localStorage.getItem("rit_last_export") || localStorage.getItem("tcc_last_export") ? `<div style="font-size: 10px; color: var(--color-text-faint);">Terakhir export: ${localStorage.getItem("rit_last_export") || localStorage.getItem("tcc_last_export")}</div>` : ""}
    </div>
  `;

  // --- LOGIKA EVENT LISTENER ---
  
  // Save Profile
  document.getElementById("btn-save-profile")?.addEventListener("click", () => {
    const nick = document.getElementById("prof-nickname").value.trim();
    const kls = document.getElementById("prof-kelas").value.trim();
    ProgressStore.setProfile({ nickname: nick, kelas: kls });
    showToast("Profil berhasil disimpan!");
  });

  // Event Listener Buka Sertifikat
  document.querySelectorAll(".btn-view-cert").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseSlug = btn.getAttribute("data-course-slug");
      const courseTitle = btn.getAttribute("data-course-title");
      const dateStr = btn.getAttribute("data-cert-date");
      const serial = btn.getAttribute("data-cert-serial");

      openCertificateModal({
        studentName: profile.nickname || "Siswa RIT Academy",
        courseTitle: courseTitle,
        courseSlug: courseSlug,
        date: dateStr,
        serial: serial
      });
    });
  });

  // Switch Theme
  document.getElementById("prof-theme-light")?.addEventListener("click", () => {
    applyTheme("light");
    try { localStorage.setItem("rit_theme", "light"); } catch (e) {}
    showToast("Tema diubah ke Mode Terang!");
    render();
  });

  document.getElementById("prof-theme-dark")?.addEventListener("click", () => {
    applyTheme("dark");
    try { localStorage.setItem("rit_theme", "dark"); } catch (e) {}
    showToast("Tema diubah ke Mode Gelap!");
    render();
  });

  // Download Progress
  document.getElementById("btn-download")?.addEventListener("click", () => {
    const data = ProgressStore.exportData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const a = document.createElement("a");
    a.href = url;
    a.download = `rit-progress-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
    
    const logDate = new Date().toLocaleString("id-ID");
    localStorage.setItem("rit_last_export", logDate);
    showToast("File progress berhasil diunduh.");
    render();
  });

  // Upload Progress
  const fileInput = document.getElementById("import-file");
  document.getElementById("btn-upload")?.addEventListener("click", () => fileInput?.click());
  
  if (fileInput) {
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          if ((parsed.app !== "tcc-academy" && parsed.app !== "rit-academy") || !Array.isArray(parsed.done)) {
            showToast("File tidak dikenali atau format salah.", "error");
            return;
          }
          
          if (confirm("Modul yang sudah ada akan digabung — riwayat dengan tanggal terbaru yang menang. Lanjutkan?")) {
            ProgressStore.importData(parsed.done, {
              achievements: parsed.achievements,
              certificates: parsed.certificates
            });
            if (parsed.profil) ProgressStore.setProfile(parsed.profil);
            
            showToast("Progress berhasil dipulihkan!");
            render();
          }
        } catch (err) {
          showToast("Gagal membaca file. Pastikan file JSON valid.", "error");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    };
  }
}

document.addEventListener("DOMContentLoaded", render);
