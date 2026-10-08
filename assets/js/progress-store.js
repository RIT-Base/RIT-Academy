// assets/js/progress-store.js
//
// Abstraksi progress belajar, profil, pencapaian (badges), dan sertifikat siswa.
// Arsitektur Dual-Storage Protection & Cloud Sync terintegrasi dengan Supabase & GitHub OAuth.
// JANGAN panggil localStorage langsung dari file lain — selalu lewat sini.

import {
  supabase,
  getUser,
  getSession,
  fetchUserProfile,
  upsertUserProfile,
  fetchUserProgress,
  upsertUserProgress,
  signOut as supabaseSignOut,
  onAuthStateChange,
} from "./supabase.js";

const STORAGE_KEY = "rit_progress_v1";
const LEGACY_STORAGE_KEY = "tcc_progress_v1";
const PROFILE_KEY = "rit_profile_v1";
const LEGACY_PROFILE_KEY = "tcc_profile_v1";
const ACHIEVEMENTS_KEY = "rit_achievements_v1";
const CERTS_KEY = "rit_certs_v1";

// Kunci penyimpanan khusus sesi Cloud & Perlindungan Dual-Storage
const GUEST_BACKUP_KEY = "rit_guest_backup_v1";
const AUTH_USER_KEY = "rit_auth_user_v1";
const LAST_SYNC_KEY = "rit_last_sync_v1";

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
    courseSlug: "level0",
  },
  {
    id: "web-dasar",
    title: "Web Crafter",
    icon: "code",
    color: "#05D9E7",
    desc: "Tuntaskan Web Dasar",
    type: "course",
    courseSlug: "web-dasar",
  },
  {
    id: "python-dasar",
    title: "Into Programming",
    icon: "terminal",
    color: "#f59e0b",
    desc: "Tuntaskan Pemrograman Dasar (Python)",
    type: "course",
    courseSlug: "python-dasar",
  },
  {
    id: "quiz-path",
    title: "Path Finder",
    icon: "explore",
    color: "#d946ef",
    desc: "Tuntaskan Quiz Path Orientasi IT",
    type: "course",
    courseSlug: "quiz-path",
  },
  {
    id: "web-dev",
    title: "Web Specialist",
    icon: "rocket_launch",
    color: "#2563eb",
    desc: "Tuntaskan Web Development Lanjutan",
    type: "course",
    courseSlug: "web-dev",
  },
  {
    id: "mobile",
    title: "Mobile Creator",
    icon: "phone_iphone",
    color: "#10b981",
    desc: "Tuntaskan Mobile Development",
    type: "course",
    courseSlug: "mobile",
  },
  {
    id: "game-dev",
    title: "Game Developer",
    icon: "sports_esports",
    color: "#f97316",
    desc: "Tuntaskan Game Development",
    type: "course",
    courseSlug: "game-dev",
  },
  {
    id: "data-ai",
    title: "Data & AI Explorer",
    icon: "psychology",
    color: "#8b5cf6",
    desc: "Tuntaskan Data, AI & Otomasi",
    type: "course",
    courseSlug: "data-ai",
  },
  {
    id: "cyber-security",
    title: "Security Scout",
    icon: "security",
    color: "#f43f5e",
    desc: "Tuntaskan Cybersecurity",
    type: "course",
    courseSlug: "cyber-security",
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: "cloud",
    color: "#0891b2",
    desc: "Tuntaskan DevOps & Cloud",
    type: "course",
    courseSlug: "devops",
  },
  {
    id: "jaringan",
    title: "Network Engineer",
    icon: "lan",
    color: "#eab308",
    desc: "Tuntaskan Jaringan Komputer",
    type: "course",
    courseSlug: "jaringan",
  },
  {
    id: "ui-ux",
    title: "UI/UX Designer",
    icon: "palette",
    color: "#ec4899",
    desc: "Tuntaskan UI/UX & Desain Produk",
    type: "course",
    courseSlug: "ui-ux",
  },
  {
    id: "qa-testing",
    title: "QA Tester",
    icon: "fact_check",
    color: "#4f46e5",
    desc: "Tuntaskan QA & Testing",
    type: "course",
    courseSlug: "qa-testing",
  },
  {
    id: "produk-analis",
    title: "Product Analyst",
    icon: "analytics",
    color: "#ea580c",
    desc: "Tuntaskan Produk & Analis IT",
    type: "course",
    courseSlug: "produk-analis",
  },
  {
    id: "iot-elektronika",
    title: "IoT Builder",
    icon: "memory",
    color: "#84cc16",
    desc: "Tuntaskan Elektronika & IoT",
    type: "course",
    courseSlug: "iot-elektronika",
  },
  {
    id: "it-support",
    title: "System Support",
    icon: "dns",
    color: "#64748b",
    desc: "Tuntaskan IT Support & Administrasi",
    type: "course",
    courseSlug: "it-support",
  },
  {
    id: "desain-grafis",
    title: "Creative Designer",
    icon: "draw",
    color: "#7c3aed",
    desc: "Tuntaskan Desain Grafis",
    type: "course",
    courseSlug: "desain-grafis",
  },
  // Lencana Eksplorasi & Komunitas
  {
    id: "sandbox-tinkerer",
    title: "Sandbox Tinkerer",
    icon: "handyman",
    color: "#84cc16",
    desc: "Mencoba eksperimen di Tools Sandbox",
    type: "interaction",
  },
  {
    id: "community-voice",
    title: "Community Voice",
    icon: "forum",
    color: "#38bdf8",
    desc: "Terlibat aktif di forum atau diskusi materi",
    type: "interaction",
  },
];

