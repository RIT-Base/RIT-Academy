// assets/js/pages/review.js
//
// Controller Halaman Review Submission & Role Management (TASK-105).
// Menangani autentikasi gatekeeper (Guest / Student 403 / Reviewer Dashboard),
// filter reaktif per status/course, pencarian teks instan (debounce),
// modal evaluasi tugas akhir, dan modal manajemen akun reviewer.

import {
  getUser,
  fetchUserProfile,
  fetchAllSubmissionsWithProfiles,
  updateSubmissionReview,
  fetchReviewers,
  searchProfiles,
  updateProfileRole,
} from "../supabase.js";
import { ProgressStore } from "../progress-store.js";
import { ContentLoader } from "../content-loader.js";

// --- State Aplikasi Review ---
let currentUser = null;
let currentRole = "student";
let allSubmissions = [];
let filteredSubmissions = [];
let coursesCatalog = [];
let activeReviewSubmission = null;

let filterStatus = "all";
let filterCourse = "all";
let searchQuery = "";
let sortBy = "newest";

let searchDebounceTimer = null;

// Helper Sanitasi Teks (XSS Prevention)
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper Format Tanggal Indonesia
function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (e) {
    return dateStr;
  }
}

// Toast Notification
function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    background: ${type === "success" ? "var(--color-surface)" : "var(--color-surface)"};
    border-left: 4px solid ${type === "success" ? "var(--color-success)" : "var(--color-danger)"};
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    margin-bottom: 8px;
    font-size: var(--fs-sm);
    color: var(--color-text);
    animation: fadeIn 0.2s ease-out;
  `;

  const iconName = type === "success" ? "check_circle" : "error";
  const iconColor = type === "success" ? "var(--color-success)" : "var(--color-danger)";

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: ${iconColor}; font-size: 20px;">${iconName}</span>
    <span>${escapeHtml(message)}</span>
  `;

  root.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Status Mapping ---
const STATUS_METADATA = {
  submitted: { label: "Menunggu Review", icon: "hourglass_empty", class: "is-submitted" },
  reviewed: { label: "Sedang Ditinjau", icon: "rate_review", class: "is-reviewed" },
  approved: { label: "Disetujui", icon: "verified", class: "is-approved" },
  revision: { label: "Perlu Revisi", icon: "warning", class: "is-revision" },
};

// --- Inisialisasi Utama ---
async function init() {
  const mount = document.getElementById("review-mount");
  if (!mount) return;

  try {
    // 1. Dapatkan info user aktif
    let authUser = ProgressStore.getAuthUser();
    if (!authUser) {
      authUser = await getUser();
    }

    if (!authUser) {
      renderGuestGate(mount);
      return;
    }

    currentUser = authUser;

    // 2. Verifikasi role terbaru dari Supabase
    try {
      const { data: prof } = await fetchUserProfile(authUser.id);
      if (prof && prof.role) {
        currentRole = prof.role;
      } else if (authUser.role) {
        currentRole = authUser.role;
      } else {
        currentRole = "student";
      }
    } catch (err) {
      currentRole = authUser.role || "student";
    }

    // 3. Gatekeeper Role Access
    if (currentRole !== "reviewer" && currentRole !== "admin") {
      renderStudentRestrictedGate(mount, authUser);
      return;
    }

    // 4. Pengguna lolos verifikasi sebagai Reviewer / Admin
    await loadCoursesCatalog();
    await loadSubmissions();
    renderDashboard(mount);
    setupEventListeners();
  } catch (err) {
    console.error("review.js: Terjadi kesalahan saat inisialisasi:", err);
    mount.innerHTML = `
      <div class="card" style="text-align: center; padding: var(--space-6); border: 1px solid var(--color-danger);">
        <span class="material-symbols-outlined" style="font-size: 40px; color: var(--color-danger);">error</span>
        <h3 style="margin: var(--space-2) 0;">Gagal Memuat Panel Review</h3>
        <p class="text-muted" style="font-size: var(--fs-sm);">${escapeHtml(err.message || "Terjadi kesalahan sistem.")}</p>
        <button type="button" class="btn btn-outline" onclick="window.location.reload()" style="margin-top: var(--space-3);">
          Muat Ulang Halaman
        </button>
      </div>
    `;
  }
}

