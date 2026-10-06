import { ContentLoader } from "../content-loader.js";
import { getPathColorTheme } from "./paths.js";

async function renderCourseCards() {
  const mount = document.getElementById("home-course-cards");
  if (!mount) return;

  const index = await ContentLoader.loadCourseIndex();
  if (!index || !Array.isArray(index.courses)) {
    mount.innerHTML = `<p class="empty-state">Daftar course belum tersedia.</p>`;
    return;
  }

  mount.innerHTML = index.courses
    .map((course) => {
      const theme = getPathColorTheme(course.slug);
      const bannerColor = theme.bg;
      const iconColor = theme.color;

      function renderHomeIcon(icon, fallback) {
        if (!icon) {
          return `<span class="material-symbols-outlined" style="font-size: 3rem; color: ${iconColor}; opacity: 0.9;">${fallback}</span>`;
        }
        const trimmed = icon.trim();
        if (trimmed.includes("<svg") && trimmed.includes("</svg>")) {
          let cleanSvg = trimmed
            .replace(/width="[^"]*"/gi, 'width="100%"')
            .replace(/height="[^"]*"/gi, 'height="100%"');

          if (cleanSvg.includes('fill="#000000"') || cleanSvg.includes('fill="#000"')) {
            cleanSvg = cleanSvg
              .replace(/fill="#000000"/gi, 'fill="currentColor"')
              .replace(/fill="#000"/gi, 'fill="currentColor"');
          } else if (!cleanSvg.includes("fill=")) {
            cleanSvg = cleanSvg.replace("<svg", '<svg fill="currentColor"');
          }

          return `<div style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; color: ${iconColor}; opacity: 0.95;">${cleanSvg}</div>`;
        }
        if (/^[a-z0-9_]+$/.test(trimmed)) {
          return `<span class="material-symbols-outlined" style="font-size: 3rem; color: ${iconColor}; opacity: 0.9;">${trimmed}</span>`;
        }
        return `<span style="font-size: 3rem; line-height: 1;">${trimmed}</span>`;
      }

      const defaultIcon = course.slug.includes("web")
        ? "html"
        : course.slug.includes("python")
        ? "terminal"
        : "menu_book";
      const homeIconElement = renderHomeIcon(course.icon, defaultIcon);

      return `
      <a href="path.html?course=${encodeURIComponent(course.slug)}" class="card card-hover" style="display: flex; flex-direction: column; padding: 0; overflow: hidden; text-decoration: none; color: inherit; background: var(--color-surface); border-top: 4px solid ${theme.border};">
        <div style="height: 120px; background: ${bannerColor}; position: relative; display: flex; align-items: center; justify-content: center;">
          ${homeIconElement}
        </div>

        <div style="padding: var(--space-4); flex: 1; display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted);">
             <span style="background: ${theme.bg}; padding: 2px 8px; border-radius: 4px; color: ${iconColor};">Materi</span>
             <span>•</span>
             <span>${(course.modules || []).length} Modul</span>
          </div>

          <h3 style="margin: 0; font-size: var(--fs-md);">${course.title}</h3>
          <p class="text-muted" style="margin: 0; font-size: var(--fs-sm); line-height: 1.5; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
             ${course.description || ""}
          </p>
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-surface-alt); display: flex; align-items: center; justify-content: center;">
                 <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-text-muted);">school</span>
              </div>
              <span style="font-size: 11px; font-weight: 600; color: var(--color-text);">RIT Academy</span>
            </div>
            <span style="color: ${iconColor}; font-weight: 700; font-size: var(--fs-sm);">Gratis</span>
          </div>
        </div>
      </a>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderCourseCards);