function readRaw() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        try {
          localStorage.setItem(STORAGE_KEY, legacyRaw);
        } catch (e) {}
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
  const isCompleted = data.done.some((d) => d.course === course && d.modul === modul);

  if (isCompleted) return "done";
  if (!Array.isArray(courseModules) || courseModules.length === 0) return "active";

  const sorted = [...courseModules].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const firstNotDone = sorted.find(
    (m) => !data.done.some((d) => d.course === course && d.modul === m.slug)
  );

  if (firstNotDone && firstNotDone.slug === modul) {
    return "active";
  }

  return "available";
}

function setDone(course, modul) {
  const data = readRaw();
  const already = data.done.some((d) => d.course === course && d.modul === modul);
  const nowIso = new Date().toISOString();

  if (!already) {
    data.done.push({ course, modul, doneAt: nowIso });
    writeRaw(data);

    // Background sync jika terhubung ke cloud
    syncModuleToCloudBackground(course, modul, nowIso);
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
        try {
          localStorage.setItem(PROFILE_KEY, legacyRaw);
        } catch (e) {}
      }
    }
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      nickname: parsed.nickname || "",
      kelas: parsed.kelas || "",
      github_username: parsed.github_username || "",
      avatar_url: parsed.avatar_url || "",
    };
  } catch (e) {
    return { nickname: "", kelas: "", github_username: "", avatar_url: "" };
  }
}

function setProfile({ nickname, kelas, github_username, avatar_url }) {
  try {
    const current = getProfile();
    const updated = {
      nickname: nickname !== undefined ? nickname : current.nickname,
      kelas: kelas !== undefined ? kelas : current.kelas,
      github_username: github_username !== undefined ? github_username : current.github_username,
      avatar_url: avatar_url !== undefined ? avatar_url : current.avatar_url,
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));

    // Background sync jika login
    syncProfileToCloudBackground(updated);
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

      // Background sync badges
      syncBadgesToCloudBackground(list);
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

    // Background sync sertifikat
    syncCertsToCloudBackground(certs);
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
    certificates: JSON.parse(localStorage.getItem(CERTS_KEY) || "{}"),
  };
}

function importData(entries, metadata = {}) {
  const data = readRaw();
  const existingMap = new Map();

  data.done.forEach((d) => existingMap.set(key(d.course, d.modul), d));

  entries.forEach((newEntry) => {
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
    metadata.achievements.forEach((a) => current.add(a));
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

// ==============================================================================
// CLOUD SYNC & DUAL-STORAGE PROTECTION (SUPABASE + GITHUB OAUTH)
// ==============================================================================

/**
 * Menyimpan cadangan sesi guest jika user sebelumnya memiliki data belajar.
 * Mencegah data guest tertimpa permanen oleh akun cloud di perangkat bersama (lab kampus).
 */
function backupGuestSession() {
  try {
    if (!localStorage.getItem(GUEST_BACKUP_KEY)) {
      const guestData = exportData();
      if (
        guestData.done.length > 0 ||
        guestData.achievements.length > 0 ||
        Boolean(guestData.profil.nickname)
      ) {
        localStorage.setItem(GUEST_BACKUP_KEY, JSON.stringify(guestData));
      }
    }
  } catch (err) {
    console.warn("ProgressStore: Gagal membuat backup guest session:", err);
  }
}

/**
 * Memulihkan sesi guest saat logout dan membersihkan cache akun aktif.
 */
function restoreGuestSession() {
  try {
    const rawBackup = localStorage.getItem(GUEST_BACKUP_KEY);
    if (rawBackup) {
      const backup = JSON.parse(rawBackup);
      if (backup && Array.isArray(backup.done)) {
        writeRaw({ done: backup.done });
      } else {
        resetAll();
      }
      if (backup?.profil) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(backup.profil));
      } else {
        localStorage.removeItem(PROFILE_KEY);
      }
      if (backup?.achievements) {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(backup.achievements));
      } else {
        localStorage.removeItem(ACHIEVEMENTS_KEY);
      }
      if (backup?.certificates) {
        localStorage.setItem(CERTS_KEY, JSON.stringify(backup.certificates));
      } else {
        localStorage.removeItem(CERTS_KEY);
      }
      localStorage.removeItem(GUEST_BACKUP_KEY);
    } else {
      // Jika tidak ada backup guest lama, bersihkan data lokal agar privasi akun aman di lab
      resetAll();
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(ACHIEVEMENTS_KEY);
      localStorage.removeItem(CERTS_KEY);
    }

    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(LAST_SYNC_KEY);
  } catch (err) {
    console.warn("ProgressStore: Gagal memulihkan guest session:", err);
  }
}

