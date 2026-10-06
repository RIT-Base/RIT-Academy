// assets/js/progress-store.js
//
// Abstraksi progress belajar siswa. SEKARANG disimpan di localStorage,
// tapi nanti akan diganti Supabase tanpa mengubah kode yang memanggilnya.
// JANGAN panggil localStorage langsung dari file lain — selalu lewat sini.

// assets/js/progress-store.js
const STORAGE_KEY = "tcc_progress_v1";
const PROFILE_KEY = "tcc_profile_v1";

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { done: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.done)) return { done: [] };
    return parsed;
  } catch (err) {
    console.warn("ProgressStore: gagal membaca localStorage", err);
    return { done: [] };
  }
}

function writeRaw(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("ProgressStore: gagal menyimpan localStorage", err);
  }
}

function key(course, modul) {
  return `${course}::${modul}`;
}

function getStatus(course, modul, courseModules) {
  const data = readRaw();
  const isDone = data.done.some((d) => d.course === course && d.modul === modul);
  
  if (isDone) return "done";
  if (!Array.isArray(courseModules) || courseModules.length === 0) return "active";
  
  const sorted = [...courseModules].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  
  // Cari modul pertama yang belum selesai berdasarkan urutan
  const firstNotDone = sorted.find(m => !data.done.some(d => d.course === course && d.modul === m.slug));
  
  // Jika modul yang dicek adalah modul pertama yang belum selesai -> Disarankan (Active)
  if (firstNotDone && firstNotDone.slug === modul) {
    return "active";
  }
  
  // Jika tidak, modul tetap terbuka (Available) bukan Locked
  return "available";
}

function setDone(course, modul) {
  const data = readRaw();
  const already = data.done.some((d) => d.course === course && d.modul === modul);
  if (!already) {
    data.done.push({ course, modul, doneAt: new Date().toISOString() });
    writeRaw(data);
  }
}

function isDone(course, modul) {
  const data = readRaw();
  return data.done.some((d) => d.course === course && d.modul === modul);
}

function getDoneList() {
  return readRaw().done;
}

function resetAll() {
  writeRaw({ done: [] });
}

function resetCourse(course) {
  const data = readRaw();
  data.done = data.done.filter((d) => d.course !== course);
  writeRaw(data);
}

// --- FITUR PROFIL FASE 0.5 ---

function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : { nickname: "", kelas: "" };
  } catch (e) {
    return { nickname: "", kelas: "" };
  }
}

function setProfile({ nickname, kelas }) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ nickname, kelas }));
  } catch (e) {
    console.warn("ProgressStore: gagal menyimpan profil", e);
  }
}

function exportData() {
  return {
    app: "tcc-academy",
    version: 1,
    exportedAt: new Date().toISOString(),
    profil: getProfile(),
    done: getDoneList()
  };
}

function importData(entries) {
  const data = readRaw();
  const existingMap = new Map();
  
  data.done.forEach(d => existingMap.set(key(d.course, d.modul), d));
  
  entries.forEach(newEntry => {
    const k = key(newEntry.course, newEntry.modul);
    if (existingMap.has(k)) {
      const existingAt = new Date(existingMap.get(k).doneAt).getTime();
      const newAt = new Date(newEntry.doneAt).getTime();
      if (newAt > existingAt) existingMap.set(k, newEntry);
    } else {
      existingMap.set(k, newEntry);
    }
  });
  
  data.done = Array.from(existingMap.values());
  writeRaw(data);
}

export const ProgressStore = {
  getStatus, setDone, isDone, getDoneList, resetAll, resetCourse,
  getProfile, setProfile, exportData, importData,
  _key: key,
};