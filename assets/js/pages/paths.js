import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";

let allCourses = [];
let currentFilter = "all";

/**
 * Mapping 17 Warna Course 100% Unik & Berkarakter (TASK-098)
 * Sesuai Acceptance Criteria, zero duplicate colors:
 * 1. level0: Teal (#0d9488)
 * 2. web-dasar: Electric Cyan (#05D9E7)
 * 3. python-dasar: Python Amber (#f59e0b)
 * 4. quiz-path: Fuchsia (#d946ef)
 * 5. game-dev: Vibrant Orange (#f97316)
 * 6. iot-elektronika: Lime Green (#84cc16)
 * 7. it-support: Steel Slate (#64748b)
 * 8. web-dev: Royal Blue (#2563eb)
 * 9. mobile: Emerald Green (#10b981)
 * 10. data-ai: AI Violet (#8b5cf6)
 * 11. cyber-security: Rose Red (#f43f5e)
 * 12. devops: Turquoise / Dark Cyan (#0891b2)
 * 13. jaringan: Solar Gold (#eab308)
 * 14. ui-ux: Hot Pink (#ec4899)
 * 15. desain-grafis: Grape Purple (#7c3aed)
 * 16. qa-testing: Cobalt Indigo (#4f46e5)
 * 17. produk-analis: Coral Red (#ea580c)
 */
export const COURSE_COLOR_PALETTE = {
  "level0": {
    name: "Teal",
    color: "#0d9488",
    bg: "rgba(13, 148, 136, 0.14)",
    border: "#0d9488",
    btnText: "#ffffff"
  },
  "web-dasar": {
    name: "Electric Cyan",
    color: "#05D9E7",
    bg: "rgba(5, 217, 231, 0.14)",
    border: "#05D9E7",
    btnText: "#1C1515"
  },
  "python-dasar": {
    name: "Python Amber",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.14)",
    border: "#f59e0b",
    btnText: "#1C1515"
  },
  "quiz-path": {
    name: "Fuchsia",
    color: "#d946ef",
    bg: "rgba(217, 70, 239, 0.14)",
    border: "#d946ef",
    btnText: "#ffffff"
  },
  "game-dev": {
    name: "Vibrant Orange",
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.14)",
    border: "#f97316",
    btnText: "#ffffff"
  },
  "iot-elektronika": {
    name: "Lime Green",
    color: "#84cc16",
    bg: "rgba(132, 204, 22, 0.14)",
    border: "#84cc16",
    btnText: "#1C1515"
  },
  "it-support": {
    name: "Steel Slate",
    color: "#64748b",
    bg: "rgba(100, 116, 139, 0.14)",
    border: "#64748b",
    btnText: "#ffffff"
  },
  "web-dev": {
    name: "Royal Blue",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.14)",
    border: "#2563eb",
    btnText: "#ffffff"
  },
  "mobile": {
    name: "Emerald Green",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.14)",
    border: "#10b981",
    btnText: "#ffffff"
  },
  "data-ai": {
    name: "AI Violet",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.14)",
    border: "#8b5cf6",
    btnText: "#ffffff"
  },
  "cyber-security": {
    name: "Rose Red",
    color: "#f43f5e",
    bg: "rgba(244, 63, 94, 0.14)",
    border: "#f43f5e",
    btnText: "#ffffff"
  },
  "devops": {
    name: "Turquoise / Dark Cyan",
    color: "#0891b2",
    bg: "rgba(8, 145, 178, 0.14)",
    border: "#0891b2",
    btnText: "#ffffff"
  },
  "jaringan": {
    name: "Solar Gold",
    color: "#eab308",
    bg: "rgba(234, 179, 8, 0.14)",
    border: "#eab308",
    btnText: "#1C1515"
  },
  "ui-ux": {
    name: "Hot Pink",
    color: "#ec4899",
    bg: "rgba(236, 72, 153, 0.14)",
    border: "#ec4899",
    btnText: "#ffffff"
  },
  "desain-grafis": {
    name: "Grape Purple",
    color: "#7c3aed",
    bg: "rgba(124, 58, 237, 0.14)",
    border: "#7c3aed",
    btnText: "#ffffff"
  },
  "qa-testing": {
    name: "Cobalt Indigo",
    color: "#4f46e5",
    bg: "rgba(79, 70, 229, 0.14)",
    border: "#4f46e5",
    btnText: "#ffffff"
  },
  "produk-analis": {
    name: "Coral Red",
    color: "#ea580c",
    bg: "rgba(234, 88, 12, 0.14)",
    border: "#ea580c",
    btnText: "#ffffff"
  }
};

