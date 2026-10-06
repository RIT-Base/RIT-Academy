import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";
import { getPathColorTheme } from "./paths.js";

// Fungsi untuk me-render setiap modul dalam bentuk Node Stepper
function moduleItemHtml(course, modul, status, index) {
  const isLocked = status === "locked";
  const isDone = status === "done";
  const href = isLocked ? "#" : `materi.html?course=${encodeURIComponent(course.slug)}&modul=${encodeURIComponent(modul.slug)}`;
  const theme = getPathColorTheme(course.slug);
  
  // Variabel untuk menyimpan gaya (styling) berdasarkan status
  let iconName, iconBg, iconColor, cardStyle, badgeHtml, actionHtml;

  if (isLocked) {
    iconName = "lock";
    iconBg = "var(--color-surface-alt)"; 
    iconColor = "var(--color-text-faint)";
    cardStyle = "filter: grayscale(1); opacity: 0.6; background: var(--color-surface);";
    badgeHtml = `<span style="color: var(--color-text-faint); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Modul ${index + 1} • Terkunci</span>`;
    actionHtml = `
      <div style="margin-top: var(--space-3); display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: var(--color-surface-alt); border-radius: 4px; font-size: var(--fs-xs); font-weight: 700; color: var(--color-text-faint);">
        <span class="material-symbols-outlined" style="font-size: 14px;">key</span> Butuh Modul Sebelumnya
      </div>
    `;
  } else if (isDone) {
    iconName = "check_circle";
    iconBg = "var(--color-success-light)";
    iconColor = "var(--color-success)";
    cardStyle = "background: var(--color-surface); border: 1px solid var(--color-border);";
    badgeHtml = `<span style="color: var(--color-success); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Modul ${index + 1} • Selesai</span>`;
    actionHtml = `
      <div style="margin-top: var(--space-3); display: flex; gap: 8px;">
        <span style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: var(--color-surface-alt); border-radius: var(--radius-sm); font-size: var(--fs-xs); font-weight: 700; color: var(--color-text);">
          <span class="material-symbols-outlined" style="font-size: 16px;">replay</span> Review Materi
        </span>
      </div>
    `;
  } else {
    // Active / Sedang Dikerjakan
    iconName = "play_arrow";
    iconBg = theme.color;
    iconColor = theme.btnText;
    cardStyle = `background: ${theme.bg}; border: 2px solid ${theme.border}; box-shadow: var(--shadow-sm);`;
    badgeHtml = `
      <span style="color: ${theme.color}; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
        <span style="width: 6px; height: 6px; background: ${theme.color}; border-radius: 50%; box-shadow: 0 0 4px ${theme.color};"></span> IN PROGRESS
      </span>
    `;
    actionHtml = `
      <div style="margin-top: var(--space-4);">
        <span class="btn" style="background: ${theme.color}; color: ${theme.btnText}; font-weight: 700; width: 100%; justify-content: center; padding: 12px; box-shadow: 0 4px 12px ${theme.bg};">
          <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span> Lanjut Belajar
        </span>
      </div>
    `;
  }

  return `
    <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-5); position: relative; z-index: 1;">
      <!-- Ikon Bulat Stepper -->
      <div style="width: 48px; height: 48px; border-radius: 50%; background: ${iconBg}; color: ${iconColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: var(--shadow-sm); border: 3px solid var(--color-bg); z-index: 2;">
        <span class="material-symbols-outlined" style="font-size: 24px;">${iconName}</span>
      </div>

      <!-- Card Konten -->
      <div style="flex: 1; min-width: 0;">
        <a href="${href}" class="card card-hover" style="display: block; text-decoration: none; color: inherit; padding: var(--space-4); transition: transform var(--transition-fast); ${cardStyle}" ${isLocked ? 'aria-disabled="true"' : ''}>
          <div style="margin-bottom: var(--space-1);">
            ${badgeHtml}
          </div>
          <h3 style="margin: 0 0 var(--space-2) 0; font-size: var(--fs-md);">${modul.title}</h3>
          <p style="color: var(--color-text-muted); font-size: var(--fs-sm); margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            Selesaikan tantangan koding interaktif untuk membuka materi selanjutnya di RIT Academy.
          </p>
          ${actionHtml}
        </a>
      </div>
    </div>
  `;
}

async function render() {
  const mount = document.getElementById("course-list");
  if (!mount) return;
  const index = await ContentLoader.loadCourseIndex();
  if (!index || !Array.isArray(index.courses)) {
    mount.innerHTML = `<p class="empty-state">Daftar course belum tersedia. Hubungi Sensei ya.</p>`;
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const focusCourse = params.get("course");

  mount.innerHTML = index.courses
    .map((course) => {
      const theme = getPathColorTheme(course.slug);
      const modules = [...(course.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      
      const itemsHtml = modules.length
        ? modules.map((modul, idx) => moduleItemHtml(course, modul, ProgressStore.getStatus(course.slug, modul.slug, modules), idx)).join("")
        : `<p class="empty-state">Belum ada modul di course ini.</p>`;

      return `
        <section id="course-${course.slug}" style="margin-bottom: var(--space-8);">
          <!-- Course Title -->
          <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-5);">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: ${theme.bg}; border: 1px solid ${theme.border}; box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: center; font-size: 24px; color: ${theme.color};">
              <span class="material-symbols-outlined">${course.slug.includes("web") ? "html" : (course.slug.includes("python") ? "terminal" : "menu_book")}</span>
            </div>
            <div>
              <p style="margin: 0; font-size: 10px; font-weight: 700; color: ${theme.color}; text-transform: uppercase; letter-spacing: 0.1em;">COURSE RIT</p>
              <h2 style="margin: 0; font-size: var(--fs-lg); line-height: 1.2;">${course.title}</h2>
            </div>
          </div>

          <!-- Wrapper Stepper dengan Garis Vertikal -->
          <div style="position: relative; padding-left: 4px;">
            <div style="position: absolute; left: 26px; top: 24px; bottom: 24px; width: 2px; background: linear-gradient(to bottom, ${theme.color} 0%, var(--color-border) 20%, var(--color-border) 100%); z-index: 0;"></div>
            ${itemsHtml}
          </div>
        </section>
      `;
    })
    .join("");

  if (focusCourse) {
    const el = document.getElementById(`course-${focusCourse}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  document.getElementById("reset-progress-btn")?.addEventListener("click", () => {
    if (confirm("Reset semua progress belajar di perangkat ini?")) {
      ProgressStore.resetAll();
      render();
    }
  });
});
