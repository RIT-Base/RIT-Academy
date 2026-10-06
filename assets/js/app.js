// assets/js/app.js
//
// Dijalankan di SETIAP halaman. Tugasnya: menandai link nav yang aktif
// (top navbar & bottom nav) sesuai halaman saat ini, dan utilitas kecil
// yang dipakai bersama (tahun footer, dsb). Logika khusus per halaman ada
// di assets/js/pages/*.js.

function currentPageFile() {
  const path = window.location.pathname;
  const last = path.substring(path.lastIndexOf("/") + 1);
  return last === "" ? "index.html" : last;
}

function markActiveNav() {
  // Halaman seperti materi.html / path.html menandai nav induknya sendiri
  // lewat atribut data-nav-active di <body> (mis. data-nav-active="belajar.html").
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
  // Memastikan target #main ada supaya skip link berfungsi untuk pengguna keyboard.
  if (!document.getElementById("main")) {
    console.warn("app.js: elemen #main tidak ditemukan — skip link tidak akan berfungsi.");
  }
}

function initServiceWorker() {
  if ("serviceWorker" in navigator && (window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    window.addEventListener("load", () => {
      // Register path relatif terhadap root aplikasi
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("app.js: pendaftaran Service Worker dilewati / gagal:", err);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  markActiveNav();
  setFooterYear();
  initSkipLink();
  initServiceWorker();
});