export function getPathColorTheme(slug = "") {
  const s = String(slug || "").toLowerCase().trim();
  if (COURSE_COLOR_PALETTE[s]) {
    return COURSE_COLOR_PALETTE[s];
  }

  // Fallback matching
  if (s.includes("mobile") || s.includes("android") || s.includes("flutter")) return COURSE_COLOR_PALETTE["mobile"];
  if (s.includes("game")) return COURSE_COLOR_PALETTE["game-dev"];
  if (s.includes("data") || s.includes("ai")) return COURSE_COLOR_PALETTE["data-ai"];
  if (s.includes("security") || s.includes("cyber")) return COURSE_COLOR_PALETTE["cyber-security"];
  if (s.includes("qa") || s.includes("testing")) return COURSE_COLOR_PALETTE["qa-testing"];
  if (s.includes("ui") || s.includes("ux")) return COURSE_COLOR_PALETTE["ui-ux"];
  if (s.includes("desain")) return COURSE_COLOR_PALETTE["desain-grafis"];
  if (s.includes("devops") || s.includes("cloud")) return COURSE_COLOR_PALETTE["devops"];
  if (s.includes("jaringan") || s.includes("network")) return COURSE_COLOR_PALETTE["jaringan"];
  if (s.includes("iot")) return COURSE_COLOR_PALETTE["iot-elektronika"];
  if (s.includes("support")) return COURSE_COLOR_PALETTE["it-support"];
  if (s.includes("quiz")) return COURSE_COLOR_PALETTE["quiz-path"];
  if (s.includes("python")) return COURSE_COLOR_PALETTE["python-dasar"];
  if (s.includes("web-dasar")) return COURSE_COLOR_PALETTE["web-dasar"];
  if (s.includes("web")) return COURSE_COLOR_PALETTE["web-dev"];
  if (s.includes("level")) return COURSE_COLOR_PALETTE["level0"];
  if (s.includes("produk") || s.includes("analis")) return COURSE_COLOR_PALETTE["produk-analis"];

  return COURSE_COLOR_PALETTE["web-dasar"];
}

