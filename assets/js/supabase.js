// assets/js/supabase.js
//
// Inisialisasi Supabase Client & Helper Service untuk RIT Academy.
// Menggunakan library resmi @supabase/supabase-js v2 via ESM CDN.
// Menyediakan OAuth GitHub, pengelolaan sesi, sinkronisasi profil, progres belajar, dan submissions.

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

export const SUPABASE_URL = "https://yukdfjcidvyqspulakab.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1a2RmamNpZHZ5cXNwdWxha2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODM0MDUsImV4cCI6MjEwNjg1OTQwNX0.gyBfwOC-h48SKyAzcBQpFggeBp-BCWK1W2Lu9XsShr0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

/**
 * Mendapatkan URL pengalihan pasca-otentikasi OAuth.
 * Otomatis mendeteksi lingkungan GitHub Pages vs Localhost.
 */
export function getRedirectUrl() {
  if (typeof window === "undefined") return "";
  const origin = window.location.origin;
  if (origin.includes("github.io")) {
    return "https://rit-base.github.io/RIT-Academy/profil.html";
  }
  return `${origin}/profil.html`;
}

/**
 * Memicu alur login One-Click GitHub OAuth.
 */
export async function signInWithGitHub() {
  try {
    const redirectTo = getRedirectUrl();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
        scopes: "read:user user:email",
      },
    });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error("Supabase: Gagal login dengan GitHub:", err);
    return { data: null, error: err };
  }
}

/**
 * Logout dari sesi Supabase.
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error("Supabase: Gagal keluar:", err);
    return { error: err };
  }
}

/**
 * Mengambil sesi aktif saat ini.
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data?.session || null;
  } catch (err) {
    console.warn("Supabase: Gagal membaca sesi:", err);
    return null;
  }
}

/**
 * Mengambil data user yang terautentikasi.
 */
export async function getUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return data.user;
  } catch (err) {
    return null;
  }
}

/**
 * Memasang pendengar perubahan status otentikasi.
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

/**
 * Mengambil baris profil dari tabel public.profiles berdasarkan user UUID.
 */
export async function fetchUserProfile(userId) {
  if (!userId) return { data: null, error: new Error("User ID diperlukan") };
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn("Supabase: Gagal mengambil data profil:", err);
    return { data: null, error: err };
  }
}

/**
 * Memperbarui / upsert profil pengguna di tabel public.profiles.
 */
export async function upsertUserProfile(profileData) {
  if (!profileData || !profileData.id) {
    return { data: null, error: new Error("ID pengguna diperlukan untuk upsert profil") };
  }
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(profileData)
      .select()
      .maybeSingle();
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn("Supabase: Gagal menyimpan data profil:", err);
    return { data: null, error: err };
  }
}

/**
 * Mengambil seluruh riwayat modul yang telah selesai dari public.user_progress.
 */
export async function fetchUserProgress(userId) {
  if (!userId) return { data: [], error: new Error("User ID diperlukan") };
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("id, user_id, course_slug, module_slug, done_at")
      .eq("user_id", userId);
    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.warn("Supabase: Gagal mengambil data progres pengguna:", err);
    return { data: [], error: err };
  }
}

/**
 * Melakukan upsert batch modul selesai ke tabel public.user_progress.
 */
export async function upsertUserProgress(entries) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return { data: [], error: null };
  }
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .upsert(entries, { onConflict: "user_id,course_slug,module_slug" });
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn("Supabase: Gagal upsert user_progress:", err);
    return { data: null, error: err };
  }
}

/**
 * Mengirimkan atau memperbarui submission tugas akhir di public.project_submissions.
 */
export async function submitProject(submissionData) {
  if (!submissionData || !submissionData.user_id || !submissionData.course_slug) {
    return { data: null, error: new Error("Data submission tidak lengkap") };
  }
  try {
    const { data, error } = await supabase
      .from("project_submissions")
      .upsert(submissionData, { onConflict: "user_id,course_slug" })
      .select()
      .maybeSingle();
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn("Supabase: Gagal mengirimkan tugas akhir:", err);
    return { data: null, error: err };
  }
}

/**
 * Mengambil 1 baris submission spesifik untuk user dan course tertentu.
 */
export async function fetchSubmission(userId, courseSlug) {
  if (!userId || !courseSlug) {
    return { data: null, error: new Error("userId dan courseSlug diperlukan") };
  }
  try {
    const { data, error } = await supabase
      .from("project_submissions")
      .select("*")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .maybeSingle();
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn("Supabase: Gagal mengambil data submission:", err);
    return { data: null, error: err };
  }
}

/**
 * Mengambil seluruh riwayat submission proyek akhir milik seorang pengguna.
 */
export async function fetchUserSubmissions(userId) {
  if (!userId) return { data: [], error: new Error("userId diperlukan") };
  try {
    const { data, error } = await supabase
      .from("project_submissions")
      .select("*")
      .eq("user_id", userId)
      .order("submitted_at", { ascending: false });
    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    console.warn("Supabase: Gagal mengambil riwayat submission:", err);
    return { data: [], error: err };
  }
}

