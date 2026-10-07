// assets/js/pages/login.js
// Logika halaman login: One-Click GitHub OAuth, penanganan state sesi, dan transisi tampilan.

import { signInWithGitHub, getUser, getSession } from "../supabase.js";
import { ProgressStore } from "../progress-store.js";

function showAlert(message, type = "danger") {
  const alertEl = document.getElementById("auth-alert");
  if (!alertEl) return;

  alertEl.style.display = "flex";
  if (type === "danger") {
    alertEl.style.background = "var(--color-danger-light)";
    alertEl.style.color = "var(--color-danger)";
    alertEl.style.border = "1px solid rgba(220, 38, 38, 0.3)";
    alertEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px;">error</span> <span>${message}</span>`;
  } else {
    alertEl.style.background = "var(--color-success-light)";
    alertEl.style.color = "var(--color-success)";
    alertEl.style.border = "1px solid rgba(34, 197, 94, 0.3)";
    alertEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px;">check_circle</span> <span>${message}</span>`;
  }
}

function clearAlert() {
  const alertEl = document.getElementById("auth-alert");
  if (alertEl) alertEl.style.display = "none";
}

function checkUrlErrors() {
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  const errorDesc = searchParams.get("error_description");
  if (errorDesc) {
    showAlert(decodeURIComponent(errorDesc), "danger");
    return;
  }

  if (hash.includes("error_description=")) {
    const match = hash.match(/error_description=([^&]+)/);
    if (match && match[1]) {
      showAlert(decodeURIComponent(match[1].replace(/\+/g, " ")), "danger");
    }
  }
}

async function renderState() {
  const guestView = document.getElementById("guest-login-view");
  const loggedInView = document.getElementById("logged-in-view");
  if (!guestView || !loggedInView) return;

  const authUser = ProgressStore.getAuthUser() || (await getUser());

  if (authUser) {
    guestView.style.display = "none";
    loggedInView.style.display = "block";

    const nameEl = document.getElementById("logged-in-name");
    const githubEl = document.getElementById("logged-in-github");
    const avatarImg = document.getElementById("logged-in-avatar");
    const fallbackIcon = document.getElementById("logged-in-fallback-icon");

    const profile = ProgressStore.getProfile();
    const displayName =
      authUser.nickname || profile.nickname || authUser.github_username || "Siswa RIT";
    const githubHandle =
      authUser.github_username ||
      profile.github_username ||
      authUser.user_metadata?.user_name ||
      "github";
    const avatarUrl = authUser.avatar_url || profile.avatar_url || authUser.user_metadata?.avatar_url;

    if (nameEl) nameEl.textContent = displayName;
    if (githubEl) githubEl.textContent = `@${githubHandle}`;

    if (avatarUrl && avatarImg) {
      avatarImg.src = avatarUrl;
      avatarImg.style.display = "block";
      if (fallbackIcon) fallbackIcon.style.display = "none";
    } else {
      if (avatarImg) avatarImg.style.display = "none";
      if (fallbackIcon) fallbackIcon.style.display = "block";
    }
  } else {
    guestView.style.display = "block";
    loggedInView.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  checkUrlErrors();
  await renderState();

  // Handler tombol Login GitHub
  const btnLogin = document.getElementById("btn-github-login");
  const btnText = document.getElementById("btn-github-text");

  if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
      clearAlert();
      btnLogin.disabled = true;
      if (btnText) btnText.textContent = "Menghubungkan ke GitHub...";

      const { data, error } = await signInWithGitHub();
      if (error) {
        showAlert(
          error.message || "Gagal menginisialisasi login dengan GitHub. Silakan coba lagi.",
          "danger"
        );
        btnLogin.disabled = false;
        if (btnText) btnText.textContent = "Masuk dengan GitHub";
      }
      // Jika berhasil, Supabase otomatis me-redirect ke OAuth provider GitHub
    });
  }

  // Handler tombol Logout
  const btnLogout = document.getElementById("btn-logout-loginpage");
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      btnLogout.disabled = true;
      btnLogout.textContent = "Memproses keluar...";
      await ProgressStore.logout();
      showAlert("Berhasil keluar dari akun. Sesi tamu dipulihkan.", "success");
      await renderState();
    });
  }

  // Dengarkan perubahan auth jika ada
  window.addEventListener("rit_auth_state_changed", () => {
    renderState();
  });
});