// --- Render Tampilan Gate 1: Guest (Belum Login) ---
function renderGuestGate(mount) {
  mount.innerHTML = `
    <div class="gate-lock-card">
      <div class="gate-lock-icon" style="background: var(--color-primary-light); color: var(--color-primary-dark);">
        <span class="material-symbols-outlined" style="font-size: 38px;">lock</span>
      </div>
      <h2 style="margin: 0; font-size: var(--fs-xl);">Akses Khusus Reviewer &amp; Mentor</h2>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm); max-width: 46ch; line-height: 1.6;">
        Silakan masuk menggunakan akun GitHub Anda untuk membuka panel evaluasi tugas mahasiswa RIT Academy.
      </p>
      <div style="margin-top: var(--space-3); display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center;">
        <a href="login.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 12px 24px;">
          <svg class="github-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>Masuk dengan GitHub</span>
        </a>
        <a href="index.html" class="btn btn-outline" style="text-decoration: none; padding: 12px 20px;">
          Kembali ke Beranda
        </a>
      </div>
    </div>
  `;
}

// --- Render Tampilan Gate 2: Siswa (403 Akses Dibatasi) ---
function renderStudentRestrictedGate(mount, user) {
  const handle = user.github_username || user.nickname || "Siswa";
  mount.innerHTML = `
    <div class="gate-lock-card">
      <div class="gate-lock-icon" style="background: var(--color-warning-light); color: var(--color-warning);">
        <span class="material-symbols-outlined" style="font-size: 38px;">shield_lock</span>
      </div>
      <span class="badge" style="background: var(--color-surface-alt); font-size: 11px;">KODE AKSES: 403 RESTRICTED</span>
      <h2 style="margin: 0; font-size: var(--fs-xl);">Akses Terbatas: Khusus Reviewer</h2>
      <p class="text-muted" style="margin: 0; font-size: var(--fs-sm); max-width: 48ch; line-height: 1.6;">
        Akun <strong>@${escapeHtml(handle)}</strong> Anda saat ini terdaftar sebagai <strong>Siswa</strong>. Hanya akun yang memiliki peran <strong>Reviewer</strong> atau <strong>Admin</strong> yang berwenang meninjau dan menilai tugas akhir mahasiswa.
      </p>
      <div style="margin-top: var(--space-3); display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: center;">
        <a href="profil.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 12px 24px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">person</span>
          <span>Kembali ke Profil Saya</span>
        </a>
        <a href="paths.html" class="btn btn-outline" style="text-decoration: none; padding: 12px 20px;">
          Lanjut Belajar
        </a>
      </div>
    </div>
  `;
}

// --- Data Fetchers ---
async function loadCoursesCatalog() {
  try {
    const data = await ContentLoader.loadCourseIndex();
    coursesCatalog = data?.courses || [];
  } catch (e) {
    coursesCatalog = [];
  }
}

async function loadSubmissions() {
  try {
    const res = await fetchAllSubmissionsWithProfiles();
    allSubmissions = res.data || [];
    applyFilters();
  } catch (e) {
    console.error("Gagal load submissions:", e);
    allSubmissions = [];
    filteredSubmissions = [];
  }
}

// --- Filter & Sorting Logic ---
function applyFilters() {
  const q = searchQuery.toLowerCase().trim();

  filteredSubmissions = allSubmissions.filter((s) => {
    // 1. Status Filter
    if (filterStatus !== "all" && s.status !== filterStatus) {
      return false;
    }

    // 2. Course Filter
    if (filterCourse !== "all" && s.course_slug !== filterCourse) {
      return false;
    }

    // 3. Search Query
    if (q) {
      const studentName = (s.profiles?.nickname || "").toLowerCase();
      const studentUser = (s.profiles?.github_username || "").toLowerCase();
      const courseMeta = coursesCatalog.find((c) => c.slug === s.course_slug);
      const courseTitle = (courseMeta?.title || s.course_slug || "").toLowerCase();
      const notes = (s.notes || "").toLowerCase();

      const matched =
        studentName.includes(q) ||
        studentUser.includes(q) ||
        courseTitle.includes(q) ||
        notes.includes(q);

      if (!matched) return false;
    }

    return true;
  });

  // 4. Sort
  filteredSubmissions.sort((a, b) => {
    if (sortBy === "oldest") {
      return new Date(a.submitted_at || 0) - new Date(b.submitted_at || 0);
    }
    if (sortBy === "status") {
      const priority = { submitted: 1, revision: 2, reviewed: 3, approved: 4 };
      const pA = priority[a.status] || 99;
      const pB = priority[b.status] || 99;
      if (pA !== pB) return pA - pB;
      return new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0);
    }
    // Default: newest
    return new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0);
  });
}

