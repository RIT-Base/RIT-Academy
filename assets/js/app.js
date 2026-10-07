// assets/js/app.js
//
// Dijalankan di SETIAP halaman RIT Academy.
// - Sistem Light & Dark Mode (sync localStorage 'rit_theme' & OS preference)
// - Navigasi aktif (top navbar & bottom nav)
// - Utilitas umum (tahun footer, skip-link, service worker)

const THEME_KEY = "rit_theme";

export function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getCurrentTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {
    // localStorage might be disabled
  }
  return getSystemTheme();
}

export function applyTheme(theme) {
  const resolved = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", resolved);

  // Update semua icon toggle tema
  document.querySelectorAll(".theme-icon").forEach((icon) => {
    icon.textContent = resolved === "dark" ? "light_mode" : "dark_mode";
  });

  // Update aria-label & title pada tombol
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    const label = resolved === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  });

  syncGiscusTheme(resolved);
}

export function syncGiscusTheme(theme) {
  const iframes = document.querySelectorAll("iframe.giscus-frame");
  if (!iframes || iframes.length === 0) return;
  const giscusTheme = theme === "dark" ? "dark_dimmed" : "light";
  iframes.forEach((iframe) => {
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        "https://giscus.app"
      );
    }
  });
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || getCurrentTheme();
  const next = current === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {}
  applyTheme(next);
}

function initTheme() {
  // Terapkan tema awal
  applyTheme(getCurrentTheme());

  // Pasang event listener ke semua tombol toggle tema yang ada
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.removeEventListener("click", toggleTheme);
    btn.addEventListener("click", toggleTheme);
  });

  // Pantau perubahan preferensi OS jika user belum memilih manual
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      try {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      } catch (err) {}
    });
  }
}

function currentPageFile() {
  const path = window.location.pathname;
  const last = path.substring(path.lastIndexOf("/") + 1);
  return last === "" ? "index.html" : last;
}

function markActiveNav() {
  const page = document.body.dataset.navActive || currentPageFile();
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const target = link.getAttribute("data-nav-link");
    if (target === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initSkipLink() {
  if (!document.getElementById("main")) {
    console.warn("app.js: elemen #main tidak ditemukan — skip link tidak akan berfungsi.");
  }
}

function initServiceWorker() {
  if (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("app.js: pendaftaran Service Worker dilewati / gagal:", err);
      });
    });
  }
}

export function syncNavbarUser() {
  try {
    const rawUser = localStorage.getItem("rit_auth_user_v1");
    const authUser = rawUser ? JSON.parse(rawUser) : null;
    const rawProfile = localStorage.getItem("rit_profile_v1");
    const profile = rawProfile ? JSON.parse(rawProfile) : {};

    const avatarUrl = authUser?.avatar_url || profile?.avatar_url;
    const displayName =
      authUser?.nickname || profile?.nickname || authUser?.github_username || "";

    const navAvatarLinks = document.querySelectorAll(
      'nav.top-nav a[href="profil.html"], nav.top-nav a[data-nav-link="profil.html"]'
    );

    navAvatarLinks.forEach((link) => {
      if (avatarUrl) {
        link.innerHTML = `<img src="${avatarUrl}" alt="${
          displayName || "Profil"
        }" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-primary);">`;
        link.setAttribute("title", `Profil (${displayName || "Pengguna"})`);
      } else {
        link.innerHTML = `<span class="material-symbols-outlined" style="font-size: 20px;">person</span>`;
        link.setAttribute("title", "Profil");
      }
    });
  } catch (e) {
    console.warn("app.js: syncNavbarUser error:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  markActiveNav();
  setFooterYear();
  initSkipLink();
  initServiceWorker();
  syncNavbarUser();

  window.addEventListener("rit_auth_state_changed", syncNavbarUser);
  window.addEventListener("rit_cloud_sync_completed", syncNavbarUser);
});
