import { ContentLoader } from "../content-loader.js";
import { ProgressStore } from "../progress-store.js";
import { getCurrentTheme } from "../app.js";
import { createHtmlLab } from "../labs/html-lab.js";
import { createPythonLab, runPython, runPythonAndEval } from "../labs/python-lab.js";
import {
  checkHtmlContains,
  checkPythonOutput,
  checkPythonTestResult,
  checkQuiz,
  taskErrorResult,
} from "../task-checker.js";

const params = new URLSearchParams(window.location.search);
const course = params.get("course");
const modul = params.get("modul");
const root = document.getElementById("lesson-root");

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function describeTask(task) {
  const p = task.params || {};
  switch (task.type) {
    case "html-contains":
      return p.text
        ? `Elemen <code>${escapeHtml(p.selector)}</code> harus ada dan mengandung teks "${escapeHtml(p.text)}".`
        : `Elemen <code>${escapeHtml(p.selector)}</code> harus ada di HTML.`;
    case "python-output":
      return p.exact !== undefined
        ? `Program harus mencetak output persis "${escapeHtml(String(p.exact))}".`
        : `Program harus mencetak output yang mengandung "${escapeHtml(String(p.contains))}".`;
    case "python-test":
      return `Ekspresi <code>${escapeHtml(p.fn)}</code> harus menghasilkan <code>${escapeHtml(String(p.equals))}</code>.`;
    case "quiz":
      return escapeHtml(p.question || "Pertanyaan");
    default:
      return "Task tidak dikenali.";
  }
}

