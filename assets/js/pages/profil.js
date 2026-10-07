// assets/js/pages/profil.js
// Dashboard profil, progres belajar, koleksi lencana (achievements), sertifikat kelulusan,
// dan manajemen status Cloud Sync & Dual-Storage Supabase.

import { ProgressStore, BADGES_CATALOG } from "../progress-store.js";
import { ContentLoader } from "../content-loader.js";
import { applyTheme, getCurrentTheme } from "../app.js";
import { openCertificateModal } from "../certificate.js";
import { fetchUserSubmissions } from "../supabase.js";

function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined">${
    type === "success" ? "check_circle" : "error"
  }</span> ${message}`;
  root.appendChild(toast);

  // Paksa reflow agar transisi CSS jalan
  void toast.offsetWidth;
  toast.classList.add("is-visible");

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatSyncTime(isoString) {
  if (!isoString) return "Belum pernah";
  try {
    const d = new Date(isoString);
    return `${d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}, ${d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  } catch (e) {
    return "Baru saja";
  }
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
  const isCloud = ProgressStore.isCloudConnected();
  const authUser = ProgressStore.getAuthUser();
  const lastSyncIso = ProgressStore.getLastSyncTime();
  const lastSyncText = formatSyncTime(lastSyncIso);

  // Ambil riwayat submission tugas akhir (TASK-104)
  let userSubmissions = [];
  if (isCloud && authUser?.id) {
    try {
      const subRes = await fetchUserSubmissions(authUser.id);
      userSubmissions = subRes.data || [];
    } catch (e) {
      console.warn("profil.js: fetchUserSubmissions error:", e);
    }
  }

  // Hitung total modul & cari modul aktif
  let totalModules = 0;
  let activeModuleStr = "Belum mulai";
  let isAllDone = false;
  const completedCourses = [];

  if (index && index.courses) {
    let foundActive = false;
    index.courses.forEach((course) => {
      const modules = [...(course.modules || [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );
      totalModules += modules.length;

      const isCompleted = ProgressStore.isCourseCompleted(course.slug, modules);
      if (isCompleted) {
        completedCourses.push(course);
      }

      if (!foundActive) {
        const nextModul = modules.find((m) => !ProgressStore.isDone(course.slug, m.slug));
        if (nextModul) {
          activeModuleStr = `${course.title} &rarr; ${nextModul.title}`;
          foundActive = true;
        }
      }
    });
    if (!foundActive && doneList.length > 0) isAllDone = true;
  }

  const percentage =
    totalModules === 0 ? 0 : Math.round((doneList.length / totalModules) * 100);

  let lastDate = "Belum ada";
  if (doneList.length > 0) {
    const dates = doneList.map((d) => new Date(d.doneAt).getTime());
    const maxDate = new Date(Math.max(...dates));
    lastDate = maxDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Identitas profil resolusi
  const displayName = profile.nickname || authUser?.nickname || "Siswa RIT";
  const displayClass = profile.kelas || "RIT Core";
  const githubUser = profile.github_username || authUser?.github_username || "";
  const avatarUrl = profile.avatar_url || authUser?.avatar_url || "";

  // --- HTML RENDER ---
  mount.innerHTML = `
    <!-- Kartu Status Akun & Cloud Sync (TASK-103) -->
    <div class="account-card" style="${!isCloud ? 'border-left: 4px solid var(--color-warning);' : 'border-left: 4px solid var(--color-primary);'}">
      <div class="account-card__info">
        <div class="account-card__avatar" style="${!isCloud ? 'border-color: var(--color-warning); box-shadow: none;' : ''}">
          ${
            avatarUrl
              ? `<img src="${avatarUrl}" alt="${githubUser || displayName}">`
              : `<span class="material-symbols-outlined" style="font-size: 36px; color: ${
                  isCloud ? 'var(--color-primary)' : 'var(--color-text-muted)'
                };">person</span>`
          }
        </div>
        <div class="account-card__meta">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: var(--fs-lg); font-weight: 800;">${displayName}</h3>
            ${
              isCloud
                ? `<span class="cloud-sync-pill is-synced">
                    <span class="material-symbols-outlined" style="font-size: 14px;">cloud_done</span> Terhubung ke Cloud
                   </span>`
                : `<span class="cloud-sync-pill is-offline">
                    <span class="material-symbols-outlined" style="font-size: 14px;">cloud_off</span> Mode Tamu (Lokal)
                   </span>`
            }
          </div>
          
          ${
            isCloud
              ? `<div style="font-size: var(--fs-xs); color: var(--color-text-muted); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  ${
                    githubUser
                      ? `<a href="https://github.com/${githubUser}" target="_blank" rel="noopener" style="font-family: var(--font-mono); font-weight: 700; color: var(--color-primary-dark); display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          @${githubUser}
                         </a> &bull;`
                      : ""
                  }
                  <span>Sinkronisasi terakhir: <strong>${lastSyncText}</strong></span>
                </div>`
              : `<p class="text-muted" style="margin: 0; font-size: var(--fs-xs); line-height: 1.4; max-width: 58ch;">
                  Progres kamu saat ini hanya tersimpan di perangkat ini. Hubungkan akun GitHub agar progres belajar, lencana, dan sertifikatmu aman tersimpan di cloud.
                </p>`
          }
        </div>
      </div>

      <div class="account-card__actions">
        ${
          isCloud
            ? `<button type="button" id="btn-sync-now" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
                <span class="material-symbols-outlined" style="font-size: 16px;">sync</span> Sinkronkan
               </button>
               <button type="button" id="btn-logout-profil" class="btn btn-outline btn-sm" style="display: inline-flex; align-items: center; gap: 6px; color: var(--color-danger); border-color: rgba(220, 38, 38, 0.3);">
                <span class="material-symbols-outlined" style="font-size: 16px;">logout</span> Keluar
               </button>`
            : `<a href="login.html" class="btn btn-github btn-sm" style="text-decoration: none; padding: 8px 16px;">
                <svg class="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>Masuk dengan GitHub</span>
               </a>`
        }
      </div>
    </div>

    <!-- Kartu Identitas Siswa -->
    <div class="card" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
        <span class="material-symbols-outlined" style="color: var(--color-primary);">badge</span> Identitas Siswa
      </h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Nama ini akan dicantumkan secara resmi pada Sertifikat Kelulusan RIT Academy milikmu.
      </p>
      
      <div class="form-group" style="margin: 0;">
        <label for="prof-nickname" class="form-label">Nama Lengkap / Panggilan</label>
        <input type="text" id="prof-nickname" class="form-input" value="${profile.nickname || ""}" placeholder="Misal: Kazuki Fujimaru">
      </div>
      <div class="form-group" style="margin: 0;">
        <label for="prof-kelas" class="form-label">Kelas / Angkatan</label>
        <input type="text" id="prof-kelas" class="form-input" value="${profile.kelas || ""}" placeholder="Misal: IF-2024 / RIT Core">
      </div>
      
      <button type="button" id="btn-save-profile" class="btn btn-outline" style="margin-top: auto; align-self: flex-start;">
        Simpan Profil
      </button>
    </div>

    <!-- Kartu Statistik -->
    <div class="card" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
        <span class="material-symbols-outlined" style="color: var(--color-accent);">monitoring</span> Statistik Belajar
      </h3>
      
      ${
        doneList.length === 0
          ? `
        <div style="text-align: center; padding: var(--space-4) 0;">
          <span style="font-size: 3rem;">👋</span>
          <p class="text-muted" style="margin-top: var(--space-3); margin-bottom: var(--space-4);">Kamu belum menyelesaikan modul apapun. Yuk mulai perjalanan kodemu!</p>
          <a href="paths.html" class="btn btn-primary">Mulai Belajar</a>
        </div>
      `
          : `
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
      `
      }
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
            <div class="badge-item-card ${isUnlocked ? "is-unlocked" : "is-locked"}" style="--badge-color: ${badge.color}; --badge-bg: ${badge.color}15;" title="${badge.desc}">
              <div class="badge-icon-wrap">
                <span class="material-symbols-outlined" style="font-size: 26px;">
                  ${isUnlocked ? badge.icon : "lock"}
                </span>
              </div>
              <div class="badge-info">
                <span class="badge-title">${badge.title}</span>
                <span class="badge-desc">${badge.desc}</span>
                <span class="badge-status-tag" style="color: ${
                  isUnlocked ? "var(--color-success)" : "var(--color-text-faint)"
                };">
                  <span class="material-symbols-outlined" style="font-size: 13px;">${
                    isUnlocked ? "check_circle" : "lock"
                  }</span>
                  ${isUnlocked ? "Diraih" : "Terkunci"}
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

      ${
        completedCourses.length === 0
          ? `
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
      `
          : `
        <div class="cert-collection-grid">
          ${completedCourses
            .map((c) => {
              const serial = ProgressStore.getCertificateSerial(c.slug);
              const courseDoneList = doneList.filter((d) => d.course === c.slug);
              let compDate = new Date();
              if (courseDoneList.length > 0) {
                const maxT = Math.max(
                  ...courseDoneList.map((d) => new Date(d.doneAt).getTime())
                );
                compDate = new Date(maxT);
              }
              const dateStr = compDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

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
            })
            .join("")}
        </div>
      `
      }
    </div>

    <!-- Tugas & Proyek Akhir Saya (TASK-104) -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2);">
        <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
          <span class="material-symbols-outlined" style="color: var(--color-primary);">upload_file</span> Tugas & Proyek Akhir Saya
        </h3>
        <span class="badge" style="background: var(--color-surface-alt); border: 1px solid var(--color-border); font-weight: 700; font-size: var(--fs-xs);">
          ${isCloud ? `${userSubmissions.length} Tugas Terkumpul` : 'Mode Tamu'}
        </span>
      </div>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Daftar proyek akhir yang telah kamu kumpulkan ke database RIT Academy untuk ditinjau mentor.
      </p>

      ${
        !isCloud
          ? `
        <div style="text-align: center; padding: var(--space-6) var(--space-4); background: var(--color-surface-alt); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--color-text-faint); margin-bottom: var(--space-2);">lock</span>
          <p style="margin: 0 0 var(--space-2) 0; font-weight: 600; color: var(--color-text);">Login Diperlukan untuk Melihat Riwayat Tugas.</p>
          <p class="text-muted" style="margin: 0 auto var(--space-4); max-width: 50ch; font-size: var(--fs-sm);">
            Masuk dengan akun GitHub untuk mengumpulkan dan memantau status peninjauan tugas akhirmu di cloud.
          </p>
          <a href="login.html" class="btn btn-github btn-sm" style="text-decoration: none; display: inline-flex;">
            <svg class="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>Masuk dengan GitHub</span>
          </a>
        </div>
      `
          : userSubmissions.length === 0
          ? `
        <div style="text-align: center; padding: var(--space-6) var(--space-4); background: var(--color-surface-alt); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
          <span class="material-symbols-outlined" style="font-size: 40px; color: var(--color-text-faint); margin-bottom: var(--space-2);">folder_open</span>
          <p style="margin: 0 0 var(--space-2) 0; font-weight: 600; color: var(--color-text);">Belum ada tugas akhir yang dikumpulkan.</p>
          <p class="text-muted" style="margin: 0 auto var(--space-4); max-width: 50ch; font-size: var(--fs-sm);">
            Selesaikan modul proyek akhir di learning path untuk mengumpulkan karya kodemu!
          </p>
          <a href="paths.html" class="btn btn-primary" style="font-size: var(--fs-sm);">
            <span class="material-symbols-outlined" style="font-size: 18px;">school</span> Jelajahi Learning Paths
          </a>
        </div>
      `
          : `
        <div class="submission-grid">
          ${userSubmissions
            .map((s) => {
              const courseMeta = index?.courses?.find((c) => c.slug === s.course_slug);
              const courseTitle = courseMeta ? courseMeta.title : s.course_slug;
              const dateStr = s.submitted_at
                ? new Date(s.submitted_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "-";
              const statusMap = {
                submitted: { label: "Menunggu Review", icon: "hourglass_empty" },
                reviewed: { label: "Sedang Ditinjau", icon: "rate_review" },
                approved: { label: "Disetujui", icon: "verified" },
                revision: { label: "Perlu Revisi", icon: "warning" },
              };
              const sInfo = statusMap[s.status] || statusMap.submitted;

              return `
                <div class="submission-item-card">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <span class="submission-pill is-${s.status || "submitted"}" style="font-size: 11px;">
                      <span class="material-symbols-outlined" style="font-size: 13px;">${sInfo.icon}</span> ${sInfo.label}
                    </span>
                    <span style="font-size: 11px; color: var(--color-text-muted);">${dateStr}</span>
                  </div>

                  <div>
                    <h4 style="margin: 0 0 6px 0; font-size: var(--fs-md);">${courseTitle}</h4>
                    ${
                      s.notes
                        ? `<p class="text-muted" style="margin: 0; font-size: var(--fs-xs); line-height: 1.5; font-style: italic;">"${s.notes}"</p>`
                        : ""
                    }
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 6px; margin-top: auto; padding-top: var(--space-2); border-top: 1px solid var(--color-border);">
                    <a href="${s.repo_url}" target="_blank" rel="noopener" class="submission-link-pill">
                      <span class="material-symbols-outlined" style="font-size: 15px;">code</span> Repositori GitHub
                    </a>
                    ${
                      s.demo_url
                        ? `
                      <a href="${s.demo_url}" target="_blank" rel="noopener" class="submission-link-pill" style="color: var(--color-accent);">
                        <span class="material-symbols-outlined" style="font-size: 15px;">open_in_new</span> Live Demo
                      </a>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `
      }
    </div>

    <!-- Kartu Pengaturan Tampilan (TASK-098) -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
        <span class="material-symbols-outlined" style="color: var(--color-primary-dark);">palette</span> Pengaturan Tampilan
      </h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Pilih tema tampilan RIT Academy (mode saat ini: <strong>${
          currentTheme === "dark" ? "Mode Gelap (Obsidian)" : "Mode Terang"
        }</strong>).
      </p>
      
      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <button type="button" id="prof-theme-light" class="btn ${
          currentTheme === "light" ? "btn-primary" : "btn-outline"
        }" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">light_mode</span> Mode Terang
        </button>
        <button type="button" id="prof-theme-dark" class="btn ${
          currentTheme === "dark" ? "btn-primary" : "btn-outline"
        }" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">dark_mode</span> Mode Gelap
        </button>
      </div>
    </div>

    <!-- Kartu Backup & Pemulihan Cadangan Manual -->
    <div class="card" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: var(--space-4); background: var(--color-surface-alt); border: 1px solid var(--color-border);">
      <h3 style="display: flex; align-items: center; gap: 8px; margin: 0;">
        <span class="material-symbols-outlined">save</span> Cadangkan & Pulihkan Progress Manual
      </h3>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
        Sebagai opsi tambahan jika kamu tidak menggunakan koneksi internet atau ingin menyimpan file JSON offline di flashdisk.
      </p>
      
      <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
        <button type="button" id="btn-download" class="btn btn-primary" style="display: flex; align-items: center; gap: 6px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">download</span> Download File JSON
        </button>
        <button type="button" id="btn-upload" class="btn btn-outline" style="display: flex; align-items: center; gap: 6px; background: var(--color-surface);">
          <span class="material-symbols-outlined" style="font-size: 18px;">upload</span> Upload File JSON
        </button>
      </div>
      ${
        localStorage.getItem("rit_last_export") || localStorage.getItem("tcc_last_export")
          ? `<div style="font-size: 10px; color: var(--color-text-faint);">Terakhir export file: ${
              localStorage.getItem("rit_last_export") ||
              localStorage.getItem("tcc_last_export")
            }</div>`
          : ""
      }
    </div>
  `;

  // --- LOGIKA EVENT LISTENER ---

  // Simpan Profil
  document.getElementById("btn-save-profile")?.addEventListener("click", () => {
    const nick = document.getElementById("prof-nickname").value.trim();
    const kls = document.getElementById("prof-kelas").value.trim();
    ProgressStore.setProfile({ nickname: nick, kelas: kls });
    showToast("Profil berhasil disimpan!");
    render();
  });

  // Sinkronkan Sekarang
  document.getElementById("btn-sync-now")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">sync</span> Menyinkronkan...`;

    const res = await ProgressStore.syncWithCloud();
    if (res.success) {
      showToast(`Sinkronisasi berhasil! ${res.count ?? ""} modul terverifikasi.`);
    } else {
      showToast("Sinkronisasi gagal. Periksa koneksi internet.", "error");
    }
    btn.innerHTML = originalText;
    btn.disabled = false;
    render();
  });

  // Logout Profil
  document.getElementById("btn-logout-profil")?.addEventListener("click", async (e) => {
    if (
      confirm("Apakah kamu yakin ingin keluar? Sesi tamu cadanganmu akan dipulihkan.")
    ) {
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">logout</span> Memproses keluar...`;
      await ProgressStore.logout();
      showToast("Berhasil keluar. Sesi tamu dipulihkan.");
      render();
    }
  });

  // Event Listener Buka Sertifikat
  document.querySelectorAll(".btn-view-cert").forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseSlug = btn.getAttribute("data-course-slug");
      const courseTitle = btn.getAttribute("data-course-title");
      const dateStr = btn.getAttribute("data-cert-date");
      const serial = btn.getAttribute("data-cert-serial");

      openCertificateModal({
        studentName: profile.nickname || authUser?.nickname || "Siswa RIT Academy",
        courseTitle: courseTitle,
        courseSlug: courseSlug,
        date: dateStr,
        serial: serial,
      });
    });
  });

  // Switch Theme
  document.getElementById("prof-theme-light")?.addEventListener("click", () => {
    applyTheme("light");
    try {
      localStorage.setItem("rit_theme", "light");
    } catch (e) {}
    showToast("Tema diubah ke Mode Terang!");
    render();
  });

  document.getElementById("prof-theme-dark")?.addEventListener("click", () => {
    applyTheme("dark");
    try {
      localStorage.setItem("rit_theme", "dark");
    } catch (e) {}
    showToast("Tema diubah ke Mode Gelap!");
    render();
  });

  // Download Progress JSON
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

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);

    const logDate = new Date().toLocaleString("id-ID");
    localStorage.setItem("rit_last_export", logDate);
    showToast("File progress berhasil diunduh.");
    render();
  });

  // Upload Progress JSON
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
          if (
            (parsed.app !== "tcc-academy" && parsed.app !== "rit-academy") ||
            !Array.isArray(parsed.done)
          ) {
            showToast("File tidak dikenali atau format salah.", "error");
            return;
          }

          if (
            confirm(
              "Modul yang sudah ada akan digabung — riwayat dengan tanggal terbaru yang menang. Lanjutkan?"
            )
          ) {
            ProgressStore.importData(parsed.done, {
              achievements: parsed.achievements,
              certificates: parsed.certificates,
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

document.addEventListener("DOMContentLoaded", () => {
  render();

  // Re-render saat ada event sync atau perubahan otentikasi
  window.addEventListener("rit_cloud_sync_completed", render);
  window.addEventListener("rit_auth_state_changed", render);
});
