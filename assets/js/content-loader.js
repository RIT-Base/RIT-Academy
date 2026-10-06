// assets/js/content-loader.js
//
// Semua akses ke folder /content lewat sini. Bertugas fetch + parse:
// - index.json (daftar course)
// - paths/index.json (daftar learning path)
// - lesson.md (front matter YAML sederhana + body markdown)
// - tasks.json (task checkpoint)
//
// Selalu graceful terhadap file yang belum ada (folder disiapkan Sensei
// tapi belum diisi) — mengembalikan null, bukan melempar error ke console.

async function fetchText(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    console.warn(`content-loader: gagal fetch ${path}`, err);
    return null;
  }
}

async function fetchJSON(path) {
  const text = await fetchText(path);
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn(`content-loader: gagal parse JSON ${path}`, err);
    return null;
  }
}

/** Parser YAML front matter super sederhana: hanya key: value satu baris. */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const [, fmBlock, body] = match;
  const meta = {};
  fmBlock.split("\n").forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) return;
    let [, k, v] = m;
    v = v.trim();
    // buang quote di awal/akhir kalau ada
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    // angka jadi number (mis. order)
    if (/^\d+$/.test(v)) v = Number(v);
    meta[k] = v;
  });
  return { meta, body };
}

// Path RELATIF (tanpa awalan "/") supaya tetap benar walau website di-host
// di subfolder (mis. GitHub Pages project page: username.github.io/repo/).
// Semua halaman yang memanggil ini ada di root project, jadi "content/..."
// selalu resolve relatif terhadap root tsb.

async function loadCourseIndex() {
  return fetchJSON("content/index.json");
}

async function loadPathsIndex() {
  return fetchJSON("content/paths/index.json");
}

async function loadLessonRaw(course, modul) {
  const raw = await fetchText(`content/${course}/${modul}/lesson.md`);
  if (raw === null) return null;
  return parseFrontMatter(raw);
}

async function loadTasks(course, modul) {
  return fetchJSON(`content/${course}/${modul}/tasks.json`);
}

export const ContentLoader = {
  loadCourseIndex,
  loadPathsIndex,
  loadLessonRaw,
  loadTasks,
  fetchJSON,
  fetchText,
};