async function loadCourseModules(courseSlug) {
  const index = await ContentLoader.loadCourseIndex();
  const c = index?.courses?.find((x) => x.slug === courseSlug);
  return c ? [...(c.modules || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];
}

function renderMissing(message) {
  root.innerHTML = `
    <div class="empty-state card">
      <p style="font-size:2rem">😕</p>
      <p>${message}</p>
      <a href="paths.html" class="btn btn-primary">Kembali ke Learning Paths</a>
    </div>
  `;
}

async function main() {
  if (!course || !modul) {
    renderMissing("Materi tidak ditemukan (parameter course/modul kosong).");
    return;
  }

  const lesson = await ContentLoader.loadLessonRaw(course, modul);
  if (!lesson) {
    renderMissing("Materi ini belum tersedia — mungkin belum diisi oleh Sensei.");
    return;
  }

  // Tarik Index untuk mendapatkan nama Course asli (untuk Breadcrumb)
  const index = await ContentLoader.loadCourseIndex();
  const courseData = index?.courses?.find((x) => x.slug === course);
  const courseTitle = courseData ? courseData.title : course;

  const tasksData = await ContentLoader.loadTasks(course, modul);
  
  // REVISI: Mengadopsi style Header & Breadcrumb
  root.innerHTML = `
    <article>
      <nav aria-label="Breadcrumb" style="margin-bottom: var(--space-5);">
        <ol style="list-style: none; padding: 0; margin: 0; display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; flex-wrap: wrap;">
          <li><a href="paths.html" style="color: inherit; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color var(--transition-fast);"><span class="material-symbols-outlined" style="font-size: 16px;">menu_book</span> Belajar</a></li>
          <li><span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-border);">chevron_right</span></li>
          <li><a href="path.html?course=${encodeURIComponent(course)}" style="color: inherit; text-decoration: none; transition: color var(--transition-fast);">${escapeHtml(courseTitle)}</a></li>
          <li><span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-border);">chevron_right</span></li>
          <li aria-current="page" style="color: var(--color-text);">${escapeHtml(lesson.meta.title || modul)}</li>
        </ol>
      </nav>
      
      <header style="margin-bottom: var(--space-6); position: relative;">
        <div style="position: absolute; left: -16px; top: 24px; width: 4px; height: 40px; background: var(--color-primary); border-radius: 0 4px 4px 0;"></div>
        <span style="color: var(--color-secondary); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; display: block; margin-bottom: 8px;">Materi Pembelajaran</span>
        <h1 style="font-size: calc(var(--fs-2xl) + 0.2rem); margin-bottom: var(--space-3); color: var(--color-text); line-height: 1.2;">${escapeHtml(lesson.meta.title || modul)}</h1>
      </header>

      <div class="lesson-content" id="lesson-body" style="font-size: var(--fs-base); line-height: 1.8; color: var(--color-text-muted);"></div>
      
      <div id="checkpoint-mount"></div>

      <!-- Widget Diskusi & Tanya Jawab Modul (Giscus) -->
      <section class="module-discussion-section" style="margin-top: var(--space-7); padding-top: var(--space-6); border-top: 1px solid var(--color-border);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-4);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 24px;">forum</span>
            <h2 style="margin: 0; font-size: var(--fs-lg);">Diskusi & Tanya Jawab Modul</h2>
          </div>
          <span class="badge" style="background: var(--color-surface-alt); border: 1px solid var(--color-border); font-size: var(--fs-xs); color: var(--color-text-muted);">
            GitHub Discussions (Q&A)
          </span>
        </div>
        <p class="text-muted" style="font-size: var(--fs-sm); margin-bottom: var(--space-5);">
          Punya pertanyaan atau ingin berbagi temuan seputar modul ini? Tulis komentarmu di bawah menggunakan akun GitHub.
        </p>
        <div id="giscus-materi-container" class="giscus-container" style="min-height: 240px;"></div>
      </section>
    </article>
  `;

  const lessonBody = document.getElementById("lesson-body");

  // 1. Marked Custom Renderer: Image Path Resolver (prefix path folder modul untuk relative URLs)
  if (window.marked) {
    const renderer = new window.marked.Renderer();
    renderer.image = function (href, title, text) {
      let rawHref = typeof href === "object" && href !== null ? href.href : href;
      const rawTitle = typeof href === "object" && href !== null ? href.title : title;
      const rawText = typeof href === "object" && href !== null ? href.text : text;

      if (rawHref && typeof rawHref === "string") {
        const isExternal =
          rawHref.startsWith("http://") ||
          rawHref.startsWith("https://") ||
          rawHref.startsWith("data:") ||
          rawHref.startsWith("/") ||
          rawHref.startsWith("content/");

        if (!isExternal) {
          rawHref = `content/${course}/${modul}/${rawHref.replace(/^\.\//, "")}`;
        }
      }

      const cleanAlt = escapeHtml(rawText || "");
      const cleanTitle = rawTitle ? ` title="${escapeHtml(rawTitle)}"` : "";
      return `
        <figure class="lesson-image-wrap">
          <img src="${escapeHtml(rawHref)}" alt="${cleanAlt}"${cleanTitle} loading="lazy" class="lesson-img" />
          ${cleanAlt ? `<figcaption class="lesson-img-caption">${cleanAlt}</figcaption>` : ""}
        </figure>
      `;
    };

    lessonBody.innerHTML = window.marked.parse(lesson.body, { renderer });
  } else {
    lessonBody.innerHTML = `<pre>${escapeHtml(lesson.body)}</pre>`;
  }

  // 2. Lightweight Mobile Reading Mode: Lazy Simulator (CodeMirror hanya on-demand / Checkpoint)
  const inlineLabs = {};
  let blockIndex = 0;
  const tasks = tasksData?.tasks || [];
  const taskRequiredBlocks = new Set(
    tasks.filter((t) => t.block).map((t) => Number(t.block))
  );

  lessonBody.querySelectorAll('pre > code[class*="language-"]').forEach((codeEl) => {
    const langMatch = codeEl.className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : "";
    const isExecutable = lang === "html" || lang === "python";

    blockIndex += 1;
    const idx = blockIndex;
    const code = codeEl.textContent;
    const pre = codeEl.parentElement;

    // Jika blok kode ini adalah target checkpoint yang ditag lewat task.block:
    if (isExecutable && taskRequiredBlocks.has(idx)) {
      const wrap = document.createElement("div");
      wrap.className = "inline-lab-wrap";
      
      const label = document.createElement("div");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "8px";
      label.style.marginBottom = "8px";
      label.innerHTML = `
        <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-warning);">flag</span>
        <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-warning); letter-spacing: 0.05em;">Checkpoint Lab • Blok ${idx}</span>
      `;
      wrap.appendChild(label);

      const labMount = document.createElement("div");
      wrap.appendChild(labMount);
      pre.replaceWith(wrap);

      const instance =
        lang === "html"
          ? createHtmlLab({ mount: labMount, starter: code, showCheck: false })
          : createPythonLab({ mount: labMount, starter: code, showCheck: false });

      inlineLabs[idx] = { type: lang, instance };
      return;
    }

    // Untuk blok kode bacaan normal: Buat container statis rapi dengan Copy + [▶ Coba Kode] on-demand
    const wrap = document.createElement("div");
    wrap.className = "code-block-wrap";

    const header = document.createElement("div");
    header.className = "code-block-header";

    const langBadge = document.createElement("div");
    langBadge.className = "code-block-lang";
    langBadge.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 16px; color: ${lang === 'html' ? 'var(--color-primary)' : lang === 'python' ? 'var(--color-accent)' : 'var(--color-text-faint)'};">
        ${lang === 'html' ? 'html' : lang === 'python' ? 'terminal' : 'code'}
      </span>
      <span>${(lang || 'CODE').toUpperCase()}</span>
    `;

    const actions = document.createElement("div");
    actions.className = "code-block-actions";

    // Tombol Salin
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "code-action-btn";
    copyBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span><span>Salin</span>`;
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-success);">check</span><span>Tersalin!</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">content_copy</span><span>Salin</span>`;
        }, 2000);
      } catch (e) {
        console.warn("Gagal copy ke clipboard:", e);
      }
    });
    actions.appendChild(copyBtn);

    // Tombol Coba Kode On-Demand
    if (isExecutable) {
      const runBtn = document.createElement("button");
      runBtn.type = "button";
      runBtn.className = "code-action-btn code-action-btn--primary";
      runBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">play_arrow</span><span>Coba Kode</span>`;
      runBtn.addEventListener("click", () => {
        const labMount = document.createElement("div");
        labMount.className = "mounted-lab";
        wrap.replaceWith(labMount);
        const instance =
          lang === "html"
            ? createHtmlLab({ mount: labMount, starter: code, showCheck: false })
            : createPythonLab({ mount: labMount, starter: code, showCheck: false });
        inlineLabs[idx] = { type: lang, instance };
      });
      actions.appendChild(runBtn);
    }

    header.appendChild(langBadge);
    header.appendChild(actions);

    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(header);
    wrap.appendChild(pre);
  });

  if (!tasksData) {
    document.getElementById("checkpoint-mount").innerHTML = `
      <div class="card" style="margin-top: var(--space-6); border-top: 4px solid var(--color-border);">
        <h2 style="display: flex; align-items: center; gap: 8px;"><span class="material-symbols-outlined">flag</span> Checkpoint</h2>
        <p class="text-muted">Belum ada task checkpoint untuk modul ini.</p>
      </div>
    `;
    return;
  }

  renderCheckpoint(tasksData, inlineLabs);
}