/**
 * Memeriksa apakah sesi pengguna saat ini terhubung ke cloud Supabase.
 */
function isCloudConnected() {
  try {
    return Boolean(localStorage.getItem(AUTH_USER_KEY));
  } catch (e) {
    return false;
  }
}

/**
 * Mengambil ringkasan data user terotentikasi dari cache lokal.
 */
function getAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Mengambil waktu terakhir sinkronisasi cloud.
 */
function getLastSyncTime() {
  try {
    return localStorage.getItem(LAST_SYNC_KEY) || null;
  } catch (e) {
    return null;
  }
}

/**
 * Sinkronisasi dua arah (Dual-Storage Conflict-Free Union) dengan Supabase.
 */
async function syncWithCloud() {
  try {
    const user = await getUser();
    if (!user) {
      localStorage.removeItem(AUTH_USER_KEY);
      return { success: false, reason: "unauthenticated" };
    }

    // 1. Simpan backup guest sebelum penggabungan jika belum ada
    backupGuestSession();

    // 2. Ambil data cloud profil dan progres secara paralel
    const [profileRes, progressRes] = await Promise.all([
      fetchUserProfile(user.id),
      fetchUserProgress(user.id),
    ]);

    const localData = exportData();
    const remoteProgress = progressRes.data || [];
    const remoteProfile = profileRes.data || {};

    // 3. Gabungkan Modul Selesai (Conflict-Free Union berdasarkan timestamp terbaru)
    const mergedMap = new Map();

    localData.done.forEach((item) => {
      mergedMap.set(key(item.course, item.modul), { ...item });
    });

    remoteProgress.forEach((row) => {
      const k = key(row.course_slug, row.module_slug);
      const remoteDoneAt = row.done_at;
      if (mergedMap.has(k)) {
        const localDoneAt = mergedMap.get(k).doneAt;
        if (new Date(remoteDoneAt).getTime() > new Date(localDoneAt).getTime()) {
          mergedMap.set(k, {
            course: row.course_slug,
            modul: row.module_slug,
            doneAt: remoteDoneAt,
          });
        }
      } else {
        mergedMap.set(k, {
          course: row.course_slug,
          modul: row.module_slug,
          doneAt: remoteDoneAt,
        });
      }
    });

    const mergedDone = Array.from(mergedMap.values());
    writeRaw({ done: mergedDone });

    // 4. Upsert semua progres yang tergabung kembali ke Supabase
    if (mergedDone.length > 0) {
      const upsertPayload = mergedDone.map((d) => ({
        user_id: user.id,
        course_slug: d.course,
        module_slug: d.modul,
        done_at: d.doneAt,
      }));
      await upsertUserProgress(upsertPayload);
    }

    // 5. Gabungkan Lencana (Achievements)
    const remoteAchievements = Array.isArray(remoteProfile.achievements)
      ? remoteProfile.achievements
      : [];
    const localAchievements = localData.achievements || [];
    const mergedAchievements = Array.from(
      new Set([...remoteAchievements, ...localAchievements])
    );
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(mergedAchievements));

    // 6. Gabungkan Sertifikat (Certificates)
    const remoteCerts =
      remoteProfile.certificates && typeof remoteProfile.certificates === "object"
        ? remoteProfile.certificates
        : {};
    const localCerts = localData.certificates || {};
    const mergedCerts = { ...remoteCerts, ...localCerts };
    localStorage.setItem(CERTS_KEY, JSON.stringify(mergedCerts));

    // 7. Resolusi Biodata Profil
    const userMeta = user.user_metadata || {};
    const githubUsername =
      remoteProfile.github_username ||
      userMeta.user_name ||
      userMeta.preferred_username ||
      "";
    const avatarUrl =
      remoteProfile.avatar_url ||
      userMeta.avatar_url ||
      "";
    const nickname =
      localData.profil?.nickname ||
      remoteProfile.nickname ||
      userMeta.full_name ||
      userMeta.user_name ||
      "";
    const kelas = localData.profil?.kelas || remoteProfile.kelas || "";

    const resolvedProfile = {
      nickname,
      kelas,
      github_username: githubUsername,
      avatar_url: avatarUrl,
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(resolvedProfile));

    // 8. Update profil di Supabase
    await upsertUserProfile({
      id: user.id,
      github_username: githubUsername,
      avatar_url: avatarUrl,
      nickname,
      kelas,
      achievements: mergedAchievements,
      certificates: mergedCerts,
      updated_at: new Date().toISOString(),
    });

    // 9. Simpan cache info auth & timestamp
    const authUserInfo = {
      id: user.id,
      email: user.email,
      github_username: githubUsername,
      avatar_url: avatarUrl,
      nickname,
      role: remoteProfile.role || "student",
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUserInfo));
    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    // 10. Pancarkan event selesainya sinkronisasi
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rit_cloud_sync_completed", {
          detail: { user: authUserInfo, count: mergedDone.length },
        })
      );
      window.dispatchEvent(
        new CustomEvent("rit_auth_state_changed", {
          detail: { loggedIn: true, user: authUserInfo },
        })
      );
    }

    return { success: true, user: authUserInfo, count: mergedDone.length };
  } catch (err) {
    console.error("ProgressStore: Gagal sinkronisasi cloud:", err);
    return { success: false, error: err };
  }
}