function renderCards() {
  const mount = document.getElementById("path-cards");
  if (!mount) return;

  const filteredCourses = allCourses.filter((course) => {
    if (currentFilter === "all") return true;
    const isDasar =
      ["level0", "web-dasar", "python-dasar", "quiz-path"].includes(course.slug) ||
      course.slug.includes("dasar") ||
      course.slug.includes("level");
    if (currentFilter === "dasar") return isDasar;
    if (currentFilter === "lanjut") return !isDasar;
    return true;
  });

  if (filteredCourses.length === 0) {
    mount.innerHTML = `<p class="empty-state" style="grid-column: 1 / -1;">Belum ada materi untuk kategori ini.</p>`;
    return;
  }

  mount.innerHTML = filteredCourses
    .map((course) => {
      const modules = course.modules || [];
      const totalModules = modules.length;
      let doneCount = 0;

      modules.forEach((mod) => {
        if (ProgressStore.isDone(course.slug, mod.slug)) {
          doneCount++;
        }
      });

      const progressPercent = totalModules === 0 ? 0 : Math.round((doneCount / totalModules) * 100);
      const isDone = progressPercent === 100 && totalModules > 0;
      const isActive = progressPercent > 0 && progressPercent < 100;
      const theme = getPathColorTheme(course.slug);
      const defaultIcon = course.slug.includes("web")
        ? "html"
        : course.slug.includes("python")
        ? "terminal"
        : "menu_book";

      let badgeHtml, buttonHtml, progressHtml;

      function renderIcon(icon, fallback = "menu_book") {
        if (!icon) {
          return `<span class="material-symbols-outlined" style="font-size: 24px;">${fallback}</span>`;
        }
        const trimmed = icon.trim();
        if (trimmed.includes("<svg") && trimmed.includes("</svg>")) {
          let cleanSvg = trimmed
            .replace(/width="[^"]*"/gi, 'width="100%"')
            .replace(/height="[^"]*"/gi, 'height="100%"')
            .replace(/<\?xml.*?\?>/gi, "")
            .replace(/<!--.*?-->/gi, "");

          if (cleanSvg.includes('stroke="#000000"') || cleanSvg.includes('stroke="#000"')) {
            cleanSvg = cleanSvg
              .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
              .replace(/stroke="#000"/gi, 'stroke="currentColor"');
          }

          if (cleanSvg.includes('fill="#000000"') || cleanSvg.includes('fill="#000"')) {
            cleanSvg = cleanSvg
              .replace(/fill="#000000"/gi, 'fill="currentColor"')
              .replace(/fill="#000"/gi, 'fill="currentColor"');
          }

          return `<div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: inherit;">${cleanSvg}</div>`;
        }
        if (/^[a-z0-9_]+$/.test(trimmed)) {
          return `<span class="material-symbols-outlined" style="font-size: 24px;">${trimmed}</span>`;
        }
        return `<span style="font-size: 24px; line-height: 1;">${trimmed}</span>`;
      }

      const iconElement = renderIcon(course.icon, defaultIcon);

      if (isDone) {
        badgeHtml = `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-success-light); color: var(--color-success); font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Selesai</span>`;
        progressHtml = `<div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1); font-size: 11px; font-weight: 700;"><span style="color: var(--color-success);">Status</span><span style="color: var(--color-success);">100%</span></div><div style="width: 100%; height: 6px; background: var(--color-surface-alt); border-radius: var(--radius-pill); overflow: hidden;"><div style="height: 100%; width: 100%; background: var(--color-success); border-radius: var(--radius-pill);"></div></div>`;
        buttonHtml = `<button style="width: 100%; margin-top: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); padding: 10px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; color: var(--color-text-muted); cursor: pointer;">LIHAT SERTIFIKAT</button>`;
      } else {
        badgeHtml = isActive
          ? `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: ${theme.bg}; color: ${theme.color}; font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> Sedang Belajar</span>`
          : `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-surface-alt); color: var(--color-text-muted); font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">bookmark</span> Mulai</span>`;

        progressHtml = `<div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1); font-size: 11px; font-weight: 700;"><span style="color: var(--color-text-muted);">Progress</span><span style="color: ${theme.color}; font-weight: 700;">${progressPercent}%</span></div><div style="width: 100%; height: 6px; background: var(--color-surface-alt); border-radius: var(--radius-pill); overflow: hidden;"><div style="height: 100%; width: ${progressPercent}%; background: ${theme.color}; border-radius: var(--radius-pill); transition: width 1s ease;"></div></div>`;

        buttonHtml = `<div style="width: 100%; margin-top: var(--space-4); background: ${theme.color}; color: ${theme.btnText}; padding: 10px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; letter-spacing: 0.05em; box-shadow: 0 2px 8px ${theme.bg};"><span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span> ${isActive ? "LANJUTKAN" : "MULAI BELAJAR"}</div>`;
      }

      return `
    <a href="path.html?course=${encodeURIComponent(course.slug)}" class="card card-hover" style="display: flex; flex-direction: column; text-decoration: none; color: inherit; position: relative; overflow: hidden; padding: var(--space-4); border: 1px solid var(--color-border); border-top: 4px solid ${isActive ? theme.border : "var(--color-border)"};">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
        <div style="width: 48px; height: 48px; border-radius: 12px; background: ${isDone ? "var(--color-success-light)" : theme.bg}; color: ${isDone ? "var(--color-success)" : theme.color}; display: flex; align-items: center; justify-content: center;">
          ${iconElement}
        </div>
        ${badgeHtml}
      </div>
      <h3 style="margin: 0 0 var(--space-2) 0; font-size: var(--fs-md);">${course.title}</h3>
      <p style="color: var(--color-text-muted); font-size: var(--fs-sm); margin: 0 0 var(--space-5) 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex: 1;">
        ${course.description || "Materi dasar yang harus dikuasai."}
      </p>
      <div style="margin-top: auto;">
        ${progressHtml}
        ${buttonHtml}
      </div>
    </a>
    `;
    })
    .join("");
}

function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterBtns.forEach((b) => {
        b.style.background = "transparent";
        b.style.color = "var(--color-text-muted)";
        b.style.fontWeight = "600";
        b.style.boxShadow = "none";
      });
      const target = e.currentTarget;
      target.style.background = "var(--color-primary)";
      target.style.color = "var(--rit-black)";
      target.style.fontWeight = "700";
      target.style.boxShadow = "var(--shadow-sm)";

      currentFilter = target.getAttribute("data-filter");
      renderCards();
    });
  });
}

async function init() {
  const data = await ContentLoader.loadCourseIndex();

  if (data && Array.isArray(data.courses)) {
    allCourses = data.courses;
  }

  setupFilters();
  renderCards();
}

document.addEventListener("DOMContentLoaded", init);
