// assets/js/progress-store.js
//
// Abstraksi progress belajar, profil, pencapaian (badges), dan sertifikat siswa.
// Disimpan di localStorage secara terstruktur.
// JANGAN panggil localStorage langsung dari file lain — selalu lewat sini.

const STORAGE_KEY = "rit_progress_v1";
const LEGACY_STORAGE_KEY = "tcc_progress_v1";
const PROFILE_KEY = "rit_profile_v1";
const LEGACY_PROFILE_KEY = "tcc_profile_v1";
const ACHIEVEMENTS_KEY = "rit_achievements_v1";
const CERTS_KEY = "rit_certs_v1";

// --- KATALOG RESMI BADGES PENCAPAIAN ---
export const BADGES_CATALOG = [
  // Lencana Jalur Pembelajaran (Course Badges)
  {
    id: "level0",
    title: "Digital Explorer",
    icon: "laptop_chromebook",
    color: "#0d9488",
    desc: "Tuntaskan Kenal IT (Level 0)",
    type: "course",
    courseSlug: "level0"
  },
  {
    id: "web-dasar",
    title: "Web Crafter",
    icon: "code",
    color: "#05D9E7",
    desc: "Tuntaskan Web Dasar",
    type: "course",
    courseSlug: "web-dasar"
  },
  {
    id: "python-dasar",
    title: "Into Programming",
    icon: "terminal",
    color: "#f59e0b",
    desc: "Tuntaskan Pemrograman Dasar (Python)",
    type: "course",
    courseSlug: "python-dasar"
  },
  {
    id: "quiz-path",
    title: "Path Finder",
    icon: "explore",
    color: "#d946ef",
    desc: "Tuntaskan Quiz Path Orientasi IT",
    type: "course",
    courseSlug: "quiz-path"
  },
  {
    id: "web-dev",
    title: "Web Specialist",
    icon: "rocket_launch",
    color: "#2563eb",
    desc: "Tuntaskan Web Development Lanjutan",
    type: "course",
    courseSlug: "web-dev"
  },
  {
    id: "mobile",
    title: "Mobile Creator",
    icon: "phone_iphone",
    color: "#10b981",
    desc: "Tuntaskan Mobile Development",
    type: "course",
    courseSlug: "mobile"
  },
  {
    id: "game-dev",
    title: "Game Developer",
    icon: "sports_esports",
    color: "#f97316",
    desc: "Tuntaskan Game Development",
    type: "course",
    courseSlug: "game-dev"
  },
  {
    id: "data-ai",
    title: "Data & AI Explorer",
    icon: "psychology",
    color: "#8b5cf6",
    desc: "Tuntaskan Data, AI & Otomasi",
    type: "course",
    courseSlug: "data-ai"
  },
  {
    id: "cyber-security",
    title: "Security Scout",
    icon: "security",
    color: "#f43f5e",
    desc: "Tuntaskan Cybersecurity",
    type: "course",
    courseSlug: "cyber-security"
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "cloud",
    color: "#0891b2",
    desc: "Tuntaskan DevOps & Cloud",
    type: "course",
    courseSlug: "devops"
  },
  {
    id: "jaringan",
    title: "Network Engineer",
    icon: "lan",
    color: "#eab308",
    desc: "Tuntaskan Jaringan Komputer",
    type: "course",
    courseSlug: "jaringan"
  },
  {
    id: "ui-ux",
    title: "UI/UX Designer",
    icon: "palette",
    color: "#ec4899",
    desc: "Tuntaskan UI/UX & Desain Produk",
    type: "course",
    courseSlug: "ui-ux"
  },
  {
    id: "qa-testing",
    title: "QA Tester",
    icon: "fact_check",
    color: "#4f46e5",
    desc: "Tuntaskan QA & Testing",
    type: "course",
    courseSlug: "qa-testing"
  },
  {
    id: "produk-analis",
    title: "Product Analyst",
    icon: "analytics",
    color: "#ea580c",
    desc: "Tuntaskan Produk & Analis IT",
    type: "course",
    courseSlug: "produk-analis"
  },
  {
    id: "iot-elektronika",
    title: "IoT Builder",
    icon: "memory",
    color: "#84cc16",
    desc: "Tuntaskan Elektronika & IoT",
    type: "course",
    courseSlug: "iot-elektronika"
  },
  {
    id: "it-support",
    title: "System Support",
    icon: "dns",
    color: "#64748b",
    desc: "Tuntaskan IT Support & Administrasi",
    type: "course",
    courseSlug: "it-support"
  },
  {
    id: "desain-grafis",
    title: "Creative Designer",
    icon: "draw",
    color: "#7c3aed",
    desc: "Tuntaskan Desain Grafis",
    type: "course",
    courseSlug: "desain-grafis"
  },
  // Lencana Eksplorasi & Komunitas
  {
    id: "sandbox-tinkerer",
    title: "Sandbox Tinkerer",
    icon: "handyman",
    color: "#84cc16",
    desc: "Mencoba eksperimen di Tools Sandbox",
    type: "interaction"
  },
  {
    id: "community-voice",
    title: "Community Voice",
    icon: "forum",
    color: "#38bdf8",
    desc: "Terlibat aktif di forum atau diskusi materi",
    type: "interaction"
  }
];

