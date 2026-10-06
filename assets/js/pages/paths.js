import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";

let allCourses = [];
let currentFilter = "all";

function renderCards() {
  const mount = document.getElementById("path-cards");
  
  const filteredCourses = allCourses.filter(course => {
    if (currentFilter === "all") return true;
    const isDasar = ["level0", "web-dasar", "python-dasar", "quiz-path"].includes(course.slug) ||
                    course.slug.includes("dasar") || course.slug.includes("level");
    if (currentFilter === "dasar") return isDasar;
    if (currentFilter === "lanjut") return !isDasar;
    return true;
  });

  if (filteredCourses.length === 0) {
    mount.innerHTML = `<p class="empty-state" style="grid-column: 1 / -1;">Belum ada materi untuk kategori ini.</p>`;
    return;
  }

  mount.innerHTML = filteredCourses.map((course) => {
    const modules = course.modules || [];
    const totalModules = modules.length;
    let doneCount = 0;
    
    modules.forEach(mod => {
      if (ProgressStore.isDone(course.slug, mod.slug)) {
        doneCount++;
      }
    });
    
    const progressPercent = totalModules === 0 ? 0 : Math.round((doneCount / totalModules) * 100);
    const isDone = progressPercent === 100 && totalModules > 0;
    const isActive = progressPercent > 0 && progressPercent < 100;
    const defaultIcon = course.slug.includes('web') ? 'html' : (course.slug.includes('python') ? 'terminal' : 'menu_book');
    
    let badgeHtml, buttonHtml, progressHtml;
    
    // Dukungan render icon: string SVG utuh, class Material Symbols, atau emoji/fallback
    function renderIcon(icon, fallback = "menu_book") {
      if (!icon) {
        return `<span class="material-symbols-outlined" style="font-size: 24px;">${fallback}</span>`;
      }
      const trimmed = icon.trim();
      // Jika berisi tag SVG
      if (trimmed.includes("<svg") && trimmed.includes("</svg>")) {
        // Normalisasi agar SVG fleksibel mengikuti container (100% width/height) dan warna currentColor
        let cleanSvg = trimmed
          .replace(/width="[^"]*"/gi, 'width="100%"')
          .replace(/height="[^"]*"/gi, 'height="100%"')
          .replace(/<\?xml.*?\?>/gi, '')
          .replace(/<!--.*?-->/gi, '');
        
        // Tangani stroke hitam
        if (cleanSvg.includes('stroke="#000000"') || cleanSvg.includes('stroke="#000"')) {
          cleanSvg = cleanSvg.replace(/stroke="#000000"/gi, 'stroke="currentColor"').replace(/stroke="#000"/gi, 'stroke="currentColor"');
        }

        // Jika ada fill hardcode hitam #000 / #000000, ubah ke currentColor agar serasi dengan tema kartu
        if (cleanSvg.includes('fill="#000000"') || cleanSvg.includes('fill="#000"')) {
          cleanSvg = cleanSvg.replace(/fill="#000000"/gi, 'fill="currentColor"').replace(/fill="#000"/gi, 'fill="currentColor"');
        }

        return `<div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: inherit;">${cleanSvg}</div>`;
      }
      // Jika string nama icon Material Symbols (misal: "terminal", "html")
      if (/^[a-z0-9_]+$/.test(trimmed)) {
        return `<span class="material-symbols-outlined" style="font-size: 24px;">${trimmed}</span>`;
      }
      // Jika emoji atau teks biasa
      return `<span style="font-size: 24px; line-height: 1;">${trimmed}</span>`;
    }

    const iconElement = renderIcon(course.icon, defaultIcon);

    if (isDone) {
      badgeHtml = `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-success-light); color: var(--color-success); font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span> Selesai</span>`;
      progressHtml = `<div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1); font-size: 11px; font-weight: 700;"><span style="color: var(--color-success);">Status</span><span style="color: var(--color-success);">100%</span></div><div style="width: 100%; height: 6px; background: var(--color-surface-alt); border-radius: var(--radius-pill); overflow: hidden;"><div style="height: 100%; width: 100%; background: var(--color-success); border-radius: var(--radius-pill);"></div></div>`;
      buttonHtml = `<button style="width: 100%; margin-top: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); padding: 10px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; color: var(--color-text-muted); cursor: pointer;">LIHAT SERTIFIKAT</button>`;
    } else {
      badgeHtml = isActive 
        ? `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-primary-light); color: var(--color-primary); font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span> Sedang Belajar</span>`
        : `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-surface-alt); color: var(--color-text-muted); font-size: 10px; font-weight: 700; text-transform: uppercase;"><span class="material-symbols-outlined" style="font-size: 14px;">bookmark</span> Mulai</span>`;
        
      progressHtml = `<div style="display: flex; justify-content: space-between; margin-bottom: var(--space-1); font-size: 11px; font-weight: 700;"><span style="color: var(--color-text-muted);">Progress</span><span style="color: var(--color-primary);">${progressPercent}%</span></div><div style="width: 100%; height: 6px; background: var(--color-surface-alt); border-radius: var(--radius-pill); overflow: hidden;"><div style="height: 100%; width: ${progressPercent}%; background: var(--color-primary); border-radius: var(--radius-pill); transition: width 1s ease;"></div></div>`;
      
      buttonHtml = `<div style="width: 100%; margin-top: var(--space-4); background: var(--color-primary); color: #fff; padding: 10px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; letter-spacing: 0.05em;"><span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span> ${isActive ? 'LANJUTKAN' : 'MULAI BELAJAR'}</div>`;
    }

    // REVISI: Mengembalikan href menjadi ?course=
    return `
    <a href="path.html?course=${encodeURIComponent(course.slug)}" class="card card-hover" style="display: flex; flex-direction: column; text-decoration: none; color: inherit; position: relative; overflow: hidden; padding: var(--space-4); border: 1px solid var(--color-border); ${isActive ? 'border-top: 4px solid var(--color-primary);' : ''}">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4);">
        <div style="width: 48px; height: 48px; border-radius: 12px; background: ${isDone ? 'var(--color-success-light)' : 'var(--color-primary-light)'}; color: ${isDone ? 'var(--color-success)' : 'var(--color-primary)'}; display: flex; align-items: center; justify-content: center;">
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
  }).join("");
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--color-text-muted)';
        b.style.fontWeight = '600';
        b.style.boxShadow = 'none';
      });
      const target = e.currentTarget;
      target.style.background = 'var(--color-primary)';
      target.style.color = '#fff';
      target.style.fontWeight = '700';
      target.style.boxShadow = 'var(--shadow-sm)';
      
      currentFilter = target.getAttribute('data-filter');
      renderCards();
    });
  });
}

async function init() {
  const mount = document.getElementById("path-cards");
  const data = await ContentLoader.loadCourseIndex();
  
  if (data && Array.isArray(data.courses)) {
    allCourses = data.courses;
  }
  
  setupFilters();
  renderCards();
}

document.addEventListener("DOMContentLoaded", init);