// Hitung Statistik
function getCounts() {
  const counts = {
    all: allSubmissions.length,
    submitted: 0,
    reviewed: 0,
    approved: 0,
    revision: 0,
  };

  allSubmissions.forEach((s) => {
    if (counts[s.status] !== undefined) {
      counts[s.status]++;
    }
  });

  return counts;
}

// --- Render Dashboard Lengkap ---
function renderDashboard(mount) {
  const counts = getCounts();

  mount.innerHTML = `
    <!-- Header Dashboard -->
    <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-5);">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <h2 style="margin: 0; font-size: var(--fs-xl);">Panel Evaluasi &amp; Review Tugas</h2>
          <span class="role-badge ${currentRole === "admin" ? "is-admin" : "is-reviewer"}">
            ${currentRole === "admin" ? "ADMIN" : "REVIEWER"}
          </span>
        </div>
        <p class="text-muted" style="margin: 0; font-size: var(--fs-sm);">
          Evaluasi proyek akhir mahasiswa, berikan masukan konstruktif, dan tetapkan status kelulusan.
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: var(--space-2);">
        <button type="button" id="btn-open-role-modal" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 8px; font-size: var(--fs-sm);">
          <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-primary);">manage_accounts</span>
          <span>Kelola Reviewer</span>
        </button>
        <button type="button" id="btn-refresh-submissions" class="btn btn-outline icon-btn" title="Segarkan Data" aria-label="Segarkan Data">
          <span class="material-symbols-outlined" style="font-size: 20px;">refresh</span>
        </button>
      </div>
    </div>

    <!-- Ringkasan Statistik -->
    <div class="review-stats-grid">
      <div class="review-stat-card">
        <div class="review-stat-icon" style="background: var(--color-surface-alt); color: var(--color-text);">
          <span class="material-symbols-outlined" style="font-size: 24px;">folder</span>
        </div>
        <div>
          <div class="review-stat-num" id="stat-total">${counts.all}</div>
          <div class="review-stat-label">Total Submission</div>
        </div>
      </div>

      <div class="review-stat-card" style="border-left: 3px solid var(--color-warning);">
        <div class="review-stat-icon" style="background: var(--color-warning-light); color: var(--color-warning);">
          <span class="material-symbols-outlined" style="font-size: 24px;">hourglass_empty</span>
        </div>
        <div>
          <div class="review-stat-num" id="stat-submitted" style="color: var(--color-warning);">${counts.submitted}</div>
          <div class="review-stat-label">Menunggu Review</div>
        </div>
      </div>

      <div class="review-stat-card" style="border-left: 3px solid var(--color-danger);">
        <div class="review-stat-icon" style="background: var(--color-danger-light); color: var(--color-danger);">
          <span class="material-symbols-outlined" style="font-size: 24px;">warning</span>
        </div>
        <div>
          <div class="review-stat-num" id="stat-revision" style="color: var(--color-danger);">${counts.revision}</div>
          <div class="review-stat-label">Perlu Revisi</div>
        </div>
      </div>

      <div class="review-stat-card" style="border-left: 3px solid var(--color-success);">
        <div class="review-stat-icon" style="background: var(--color-success-light); color: var(--color-success);">
          <span class="material-symbols-outlined" style="font-size: 24px;">verified</span>
        </div>
        <div>
          <div class="review-stat-num" id="stat-approved" style="color: var(--color-success);">${counts.approved}</div>
          <div class="review-stat-label">Disetujui</div>
        </div>
      </div>
    </div>

    <!-- Toolbar: Search, Filter, Sort -->
    <div class="review-toolbar">
      <div class="review-toolbar__row">
        <!-- Search Input -->
        <div class="review-search-wrapper">
          <span class="material-symbols-outlined review-search-icon">search</span>
          <input type="text" id="review-search-input" class="review-search-input" placeholder="Cari nama siswa, @github_username, judul course, atau catatan..." value="${escapeHtml(searchQuery)}">
        </div>

        <!-- Filter Dropdown Course & Sort -->
        <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;">
          <select id="review-course-select" class="form-input" style="padding: 8px 12px; font-size: var(--fs-xs); width: auto; min-width: 170px;">
            <option value="all">Semua Learning Path</option>
            ${coursesCatalog
              .map(
                (c) =>
                  `<option value="${c.slug}" ${filterCourse === c.slug ? "selected" : ""}>${escapeHtml(c.title)}</option>`
              )
              .join("")}
          </select>

          <select id="review-sort-select" class="form-input" style="padding: 8px 12px; font-size: var(--fs-xs); width: auto;">
            <option value="newest" ${sortBy === "newest" ? "selected" : ""}>Terbaru Masuk</option>
            <option value="oldest" ${sortBy === "oldest" ? "selected" : ""}>Terlama Masuk</option>
            <option value="status" ${sortBy === "status" ? "selected" : ""}>Prioritas Status</option>
          </select>
        </div>
      </div>

      <!-- Filter Pills Status -->
      <div class="filter-pills" id="status-pills-container">
        <button type="button" class="filter-pill-btn ${filterStatus === "all" ? "is-active" : ""}" data-status="all">
          <span>Semua</span>
          <span class="filter-pill-count">${counts.all}</span>
        </button>
        <button type="button" class="filter-pill-btn ${filterStatus === "submitted" ? "is-active" : ""}" data-status="submitted">
          <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-warning);">hourglass_empty</span>
          <span>Menunggu Review</span>
          <span class="filter-pill-count">${counts.submitted}</span>
        </button>
        <button type="button" class="filter-pill-btn ${filterStatus === "revision" ? "is-active" : ""}" data-status="revision">
          <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-danger);">warning</span>
          <span>Perlu Revisi</span>
          <span class="filter-pill-count">${counts.revision}</span>
        </button>
        <button type="button" class="filter-pill-btn ${filterStatus === "approved" ? "is-active" : ""}" data-status="approved">
          <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-success);">verified</span>
          <span>Disetujui</span>
          <span class="filter-pill-count">${counts.approved}</span>
        </button>
        <button type="button" class="filter-pill-btn ${filterStatus === "reviewed" ? "is-active" : ""}" data-status="reviewed">
          <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-accent);">rate_review</span>
          <span>Sedang Ditinjau</span>
          <span class="filter-pill-count">${counts.reviewed}</span>
        </button>
      </div>
    </div>

    <!-- Container Daftar Submission -->
    <div id="submissions-list-container" class="review-grid">
      ${renderSubmissionsCards()}
    </div>
  `;
}