function readRaw() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Fallback ke legacy storage key jika ada data lama
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        try { localStorage.setItem(STORAGE_KEY, legacyRaw); } catch (e) {}
      }
    }
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

// --- FITUR PROFIL & PENGATURAN ---

function getProfile() {
  try {
    let raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      const legacyRaw = localStorage.getItem(LEGACY_PROFILE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        try { localStorage.setItem(PROFILE_KEY, legacyRaw); } catch (e) {}
      }
    }
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

// --- GAMIFIKASI BADGES (ACHIEVEMENTS) ---

function getUnlockedAchievements() {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function unlockAchievement(id) {
  if (!id) return false;
  try {
    const list = getUnlockedAchievements();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(list));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("rit_achievement_unlocked", { detail: { id } }));
      }
      return true;
    }
  } catch (e) {
    console.warn("ProgressStore: gagal membuka achievement", e);
  }
  return false;
}

function isAchievementUnlocked(id) {
  return getUnlockedAchievements().includes(id);
}

// --- KELULUSAN & SERTIFIKAT ---

function isCourseCompleted(courseSlug, courseModules) {
  if (!Array.isArray(courseModules) || courseModules.length === 0) return false;
  const data = readRaw();
  const completed = courseModules.every((m) =>
    data.done.some((d) => d.course === courseSlug && d.modul === m.slug)
  );
  if (completed) {
    unlockAchievement(courseSlug);
  }
  return completed;
}

function getCertificateSerial(courseSlug) {
  try {
    const raw = localStorage.getItem(CERTS_KEY);
    const certs = raw ? JSON.parse(raw) : {};
    if (certs[courseSlug]) return certs[courseSlug];

    const cleanSlug = (courseSlug || "GEN").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const serial = `RIT-${cleanSlug}-${randomHex}`;

    certs[courseSlug] = serial;
    localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
    return serial;
  } catch (e) {
    return `RIT-${(courseSlug || "GEN").toUpperCase()}-CERT`;
  }
}

// --- EXPORT & IMPORT DATA PROGRESS ---

function exportData() {
  return {
    app: "rit-academy",
    version: 1,
    exportedAt: new Date().toISOString(),
    profil: getProfile(),
    done: getDoneList(),
    achievements: getUnlockedAchievements(),
    certificates: JSON.parse(localStorage.getItem(CERTS_KEY) || "{}")
  };
}

function importData(entries, metadata = {}) {
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

  if (Array.isArray(metadata.achievements)) {
    const current = new Set(getUnlockedAchievements());
    metadata.achievements.forEach(a => current.add(a));
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(Array.from(current)));
  }

  if (metadata.certificates && typeof metadata.certificates === "object") {
    try {
      const current = JSON.parse(localStorage.getItem(CERTS_KEY) || "{}");
      Object.assign(current, metadata.certificates);
      localStorage.setItem(CERTS_KEY, JSON.stringify(current));
    } catch (e) {}
  }
}

export const ProgressStore = {
  getStatus,
  setDone,
  isDone,
  getDoneList,
  resetAll,
  resetCourse,
  getProfile,
  setProfile,
  getUnlockedAchievements,
  unlockAchievement,
  isAchievementUnlocked,
  isCourseCompleted,
  getCertificateSerial,
  exportData,
  importData,
  _key: key,
};
