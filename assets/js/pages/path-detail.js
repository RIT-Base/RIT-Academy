import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";
import { getPathColorTheme } from "./paths.js";
import { openCertificateModal } from "../certificate.js";
import { fetchSubmission } from "../supabase.js";

async function render() {
  const courseSlug = new URLSearchParams(window.location.search).get("course");
  const mainEl = document.getElementById("main");
  
  if (!courseSlug) {
    if (mainEl) mainEl.innerHTML = `<div class="container empty-state" style="margin-top: 50px;">Parameter course tidak ditemukan.</div>`;
    return;
  }

  const index = await ContentLoader.loadCourseIndex();
  const course = index?.courses?.find((x) => x.slug === courseSlug);

  if (!course) {
    if (mainEl) {
      mainEl.innerHTML = `
        <div class="container empty-state" style="margin-top: 50px;">
          <p style="font-size: 2rem;">😕</p>
          <h2>Course tidak ditemukan.</h2>
          <a href="paths.html" class="btn btn-primary" style="margin-top: var(--space-4);">Kembali ke Learning Paths</a>
        </div>
      `;
    }
    return;
  }

  const theme = getPathColorTheme(course.slug);
  const modules = [...(course.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const totalModules = modules.length;
  let doneCount = 0;
  
  modules.forEach(mod => {
    if (ProgressStore.isDone(course.slug, mod.slug)) {
      doneCount++;
    }
  });
  
  const progressPercent = totalModules === 0 ? 0 : Math.round((doneCount / totalModules) * 100);

  // 1. Render Header Dinamis Sesuai Warna Course (TASK-099)
  const headerMount = document.getElementById("path-header-mount");
  if (headerMount) {
    headerMount.innerHTML = `
      <div class="path-header-banner" style="--course-color: ${theme.color}; --course-border: ${theme.border}; --course-bg: ${theme.bg};">
        <!-- Ornamen Glow Dinamis Warna Course -->
        <div class="banner-glow-1"></div>
        <div class="banner-glow-2"></div>
        
        <div class="container banner-container">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-3);">
            <a href="paths.html" class="banner-back-btn" aria-label="Kembali ke Learning Paths" title="Kembali ke Learning Paths">
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
            </a>
            <span class="banner-badge">RIT COURSE PATH</span>
          </div>
          <h1 class="banner-title">${course.title}</h1>
          <p class="banner-desc">${course.description || "Jalur pembelajaran komprehensif untuk mengembangkan keahlianmu."}</p>
          
          <div class="banner-progress-wrap">
            <div class="banner-progress-labels">
              <span>Overall Progress</span>
              <span class="banner-progress-percent">${progressPercent}%</span>
            </div>
            <div class="banner-progress-track">
              <div class="banner-progress-bar" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Render Sidebar
  let submissionData = null;
  const authUser = ProgressStore.getAuthUser();
  if (authUser?.id) {
    try {
      const subRes = await fetchSubmission(authUser.id, course.slug);
      submissionData = subRes.data;
    } catch (e) {
      console.warn("path-detail.js: fetchSubmission error:", e);
    }
  }

  const sidebarMount = document.getElementById("path-sidebar-mount");
  if (sidebarMount) {
    const statusMap = {
      submitted: { label: "Menunggu Review", icon: "hourglass_empty" },
      reviewed: { label: "Sedang Ditinjau", icon: "rate_review" },
      approved: { label: "Disetujui", icon: "verified" },
      revision: { label: "Perlu Revisi", icon: "warning" },
    };
    const subStatus = submissionData?.status || "submitted";
    const subStatusInfo = statusMap[subStatus] || statusMap.submitted;

    sidebarMount.innerHTML = `
      <div class="card" style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); border-top: 4px solid ${theme.border};">
        <h3 style="margin: 0;">Path Overview</h3>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 20px; color: ${theme.color};">library_books</span>
          <span style="font-size: var(--fs-sm);">${totalModules} Modul Pembelajaran</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 20px; color: ${theme.color};">emoji_events</span>
          <span style="font-size: var(--fs-sm);">Sertifikat setelah selesai</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 20px; color: ${theme.color};">upload_file</span>
          <span style="font-size: var(--fs-sm);">
            ${submissionData ? `Tugas: <span class="submission-pill is-${subStatus}" style="font-size: 10px; padding: 2px 8px;"><span class="material-symbols-outlined" style="font-size: 11px;">${subStatusInfo.icon}</span> ${subStatusInfo.label}</span>` : 'Tugas Akhir Mandiri'}
          </span>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: var(--space-2) 0;">
        <h4 style="margin: 0; font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-faint); letter-spacing: 0.05em;">Status Kamu</h4>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-3) 0;">
          <span style="font-size: 3rem; font-weight: 800; color: ${theme.color}; line-height: 1;">${progressPercent}%</span>
          <span style="font-size: var(--fs-xs); color: var(--color-text-muted);">Tuntas</span>

          ${submissionData ? `
            <div style="width: 100%; margin-top: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-surface-alt); border-radius: var(--radius-sm); border: 1px solid var(--color-border); font-size: 11px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: 700; color: var(--color-text);">Tugas Akhir</span>
                <span class="submission-pill is-${subStatus}" style="font-size: 9px; padding: 1px 6px;">
                  ${subStatusInfo.label}
                </span>
              </div>
              <a href="${submissionData.repo_url}" target="_blank" rel="noopener" style="color: var(--color-primary-dark); font-family: var(--font-mono); text-decoration: none; display: flex; align-items: center; gap: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <span class="material-symbols-outlined" style="font-size: 13px;">link</span> ${submissionData.repo_url.replace('https://github.com/', '')}
              </a>
            </div>
          ` : ''}
          
          ${progressPercent === 100 ? `
            <button id="claim-cert-btn" class="btn btn-primary" style="width: 100%; justify-content: center; gap: 8px; margin-top: 14px; font-weight: 700; box-shadow: 0 4px 14px rgba(5, 217, 231, 0.4);">
              <span class="material-symbols-outlined" style="font-size: 20px;">workspace_premium</span> Klaim Sertifikat
            </button>
          ` : ''}

          ${progressPercent > 0 ? `
            <button id="reset-course-btn" style="margin-top: 12px; background: transparent; border: 1px solid var(--color-danger); color: var(--color-danger); padding: 6px 12px; border-radius: var(--radius-pill); font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: background var(--transition-fast);">
              <span class="material-symbols-outlined" style="font-size: 14px;">restart_alt</span> Ulangi Course
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Pastikan unlock achievement jika sudah 100%
    if (progressPercent === 100) {
      ProgressStore.isCourseCompleted(course.slug, modules);
    }

    const claimCertBtn = document.getElementById("claim-cert-btn");
    if (claimCertBtn) {
      claimCertBtn.addEventListener("click", () => {
        const profile = ProgressStore.getProfile();
        const serial = ProgressStore.getCertificateSerial(course.slug);
        const doneList = ProgressStore.getDoneList().filter(d => d.course === course.slug);
        let completionDate = new Date();
        if (doneList.length > 0) {
          const maxTime = Math.max(...doneList.map(d => new Date(d.doneAt).getTime()));
          completionDate = new Date(maxTime);
        }
        const formattedDate = completionDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        openCertificateModal({
          studentName: profile.nickname || "Siswa RIT Academy",
          courseTitle: course.title,
          courseSlug: course.slug,
          date: formattedDate,
          serial: serial
        });
      });
    }

    const resetCourseBtn = document.getElementById("reset-course-btn");
    if (resetCourseBtn) {
      resetCourseBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin menghapus progress untuk course ini dan mengulang dari awal?")) {
          ProgressStore.resetCourse(courseSlug);
          render();
        }
      });
    }
  }

  // 3. Render Stepper Modul
  const stepperMount = document.getElementById("path-stepper-mount");
  if (stepperMount) {
    if (totalModules === 0) {
      stepperMount.innerHTML = `<p class="empty-state">Modul untuk course ini sedang dipersiapkan oleh Sensei.</p>`;
      return;
    }

    let stepperHtml = `<div style="position: absolute; left: 23px; top: 24px; bottom: 40px; width: 2px; background: var(--color-border); z-index: 0;"></div>`;

    stepperHtml += modules.map((modul, idx) => {
      const status = ProgressStore.getStatus(course.slug, modul.slug, modules);
      
      const isDone = status === "done";
      const isActive = status === "active"; 
      const href = `materi.html?course=${encodeURIComponent(course.slug)}&modul=${encodeURIComponent(modul.slug)}`;
      
      let iconHtml, cardStyle, badgeHtml, actionHtml;

      if (isDone) {
        iconHtml = `<div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-success-light); color: var(--color-success); border: 4px solid var(--color-bg); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); position: relative; z-index: 2;"><span class="material-symbols-outlined" style="font-size: 24px;">check_circle</span></div>`;
        cardStyle = `background: var(--color-surface); border: 1px solid var(--color-border);`;
        badgeHtml = `<span style="font-size: 10px; font-weight: 700; color: var(--color-success); text-transform: uppercase; letter-spacing: 0.05em;">Modul ${idx + 1} • Selesai</span>`;
        actionHtml = `<div style="margin-top: var(--space-3);"><span style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: var(--color-surface-alt); border-radius: var(--radius-sm); font-size: var(--fs-xs); font-weight: 700; color: var(--color-text);"><span class="material-symbols-outlined" style="font-size: 16px;">replay</span> Review</span></div>`;
      } else if (isActive) {
        iconHtml = `<div style="width: 48px; height: 48px; border-radius: 50%; background: ${theme.color}; color: ${theme.btnText}; border: 4px solid var(--color-bg); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px ${theme.bg}; position: relative; z-index: 2;"><span class="material-symbols-outlined" style="font-size: 24px;">play_arrow</span></div>`;
        cardStyle = `background: ${theme.bg}; border: 2px solid ${theme.border}; box-shadow: var(--shadow-sm); transform: scale(1.01); z-index: 10; position: relative;`;
        badgeHtml = `<span style="font-size: 10px; font-weight: 700; color: ${theme.color}; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;"><span style="width: 6px; height: 6px; background: ${theme.color}; border-radius: 50%;"></span> DISARANKAN</span>`;
        actionHtml = `<div style="margin-top: var(--space-3);"><span class="btn" style="background: ${theme.color}; color: ${theme.btnText}; font-weight: 700; width: 100%; justify-content: center; padding: 12px; box-shadow: 0 2px 8px ${theme.bg};"><span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span> Lanjutkan Belajar</span></div>`;
      } else {
        iconHtml = `<div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-surface-alt); color: var(--color-text-muted); border: 4px solid var(--color-bg); display: flex; align-items: center; justify-content: center; position: relative; z-index: 2;"><span class="material-symbols-outlined" style="font-size: 20px;">menu_book</span></div>`;
        cardStyle = `background: var(--color-surface); border: 1px solid var(--color-border);`;
        badgeHtml = `<span style="font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Modul ${idx + 1}</span>`;
        actionHtml = `<div style="margin-top: var(--space-3);"><span style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: transparent; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: var(--fs-xs); font-weight: 700; color: var(--color-text-muted);"><span class="material-symbols-outlined" style="font-size: 16px;">visibility</span> Buka Materi</span></div>`;
      }

      return `
        <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-5); position: relative; z-index: 1;">
          ${iconHtml}
          <div style="flex: 1; min-width: 0;">
            <a href="${href}" class="card card-hover" style="display: block; text-decoration: none; color: inherit; padding: var(--space-4); transition: transform var(--transition-fast); ${cardStyle}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <div>
                  <div style="margin-bottom: 4px;">${badgeHtml}</div>
                  <h3 style="margin: 0; font-size: var(--fs-md);">${modul.title}</h3>
                </div>
              </div>
              <p style="color: var(--color-text-muted); font-size: var(--fs-sm); margin: var(--space-2) 0 0 0;">Klik untuk mempelajari materi ini.</p>
              ${actionHtml}
            </a>
          </div>
        </div>
      `;
    }).join("");

    stepperMount.innerHTML = stepperHtml;
  }
}

document.addEventListener("DOMContentLoaded", render);