// --- Render Kartu-Kartu Submission ---
function renderSubmissionsCards() {
  if (filteredSubmissions.length === 0) {
    return `
      <div class="card" style="text-align: center; padding: var(--space-7) var(--space-4); background: var(--color-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-lg);">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-text-faint); margin-bottom: var(--space-2);">folder_open</span>
        <h3 style="margin: 0 0 6px 0; font-size: var(--fs-md);">Tidak ada submission yang sesuai</h3>
        <p class="text-muted" style="margin: 0; font-size: var(--fs-xs); max-width: 44ch; margin-inline: auto;">
          ${
            searchQuery || filterStatus !== "all" || filterCourse !== "all"
              ? "Coba ubah kata kunci pencarian atau sesuaikan opsi filter status dan learning path."
              : "Belum ada siswa yang mengumpulkan tugas akhir ke database RIT Academy."
          }
        </p>
      </div>
    `;
  }

  return filteredSubmissions
    .map((s) => {
      const profile = s.profiles || {};
      const studentName = profile.nickname || profile.github_username || "Siswa RIT";
      const githubHandle = profile.github_username || "";
      const avatarUrl = profile.avatar_url || "";

      const courseMeta = coursesCatalog.find((c) => c.slug === s.course_slug);
      const courseTitle = courseMeta ? courseMeta.title : s.course_slug;

      const dateStr = formatDateIndo(s.submitted_at);
      const statusInfo = STATUS_METADATA[s.status] || STATUS_METADATA.submitted;

      return `
        <article class="review-card" data-sub-id="${s.id}">
          <!-- Header Kartu -->
          <div class="review-card__header">
            <div class="review-card__student">
              ${
                avatarUrl
                  ? `<img src="${avatarUrl}" alt="${escapeHtml(studentName)}" class="review-student-avatar" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="review-student-avatar-fallback" style="display: none;">${escapeHtml(studentName.charAt(0).toUpperCase())}</div>`
                  : `<div class="review-student-avatar-fallback">${escapeHtml(studentName.charAt(0).toUpperCase())}</div>`
              }
              <div class="review-student-info">
                <h4>${escapeHtml(studentName)}</h4>
                ${
                  githubHandle
                    ? `<a href="https://github.com/${githubHandle}" target="_blank" rel="noopener" class="review-student-handle">@${escapeHtml(githubHandle)}</a>`
                    : `<span style="font-size: var(--fs-xs); color: var(--color-text-muted);">Siswa Terdaftar</span>`
                }
              </div>
            </div>

            <div class="review-card__meta">
              <span class="submission-pill ${statusInfo.class}">
                <span class="material-symbols-outlined" style="font-size: 13px;">${statusInfo.icon}</span>
                <span>${statusInfo.label}</span>
              </span>
              <span style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-muted);">${dateStr}</span>
            </div>
          </div>

          <!-- Body Kartu -->
          <div class="review-card__body">
            <div class="review-course-badge">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-primary);">school</span>
              <span>Learning Path: <strong>${escapeHtml(courseTitle)}</strong></span>
            </div>

            ${
              s.notes
                ? `<div class="review-student-notes">
                    <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted); display: block; margin-bottom: 2px;">Catatan Mahasiswa:</strong>
                    &ldquo;${escapeHtml(s.notes)}&rdquo;
                   </div>`
                : ""
            }

            ${
              s.reviewer_feedback
                ? `<div class="reviewer-feedback-box ${statusInfo.class}">
                    <div class="reviewer-feedback-header">
                      <span style="display: inline-flex; align-items: center; gap: 4px;">
                        <span class="material-symbols-outlined" style="font-size: 15px;">rate_review</span>
                        <span>Catatan Feedback Evaluasi Sebelumnya:</span>
                      </span>
                      ${
                        s.reviewed_at
                          ? `<span class="reviewer-feedback-date">${formatDateIndo(s.reviewed_at)}</span>`
                          : ""
                      }
                    </div>
                    <div class="reviewer-feedback-body">${escapeHtml(s.reviewer_feedback)}</div>
                   </div>`
                : ""
            }
          </div>

          <!-- Footer Kartu: Link & Tombol Review -->
          <div class="review-card__actions">
            <div class="review-card__links">
              <a href="${s.repo_url}" target="_blank" rel="noopener" class="submission-link-pill">
                <span class="material-symbols-outlined" style="font-size: 15px;">code</span>
                <span>Repositori GitHub</span>
              </a>
              ${
                s.demo_url
                  ? `<a href="${s.demo_url}" target="_blank" rel="noopener" class="submission-link-pill" style="color: var(--color-accent);">
                      <span class="material-symbols-outlined" style="font-size: 15px;">open_in_new</span>
                      <span>Live Demo</span>
                     </a>`
                  : ""
              }
            </div>

            <button type="button" class="btn btn-primary btn-open-review" data-sub-id="${s.id}" style="display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-xs); padding: 8px 16px;">
              <span class="material-symbols-outlined" style="font-size: 16px;">rate_review</span>
              <span>${s.reviewer_feedback ? "Ubah Evaluasi / Nilai" : "Beri Review &amp; Nilai"}</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

// --- Event Listeners Dashboard ---
function setupEventListeners() {
  // 1. Search Input dengan Debounce 250ms
  const searchInput = document.getElementById("review-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        applyFilters();
        updateSubmissionsView();
      }, 250);
    });
  }

  // 2. Filter Pills Status
  const pillsContainer = document.getElementById("status-pills-container");
  if (pillsContainer) {
    pillsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-pill-btn");
      if (!btn) return;
      const st = btn.dataset.status;
      if (!st) return;

      filterStatus = st;
      pillsContainer.querySelectorAll(".filter-pill-btn").forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");

      applyFilters();
      updateSubmissionsView();
    });
  }

  // 3. Dropdown Course Filter
  const courseSelect = document.getElementById("review-course-select");
  if (courseSelect) {
    courseSelect.addEventListener("change", (e) => {
      filterCourse = e.target.value;
      applyFilters();
      updateSubmissionsView();
    });
  }

  // 4. Dropdown Sort
  const sortSelect = document.getElementById("review-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      applyFilters();
      updateSubmissionsView();
    });
  }

  // 5. Tombol Segarkan (Refresh)
  const refreshBtn = document.getElementById("btn-refresh-submissions");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      refreshBtn.querySelector("span").classList.add("spin-animation");
      await loadSubmissions();
      renderDashboard(document.getElementById("review-mount"));
      setupEventListeners();
      showToast("Data submission berhasil disinkronkan dari cloud.", "success");
    });
  }

  // 6. Klik Tombol "Beri Review" pada Kartu
  const listContainer = document.getElementById("submissions-list-container");
  if (listContainer) {
    listContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-open-review");
      if (!btn) return;
      const subId = btn.dataset.subId;
      const sub = allSubmissions.find((item) => item.id === subId);
      if (sub) {
        openReviewModal(sub);
      }
    });
  }

  // 7. Tombol Buka Modal Role Management
  const roleBtn = document.getElementById("btn-open-role-modal");
  if (roleBtn) {
    roleBtn.addEventListener("click", () => {
      openRoleModal();
    });
  }

  setupReviewModalHandlers();
  setupRoleModalHandlers();
}

// Update partial tampilan kartu submission & counter
function updateSubmissionsView() {
  const container = document.getElementById("submissions-list-container");
  if (container) {
    container.innerHTML = renderSubmissionsCards();
  }
}

// --- MODAL 1: REVIEW & PENILAIAN ---
function setupReviewModalHandlers() {
  const modal = document.getElementById("review-modal");
  const closeBtn = document.getElementById("btn-close-review-modal");
  const cancelBtn = document.getElementById("btn-cancel-review-modal");
  const form = document.getElementById("review-form");

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    activeReviewSubmission = null;
  };

  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  // Klik di luar dialog
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Highlight pilihan status radio
  const radioOptions = modal?.querySelectorAll(".status-radio-option");
  radioOptions?.forEach((opt) => {
    opt.addEventListener("click", () => {
      radioOptions.forEach((o) => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");
    });
  });

  // Submit Penilaian
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!activeReviewSubmission) return;

    const saveBtn = document.getElementById("btn-save-review");
    const statusRadio = form.querySelector('input[name="review_status"]:checked');
    const feedbackInput = document.getElementById("review-feedback-input");

    if (!statusRadio || !feedbackInput) return;

    const newStatus = statusRadio.value;
    const newFeedback = feedbackInput.value.trim();

    if (!newFeedback) {
      alert("Mohon sertakan catatan feedback untuk siswa.");
      feedbackInput.focus();
      return;
    }

    try {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span class="material-symbols-outlined spin-animation">sync</span> <span>Menyimpan...</span>`;

      const nowIso = new Date().toISOString();
      const payload = {
        status: newStatus,
        reviewer_feedback: newFeedback,
        reviewer_id: currentUser.id,
        reviewed_at: nowIso,
      };

      const { data, error } = await updateSubmissionReview(activeReviewSubmission.id, payload);

      if (error) throw error;

      // Update state lokal in-place
      activeReviewSubmission.status = newStatus;
      activeReviewSubmission.reviewer_feedback = newFeedback;
      activeReviewSubmission.reviewer_id = currentUser.id;
      activeReviewSubmission.reviewed_at = nowIso;

      // Update di allSubmissions
      const idx = allSubmissions.findIndex((s) => s.id === activeReviewSubmission.id);
      if (idx !== -1) {
        allSubmissions[idx] = { ...allSubmissions[idx], ...activeReviewSubmission };
      }

      applyFilters();
      renderDashboard(document.getElementById("review-mount"));
      setupEventListeners();

      closeModal();
      showToast("Evaluasi & catatan mentor berhasil disimpan!", "success");
    } catch (err) {
      console.error("Gagal simpan review:", err);
      alert("Gagal menyimpan evaluasi: " + (err.message || "Pastikan skrip migrasi Supabase telah dijalankan."));
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<span class="material-symbols-outlined">save</span> <span>Simpan Evaluasi</span>`;
    }
  });
}

function openReviewModal(sub) {
  activeReviewSubmission = sub;
  const modal = document.getElementById("review-modal");
  const summaryEl = document.getElementById("review-modal-student-summary");
  const feedbackInput = document.getElementById("review-feedback-input");

  if (!modal || !summaryEl || !feedbackInput) return;

  const profile = sub.profiles || {};
  const studentName = profile.nickname || profile.github_username || "Siswa RIT";
  const courseMeta = coursesCatalog.find((c) => c.slug === sub.course_slug);
  const courseTitle = courseMeta ? courseMeta.title : sub.course_slug;

  summaryEl.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
      <strong style="font-size: var(--fs-sm);">${escapeHtml(studentName)}</strong>
      <span style="font-size: 11px; font-family: var(--font-mono); color: var(--color-primary-dark);">@${escapeHtml(profile.github_username || "")}</span>
    </div>
    <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">
      Learning Path: <strong>${escapeHtml(courseTitle)}</strong> &bull; Dikirim: ${formatDateIndo(sub.submitted_at)}
    </div>
    <div style="display: flex; gap: var(--space-2); margin-top: 4px;">
      <a href="${sub.repo_url}" target="_blank" rel="noopener" style="font-size: 11px; font-family: var(--font-mono); color: var(--color-primary-dark);">[Lihat Repositori &nearr;]</a>
      ${sub.demo_url ? `<a href="${sub.demo_url}" target="_blank" rel="noopener" style="font-size: 11px; font-family: var(--font-mono); color: var(--color-accent);">[Lihat Demo &nearr;]</a>` : ""}
    </div>
  `;

  // Set Radio Value (default ke approved atau existing status)
  const targetStatus = sub.status && sub.status !== "submitted" ? sub.status : "approved";
  const radios = modal.querySelectorAll('input[name="review_status"]');
  radios.forEach((r) => {
    r.checked = r.value === targetStatus;
    const parent = r.closest(".status-radio-option");
    if (parent) {
      if (r.checked) parent.classList.add("is-selected");
      else parent.classList.remove("is-selected");
    }
  });

  // Set Feedback Value
  feedbackInput.value = sub.reviewer_feedback || "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  feedbackInput.focus();
}

// --- MODAL 2: ROLE MANAGEMENT (KELOLA REVIEWER) ---
function setupRoleModalHandlers() {
  const modal = document.getElementById("role-modal");
  const closeBtn = document.getElementById("btn-close-role-modal");
  const doneBtn = document.getElementById("btn-done-role-modal");
  const addBtn = document.getElementById("btn-add-reviewer");
  const usernameInput = document.getElementById("input-new-reviewer-username");
  const statusEl = document.getElementById("role-add-status");

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn?.addEventListener("click", closeModal);
  doneBtn?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Tambah Reviewer Baru
  addBtn?.addEventListener("click", async () => {
    const rawUsername = usernameInput.value.trim().replace(/^@/, "");
    if (!rawUsername) {
      usernameInput.focus();
      return;
    }

    try {
      addBtn.disabled = true;
      addBtn.innerHTML = `<span class="material-symbols-outlined spin-animation">sync</span> <span>Mencari...</span>`;
      statusEl.style.display = "none";

      // 1. Cari profil siswa di Supabase
      const { data: results, error: searchErr } = await searchProfiles(rawUsername);
      if (searchErr) throw searchErr;

      // Temukan kecocokan persis (case-insensitive)
      const targetUser = results?.find(
        (p) => (p.github_username || "").toLowerCase() === rawUsername.toLowerCase()
      );

      if (!targetUser) {
        statusEl.style.display = "block";
        statusEl.style.color = "var(--color-danger)";
        statusEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 15px; vertical-align: middle;">error</span> Pengguna <strong>@${escapeHtml(rawUsername)}</strong> tidak ditemukan. Siswa harus sudah pernah login ke RIT Academy minimal 1 kali agar profilnya tersimpan di database.`;
        return;
      }

      if (targetUser.role === "reviewer" || targetUser.role === "admin") {
        statusEl.style.display = "block";
        statusEl.style.color = "var(--color-warning)";
        statusEl.innerHTML = `Akun <strong>@${escapeHtml(rawUsername)}</strong> sudah berstatus sebagai <strong>${targetUser.role.toUpperCase()}</strong>.`;
        return;
      }

      // 2. Angkat role menjadi 'reviewer'
      const { error: updateErr } = await updateProfileRole(targetUser.id, "reviewer");
      if (updateErr) throw updateErr;

      usernameInput.value = "";
      statusEl.style.display = "block";
      statusEl.style.color = "var(--color-success)";
      statusEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 15px; vertical-align: middle;">check_circle</span> Berhasil! <strong>@${escapeHtml(rawUsername)}</strong> kini memiliki hak akses sebagai Reviewer.`;

      showToast(`@${rawUsername} berhasil dijadikan Reviewer!`, "success");
      await loadReviewersList();
    } catch (err) {
      console.error("Gagal menambah reviewer:", err);
      statusEl.style.display = "block";
      statusEl.style.color = "var(--color-danger)";
      statusEl.textContent = "Gagal memperbarui role: " + (err.message || "Pastikan RLS Supabase mengizinkan update role.");
    } finally {
      addBtn.disabled = false;
      addBtn.innerHTML = `<span class="material-symbols-outlined">add</span> <span>Jadikan Reviewer</span>`;
    }
  });
}

async function openRoleModal() {
  const modal = document.getElementById("role-modal");
  const statusEl = document.getElementById("role-add-status");
  const usernameInput = document.getElementById("input-new-reviewer-username");

  if (!modal) return;
  if (statusEl) statusEl.style.display = "none";
  if (usernameInput) usernameInput.value = "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  await loadReviewersList();
}

async function loadReviewersList() {
  const container = document.getElementById("reviewers-list-container");
  const countBadge = document.getElementById("reviewer-count-badge");
  if (!container) return;

  container.innerHTML = `<p class="text-muted" style="font-size: var(--fs-xs); text-align: center; padding: var(--space-3) 0;"><span class="material-symbols-outlined spin-animation" style="vertical-align: middle;">sync</span> Mengambil daftar reviewer...</p>`;

  try {
    const { data: reviewers, error } = await fetchReviewers();
    if (error) throw error;

    if (!reviewers || reviewers.length === 0) {
      container.innerHTML = `<p class="text-muted" style="font-size: var(--fs-xs); text-align: center;">Belum ada reviewer terdaftar.</p>`;
      if (countBadge) countBadge.textContent = "0 Reviewer";
      return;
    }

    if (countBadge) countBadge.textContent = `${reviewers.length} Reviewer`;

    container.innerHTML = reviewers
      .map((r) => {
        const name = r.nickname || r.github_username || "Reviewer";
        const isMasterAdmin = ["KazukiFujimaru", "Lysander"].includes(r.github_username);
        const isSelf = r.id === currentUser?.id;
        const canDemote = !isMasterAdmin && !isSelf && r.role !== "admin";

        return `
          <div class="reviewer-user-row">
            <div class="reviewer-user-meta">
              ${
                r.avatar_url
                  ? `<img src="${r.avatar_url}" alt="${escapeHtml(name)}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">`
                  : `<div style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary-light); color: var(--color-primary-dark); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">${escapeHtml(name.charAt(0).toUpperCase())}</div>`
              }
              <div>
                <div style="font-size: var(--fs-xs); font-weight: 700; color: var(--color-text);">${escapeHtml(name)}</div>
                <div style="font-size: 11px; font-family: var(--font-mono); color: var(--color-text-muted);">@${escapeHtml(r.github_username || "")}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="role-badge ${r.role === "admin" ? "is-admin" : "is-reviewer"}">
                ${r.role === "admin" ? "ADMIN" : "REVIEWER"}
              </span>

              ${
                canDemote
                  ? `<button type="button" class="btn btn-outline btn-sm btn-demote-reviewer" data-user-id="${r.id}" data-username="${escapeHtml(r.github_username)}" title="Cabut izin reviewer" style="padding: 4px 8px; font-size: 11px; color: var(--color-danger); border-color: rgba(220, 38, 38, 0.3);">
                      <span class="material-symbols-outlined" style="font-size: 15px;">remove_moderator</span>
                     </button>`
                  : ""
              }
            </div>
          </div>
        `;
      })
      .join("");

    // Pasang handler demote
    container.querySelectorAll(".btn-demote-reviewer").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const userId = btn.dataset.userId;
        const username = btn.dataset.username;
        if (!confirm(`Cabut hak akses reviewer untuk @${username}? Akun akan kembali menjadi Siswa biasa.`)) {
          return;
        }

        try {
          btn.disabled = true;
          const { error: demoteErr } = await updateProfileRole(userId, "student");
          if (demoteErr) throw demoteErr;
          showToast(`Hak akses @${username} telah dikembalikan ke Siswa.`, "success");
          await loadReviewersList();
        } catch (err) {
          alert("Gagal mencabut role: " + err.message);
          btn.disabled = false;
        }
      });
    });
  } catch (err) {
    container.innerHTML = `<p style="font-size: var(--fs-xs); color: var(--color-danger); text-align: center;">Gagal memuat reviewer: ${escapeHtml(err.message)}</p>`;
  }
}

// Jalankan saat DOM siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