/**
 * Logout pengguna secara aman dengan pemulihan sesi guest.
 */
async function logout() {
  try {
    await supabaseSignOut();
  } catch (e) {
    console.warn("ProgressStore: Sign out error:", e);
  } finally {
    restoreGuestSession();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("rit_auth_state_changed", {
          detail: { loggedIn: false },
        })
      );
    }
  }
}

// Background Helper Helpers
function syncModuleToCloudBackground(course, modul, doneAt) {
  const authUser = getAuthUser();
  if (authUser?.id) {
    upsertUserProgress([
      {
        user_id: authUser.id,
        course_slug: course,
        module_slug: modul,
        done_at: doneAt,
      },
    ]).catch((e) => console.warn("Background progress sync:", e));
  }
}

function syncProfileToCloudBackground(profile) {
  const authUser = getAuthUser();
  if (authUser?.id) {
    upsertUserProfile({
      id: authUser.id,
      nickname: profile.nickname,
      kelas: profile.kelas,
      updated_at: new Date().toISOString(),
    }).catch((e) => console.warn("Background profile sync:", e));
  }
}

function syncBadgesToCloudBackground(achievements) {
  const authUser = getAuthUser();
  if (authUser?.id) {
    upsertUserProfile({
      id: authUser.id,
      achievements,
      updated_at: new Date().toISOString(),
    }).catch((e) => console.warn("Background badges sync:", e));
  }
}

function syncCertsToCloudBackground(certificates) {
  const authUser = getAuthUser();
  if (authUser?.id) {
    upsertUserProfile({
      id: authUser.id,
      certificates,
      updated_at: new Date().toISOString(),
    }).catch((e) => console.warn("Background certs sync:", e));
  }
}

// Inisialisasi Auth State Listener Otomatis
if (typeof window !== "undefined") {
  try {
    onAuthStateChange((event, session) => {
      if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        // Jalankan sync cloud di background
        syncWithCloud().catch((err) =>
          console.warn("ProgressStore onAuthStateChange sync error:", err)
        );
      } else if (event === "SIGNED_OUT") {
        restoreGuestSession();
      }
    });
  } catch (err) {
    console.warn("ProgressStore: onAuthStateChange listener init error:", err);
  }
}

/**
 * TASK-105: Mengambil role akun pengguna saat ini ('student' | 'reviewer' | 'admin').
 */
function getUserRole() {
  const authUser = getAuthUser();
  return authUser?.role || "student";
}

/**
 * TASK-105: Memeriksa apakah pengguna memiliki hak akses reviewer atau admin.
 */
function isReviewer() {
  const role = getUserRole();
  return role === "reviewer" || role === "admin";
}

/**
 * TASK-105: Memeriksa apakah pengguna memiliki hak akses admin penuh.
 */
function isAdmin() {
  return getUserRole() === "admin";
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
  // Cloud & Auth API
  syncWithCloud,
  logout,
  isCloudConnected,
  getAuthUser,
  getLastSyncTime,
  getUserRole,
  isReviewer,
  isAdmin,
  _key: key,
};