// 3. Engine Khusus: The Sorting Quiz (Diagnostik 16 Path)
function renderSortingQuiz(tasksData) {
  const mount = document.getElementById("checkpoint-mount");
  const questions = tasksData.questions || [];

  const PATH_META = {
    "web-dev": { title: "Web Development", icon: "language", cat: "Software & Web" },
    "mobile": { title: "Mobile Development", icon: "smartphone", cat: "Aplikasi Mobile" },
    "game-dev": { title: "Game Development", icon: "sports_esports", cat: "Game & Interaktif" },
    "iot-elektronika": { title: "IoT & Elektronika", icon: "memory", cat: "Hardware & IoT" },
    "it-support": { title: "IT Support & SysAdmin", icon: "build", cat: "Sistem & Hardware" },
    "data-ai": { title: "Data & Artificial Intelligence", icon: "analytics", cat: "Data & AI" },
    "cyber-security": { title: "Cyber Security", icon: "security", cat: "Keamanan Siber" },
    "devops": { title: "DevOps & Cloud Engineering", icon: "cloud_sync", cat: "Cloud & Otomasi" },
    "jaringan": { title: "Jaringan Komputer", icon: "lan", cat: "Infrastruktur Jaringan" },
    "ui-ux": { title: "UI/UX Design", icon: "palette", cat: "Desain Pengalaman" },
    "desain-grafis": { title: "Desain Grafis & Multimedia", icon: "brush", cat: "Visual & Kreatif" },
    "qa-testing": { title: "QA & Software Testing", icon: "fact_check", cat: "Kualitas & Testing" },
    "produk-analis": { title: "Produk Analis (PM)", icon: "assignment", cat: "Manajemen Produk" }
  };

  mount.innerHTML = `
    <div class="sorting-quiz-card">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: var(--space-4);">
        <div style="width: 44px; height: 44px; border-radius: 12px; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); flex-shrink: 0;">
          <span class="material-symbols-outlined" style="font-size: 26px;">psychology</span>
        </div>
        <div>
          <h2 style="margin: 0; font-size: var(--fs-xl);">The Sorting Quiz — RIT Academy</h2>
          <p style="margin: 0; color: var(--color-text-muted); font-size: var(--fs-xs);">Temukan jalur spesialisasi IT yang paling selaras dengan naluri dan minat alamimu.</p>
        </div>
      </div>
      
      <div id="quiz-form-container">
        <form id="sorting-quiz-form">
          ${questions.map((q, qIdx) => `
            <div class="sorting-question-card" id="q-card-${qIdx}">
              <div class="sorting-question-title">
                <span>${escapeHtml(q.question)}</span>
              </div>
              <div class="sorting-options">
                ${q.options.map((opt, optIdx) => `
                  <label class="sorting-option-label" data-q="${qIdx}">
                    <input type="radio" name="sq_${qIdx}" value="${optIdx}" required>
                    <span>${escapeHtml(opt.text)}</span>
                  </label>
                `).join("")}
              </div>
            </div>
          `).join("")}

          <div style="margin-top: var(--space-6); text-align: center;">
            <button type="submit" class="btn btn-primary" id="calc-sorting-btn" style="padding: 12px 28px; font-size: var(--fs-md); box-shadow: 0 4px 16px rgba(79, 70, 229, 0.3);">
              <span class="material-symbols-outlined" style="font-size: 20px;">auto_awesome</span> Hitung Hasil Penjurusan
            </button>
          </div>
        </form>
      </div>

      <div id="sorting-result-container" style="display: none;"></div>
    </div>
  `;

  const form = document.getElementById("sorting-quiz-form");
  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const qIdx = e.target.closest("label").dataset.q;
      form.querySelectorAll(`label[data-q="${qIdx}"]`).forEach((lbl) => lbl.classList.remove("is-selected"));
      e.target.closest("label").classList.add("is-selected");
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const scores = {};
    Object.keys(PATH_META).forEach((slug) => { scores[slug] = 0; });

    questions.forEach((q, qIdx) => {
      const selected = form.querySelector(`input[name="sq_${qIdx}"]:checked`);
      if (selected) {
        const optIdx = Number(selected.value);
        const opt = q.options[optIdx];
        if (opt && opt.scores) {
          Object.entries(opt.scores).forEach(([pathSlug, pts]) => {
            scores[pathSlug] = (scores[pathSlug] || 0) + pts;
          });
        }
      }
    });

    const sorted = Object.entries(scores)
      .map(([slug, score]) => ({ slug, score, meta: PATH_META[slug] || { title: slug, icon: "code", cat: "IT" } }))
      .sort((a, b) => b.score - a.score);

    const maxScore = sorted[0].score || 1;
    const top1 = sorted[0];
    const top2 = sorted[1];
    const top3 = sorted[2];

    const resultBox = document.getElementById("sorting-result-container");
    const formBox = document.getElementById("quiz-form-container");
    formBox.style.display = "none";
    resultBox.style.display = "block";

    const top1Pct = Math.round((top1.score / (questions.length * 1.5)) * 100);
    const top1PctClamped = Math.min(Math.max(top1Pct, 78), 98);

    resultBox.innerHTML = `
      <div class="sorting-result-hero">
        <div class="sorting-match-badge">
          <span class="material-symbols-outlined" style="font-size: 16px;">verified</span> Rekomendasi Utama (Primary Match)
        </div>
        <h1 style="font-size: var(--fs-2xl); color: var(--color-primary); margin: var(--space-2) 0;">
          ${escapeHtml(top1.meta.title)}
        </h1>
        <p style="font-size: var(--fs-md); color: var(--color-text); font-weight: 600; margin-bottom: var(--space-2);">
          Tingkat Kecocokan Karakter: <span style="color: var(--color-primary);">${top1PctClamped}%</span>
        </p>
        <p style="max-width: 540px; margin: 0 auto var(--space-4) auto; font-size: var(--fs-sm); color: var(--color-text-muted); line-height: 1.6;">
          Pola analisismu menunjukkan ketertarikan kuat pada <strong>${escapeHtml(top1.meta.cat)}</strong>. Gaya berpikirmu sangat selaras dengan tantangan dan budaya di bidang ini.
        </p>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <a href="path.html?course=${encodeURIComponent(top1.slug)}" class="btn btn-primary">
            <span class="material-symbols-outlined" style="font-size: 18px;">rocket_launch</span> Mulai Roadmap ${escapeHtml(top1.meta.title)}
          </a>
          <button type="button" class="btn btn-secondary" id="copy-summary-btn">
            <span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span> Salin Ringkasan Hasil
          </button>
        </div>
      </div>

      <h3 style="margin-bottom: var(--space-3); font-size: var(--fs-md);">Alternatif Jalur Potensial</h3>
      <div class="sorting-rank-grid">
        <div class="sorting-sub-card">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="material-symbols-outlined" style="color: var(--color-accent);">${top2.meta.icon}</span>
            <strong style="font-size: var(--fs-sm);">${escapeHtml(top2.meta.title)}</strong>
          </div>
          <p style="margin: 0; font-size: var(--fs-xs); color: var(--color-text-muted);">Pilihan alternatif terbaik ke-2 untuk eksplorasi lintas minat.</p>
        </div>
        <div class="sorting-sub-card">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span class="material-symbols-outlined" style="color: var(--color-accent);">${top3.meta.icon}</span>
            <strong style="font-size: var(--fs-sm);">${escapeHtml(top3.meta.title)}</strong>
          </div>
          <p style="margin: 0; font-size: var(--fs-xs); color: var(--color-text-muted);">Pilihan alternatif terbaik ke-3 yang melengkapi keahlian dasarmu.</p>
        </div>
      </div>

      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-md);">Distribusi Minat di 13 Path Spesialisasi</h3>
      <div style="background: var(--color-surface); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-bottom: var(--space-6);">
        ${sorted.map((item) => {
          const pct = Math.round((item.score / maxScore) * 100);
          return `
            <div class="sorting-bar-item">
              <div class="sorting-bar-header">
                <span>${escapeHtml(item.meta.title)}</span>
                <span style="color: var(--color-text-muted);">${pct}%</span>
              </div>
              <div class="sorting-bar-track">
                <div class="sorting-bar-fill" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div style="text-align: center;">
        <button type="button" class="btn btn-secondary" id="retake-quiz-btn">
          <span class="material-symbols-outlined" style="font-size: 16px;">replay</span> Ulangi Kuis
        </button>
      </div>
    `;

    // Tandai modul sebagai selesai di ProgressStore
    ProgressStore.setDone(course, modul);

    // Salin Ringkasan
    document.getElementById("copy-summary-btn")?.addEventListener("click", async () => {
      const summaryText = `🎯 HASIL THE SORTING QUIZ (RIT ACADEMY)\n` +
        `• Primary Match: ${top1.meta.title} (${top1PctClamped}%)\n` +
        `• Alternatif 1: ${top2.meta.title}\n` +
        `• Alternatif 2: ${top3.meta.title}\n` +
        `• Rekomendasi: Masuk Divisi ${top1.meta.title} dan mulai eksplorasi roadmap RIT-CLR!`;
      try {
        await navigator.clipboard.writeText(summaryText);
        const btn = document.getElementById("copy-summary-btn");
        btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-success);">check</span> Tersalin!`;
        setTimeout(() => {
          btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span> Salin Ringkasan Hasil`;
        }, 2000);
      } catch (err) {
        console.warn("Clipboard error:", err);
      }
    });

    // Ulangi Kuis
    document.getElementById("retake-quiz-btn")?.addEventListener("click", () => {
      resultBox.style.display = "none";
      formBox.style.display = "block";
      form.reset();
      form.querySelectorAll("label").forEach((lbl) => lbl.classList.remove("is-selected"));
      window.scrollTo({ top: formBox.offsetTop - 80, behavior: "smooth" });
    });

    window.scrollTo({ top: resultBox.offsetTop - 80, behavior: "smooth" });
  });
}

function renderCheckpoint(tasksData, inlineLabs) {
  if (tasksData?.quizType === "sorting") {
    renderSortingQuiz(tasksData);
    return;
  }
  const mount = document.getElementById("checkpoint-mount");
  const tasks = tasksData.tasks || [];
  const needsOwnEditor = tasks.some((t) => !t.block && t.type !== "quiz");
  const alreadyDone = ProgressStore.isDone(course, modul);

  // REVISI: Jika sudah selesai, tampilkan Success Card cantik
  if (alreadyDone) {
    mount.innerHTML = `
      <div style="margin-top: var(--space-8); background: var(--color-surface); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; border-top: 4px solid var(--color-success); position: relative;">
        <div style="padding: var(--space-6); display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-3);">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-success-light); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-2);">
            <span class="material-symbols-outlined" style="color: var(--color-success); font-size: 32px;">check_circle</span>
          </div>
          <div>
            <h3 style="margin: 0 0 8px 0; font-size: var(--fs-xl);">Capaian Tercapai!</h3>
            <p style="margin: 0; color: var(--color-text-muted); font-size: var(--fs-sm); max-width: 400px;">Bagus! Kamu sudah memahami materi ini. Checkpoint telah diselesaikan dengan sempurna.</p>
          </div>
          <div style="margin-top: var(--space-4); width: 100%; max-width: 300px;">
            <a href="#" id="next-module-btn" class="btn btn-primary" style="width: 100%; justify-content: center; display: flex; align-items: center; gap: 8px;">
              Lanjut ke Modul Berikutnya <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    `;
  } else {
    // REVISI: Jika belum, tampilkan kotak challenge
    mount.innerHTML = `
      <div style="margin-top: var(--space-7); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--space-4);">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
            <span class="material-symbols-outlined" style="font-size: 20px;">flag</span>
          </div>
          <h2 style="margin: 0; font-size: var(--fs-lg);">Checkpoint Latihan</h2>
        </div>
        
        ${tasksData.hint ? `<p class="text-muted" style="margin-bottom: var(--space-4);">${escapeHtml(tasksData.hint)}</p>` : ""}
        
        ${needsOwnEditor ? `<div id="checkpoint-editor-mount" style="margin-bottom:var(--space-4)"></div>` : ""}
        
        <ul class="task-list" id="task-list" style="margin-bottom: var(--space-4);"></ul>
        
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" id="run-check-btn" style="display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined" style="font-size: 18px;">fact_check</span> Jalankan Check
          </button>
          <a href="#" class="btn btn-accent" id="next-module-btn" style="display: none; align-items: center; gap: 4px;">
            Lanjut ke Modul Berikutnya <span class="material-symbols-outlined" style="font-size: 18px;">arrow_forward</span>
          </a>
        </div>
      </div>
    `;
  }

  let checkpointEditor = null;
  if (!alreadyDone && needsOwnEditor) {
    const editorMount = document.getElementById("checkpoint-editor-mount");
    checkpointEditor =
      tasksData.editor === "python"
        ? createPythonLab({ mount: editorMount, starter: tasksData.starter || "", showCheck: false })
        : createHtmlLab({ mount: editorMount, starter: tasksData.starter || "", showCheck: false });
  }

  if (!alreadyDone) {
    const taskListEl = document.getElementById("task-list");
    taskListEl.innerHTML = tasks
      .map(
        (task) => `
        <li class="task-item" id="task-${task.id}">
          <span class="task-item__icon" data-icon><span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-text-faint);">radio_button_unchecked</span></span>
          <div class="task-item__body">
            <div data-desc>${describeTask(task)}</div>
            ${
              task.type === "quiz"
                ? `<div class="quiz-options" style="margin-top:var(--space-2); display:flex; flex-direction:column; gap:8px;">
                    ${(task.params.options || [])
                      .map(
                        (opt, i) => `
                      <label style="display:flex; gap:8px; align-items:center; font-size:var(--fs-sm); cursor:pointer; background: var(--color-surface-alt); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border); transition: all var(--transition-fast);">
                        <input type="radio" name="quiz-${task.id}" value="${i}">
                        <span>${escapeHtml(opt)}</span>
                      </label>
                    `
                      )
                      .join("")}
                  </div>`
                : ""
            }
            <div class="task-item__hint" data-feedback style="margin-top: 4px; color: var(--color-danger); font-weight: 600;"></div>
          </div>
        </li>
      `
      )
      .join("");
  }

  async function resolveCodeForTask(task) {
    if (task.block) {
      const lab = inlineLabs[task.block];
      if (!lab) return { code: "", type: null };
      return { code: lab.instance.getCode(), type: lab.type };
    }
    if (checkpointEditor) {
      return { code: checkpointEditor.getCode(), type: tasksData.editor };
    }
    return { code: "", type: null };
  }

  async function runOneTask(task) {
    try {
      if (task.type === "quiz") {
        const checked = document.getElementById("task-list").querySelector(`input[name="quiz-${task.id}"]:checked`);
        const selected = checked ? Number(checked.value) : null;
        return checkQuiz(selected, task.params);
      }
      if (task.type === "html-contains") {
        const { code } = await resolveCodeForTask(task);
        return checkHtmlContains(code, task.params);
      }
      if (task.type === "python-output") {
        const { code } = await resolveCodeForTask(task);
        const result = await runPython(code);
        return checkPythonOutput(result.stdout, task.params);
      }
      if (task.type === "python-test") {
        const { code } = await resolveCodeForTask(task);
        const evalResult = await runPythonAndEval(code, task.params.fn);
        if (!evalResult.ok) {
          return { pass: false, message: `Kode error: ${evalResult.stderr || "tidak diketahui"}` };
        }
        return checkPythonTestResult(evalResult.result, task.params);
      }
      return { pass: false, message: "Tipe task tidak dikenali." };
    } catch (err) {
      return taskErrorResult(err);
    }
  }

  async function runAllChecks() {
    const btn = document.getElementById("run-check-btn");
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px; animation: spin 1s linear infinite;">sync</span> Mengecek...`;

    let allPass = true;
    for (const task of tasks) {
      const li = document.getElementById(`task-${task.id}`);
      const iconEl = li.querySelector("[data-icon]");
      const feedbackEl = li.querySelector("[data-feedback]");
      
      const result = await runOneTask(task);
      li.classList.remove("is-pass", "is-fail");
      
      if (result.pass) {
        li.classList.add("is-pass");
        iconEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-success);">check_circle</span>`;
        feedbackEl.textContent = "";
      } else {
        li.classList.add("is-fail");
        iconEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px; color: var(--color-danger);">cancel</span>`;
        feedbackEl.textContent = result.message || task.hint || "Belum lolos, coba lagi.";
        allPass = false;
      }
    }

    btn.disabled = false;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px;">fact_check</span> Jalankan Check`;

    const nextBtn = document.getElementById("next-module-btn");
    if (allPass) {
      ProgressStore.setDone(course, modul);
      btn.style.display = "none";
      nextBtn.style.display = "inline-flex";
    }
  }

  if (!alreadyDone) {
    document.getElementById("run-check-btn").addEventListener("click", runAllChecks);
  }

  document.getElementById("next-module-btn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const modules = await loadCourseModules(course);
    const idx = modules.findIndex((m) => m.slug === modul);
    const next = modules[idx + 1];
    
    // REVISI: Mengembalikan arah tautan ke Syllabus (path.html) jika course sudah habis
    if (next) {
      window.location.href = `materi.html?course=${encodeURIComponent(course)}&modul=${encodeURIComponent(next.slug)}`;
    } else {
      window.location.href = `path.html?course=${encodeURIComponent(course)}`;
    }
  });

  // Pasang widget Giscus untuk materi aktif
  initGiscusMateri(course, modul);
}

function initGiscusMateri(courseSlug, moduleSlug) {
  const container = document.getElementById("giscus-materi-container");
  if (!container) return;
  container.innerHTML = "";

  ProgressStore.unlockAchievement("community-voice");

  const resolvedTheme = document.documentElement.getAttribute("data-theme") || getCurrentTheme();
  const giscusTheme = resolvedTheme === "dark" ? "dark_dimmed" : "light";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "RIT-Base/RIT-Academy");
  script.setAttribute("data-repo-id", "R_kgDOU9z4yg");
  script.setAttribute("data-category", "Q&A");
  script.setAttribute("data-category-id", "DIC_kwDOU9z4ys4DHJz_");
  script.setAttribute("data-mapping", "specific");
  script.setAttribute("data-term", `${courseSlug}/${moduleSlug}`);
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", giscusTheme);
  script.setAttribute("data-lang", "id");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  container.appendChild(script);
}

document.addEventListener("DOMContentLoaded", main);