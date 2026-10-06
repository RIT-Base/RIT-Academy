import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";

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

  const modules = [...(course.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const totalModules = modules.length;
  let doneCount = 0;
  
  modules.forEach(mod => {
    if (ProgressStore.isDone(course.slug, mod.slug)) {
      doneCount++;
    }
  });
  
  const progressPercent = totalModules === 0 ? 0 : Math.round((doneCount / totalModules) * 100);

  // 1. Render Header
  const headerMount = document.getElementById("path-header-mount");
  if (headerMount) {
    headerMount.innerHTML = `
      <div style="background: var(--color-primary); padding: var(--space-6) 0; position: relative; overflow: hidden; border-radius: 0 0 var(--radius-lg) var(--radius-lg); box-shadow: var(--shadow-md);">
        <div style="position: absolute; right: -2rem; top: -2rem; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(30px);"></div>
        <div style="position: absolute; left: -3rem; bottom: -1rem; width: 100px; height: 100px; background: var(--color-accent); border-radius: 50%; filter: blur(40px); opacity: 0.5;"></div>
        
        <div class="container" style="position: relative; z-index: 10; color: #fff;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-3);">
            <a href="paths.html" style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.2); color: #fff; text-decoration: none; transition: background var(--transition-fast);">
              <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
            </a>
            <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: var(--radius-pill); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; backdrop-filter: blur(4px);">TCC COURSE PATH</span>
          </div>
          <h1 style="color: #fff; margin-bottom: var(--space-2); font-size: calc(var(--fs-2xl) + 0.5rem); letter-spacing: -0.02em;">${course.title}</h1>
          <p style="color: rgba(255,255,255,0.9); font-size: var(--fs-md); max-width: 60ch;">${course.description || "Jalur pembelajaran komprehensif untuk mengembangkan keahlianmu."}</p>
          
          <div style="margin-top: var(--space-5); max-width: 400px;">
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-xs); font-weight: 700; margin-bottom: 6px;">
              <span>Overall Progress</span>
              <span>${progressPercent}%</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.2); border-radius: var(--radius-pill); overflow: hidden;">
              <div style="height: 100%; width: ${progressPercent}%; background: var(--color-accent-light); border-radius: var(--radius-pill); transition: width 1s ease;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Render Sidebar
  const sidebarMount = document.getElementById("path-sidebar-mount");
  if (sidebarMount) {
    sidebarMount.innerHTML = `
      <div class="card" style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4);">
        <h3 style="margin: 0;">Path Overview</h3>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 20px;">library_books</span>
          <span style="font-size: var(--fs-sm);">${totalModules} Modul Pembelajaran</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-muted);">
          <span class="material-symbols-outlined" style="font-size: 20px;">emoji_events</span>
          <span style="font-size: var(--fs-sm);">Sertifikat setelah selesai</span>
        </div>
        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: var(--space-2) 0;">
        <h4 style="margin: 0; font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-faint); letter-spacing: 0.05em;">Status Kamu</h4>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-3) 0;">
          <span style="font-size: 3rem; font-weight: 800; color: var(--color-text); line-height: 1;">${progressPercent}%</span>
          <span style="font-size: var(--fs-xs); color: var(--color-text-muted);">Tuntas</span>
          
          ${progressPercent > 0 ? `
            <button id="reset-course-btn" style="margin-top: 16px; background: transparent; border: 1px solid var(--color-danger); color: var(--color-danger); padding: 6px 12px; border-radius: var(--radius-pill); font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: background var(--transition-fast);">
              <span class="material-symbols-outlined" style="font-size: 14px;">restart_alt</span> Ulangi Course
            </button>
          ` : ''}
        </div>
      </div>
    `;

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
      
      // Semua modul sekarang bisa diklik (tidak ada isLocked)
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
        // Modul yang direkomendasikan untuk dikerjakan selanjutnya
        iconHtml = `<div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-primary); color: #fff; border: 4px solid var(--color-bg); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 4px rgba(79,70,229,0.2); position: relative; z-index: 2;"><span class="material-symbols-outlined" style="font-size: 24px;">play_arrow</span></div>`;
        cardStyle = `background: var(--color-primary-light); border: 2px solid var(--color-primary); box-shadow: var(--shadow-sm); transform: scale(1.01); z-index: 10; position: relative;`;
        badgeHtml = `<span style="font-size: 10px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;"><span style="width: 6px; height: 6px; background: var(--color-primary); border-radius: 50%; animation: pulse 2s infinite;"></span> DISARANKAN</span>`;
        actionHtml = `<div style="margin-top: var(--space-3);"><span class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px;"><span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span> Lanjutkan Belajar</span></div>`;
      } else {
        // Modul bebas (Tersedia tapi belum direkomendasikan)
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