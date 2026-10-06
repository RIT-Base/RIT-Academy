# RIT Academy — Base Platform (Prototype)

Platform belajar IT interaktif **RIT Academy** (RIT FKOMINFO UNIGA). Platform ini
fungsional penuh: navigasi, materi interaktif, sistem checkpoint, dan tiga
lab (HTML, Python, Blockly) semuanya jalan. Styling masih versi dasar yang
rapi — desain final menyusul dari `DESIGN.md` → Google Stitch → diselaraskan
di Gemini.

## Cara menjalankan

Tidak ada proses build. Cukup jalankan server statis dari folder ini:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000/` di browser. Bisa juga langsung di-deploy
ke GitHub Pages atau Netlify tanpa konfigurasi tambahan (semua path aset
memakai path relatif).

> Pyodide, CodeMirror, Blockly, dan font dimuat dari CDN — pastikan
> perangkat yang dipakai terhubung ke internet saat memakai Python Lab /
> Blockly Lab / editor kode.

## Untuk Sensei: menambah materi

Semua materi = data (`lesson.md` + `tasks.json`) di folder `content/`, sama
sekali tidak perlu menyentuh kode platform. Panduan lengkap format konten
ada di **[`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md)** — mulai dari
situ.

Ringkas banget:

1. Salin `content/_templates/modul/` ke `content/<course>/<slug-modul>/`.
2. Isi `lesson.md` (materi) dan `tasks.json` (soal checkpoint).
3. Daftarkan modul itu di `content/index.json`.
4. Refresh browser — selesai, tanpa build/deploy khusus.

## Struktur proyek

```
/
├── index.html, belajar.html, materi.html, tools.html
├── paths.html, path.html, forum.html, profil.html, login.html, 404.html
├── assets/
│   ├── css/main.css          — semua token desain (warna/spacing/radius) via CSS custom properties
│   └── js/
│       ├── app.js            — init nav aktif, dsb (jalan di semua halaman)
│       ├── content-loader.js — fetch & parse lesson.md / tasks.json / index.json
│       ├── progress-store.js — abstraksi progress (localStorage → nanti Supabase)
│       ├── task-checker.js   — validator 4 tipe task checkpoint
│       ├── labs/
│       │   ├── html-lab.js     — CodeMirror + iframe preview
│       │   ├── python-lab.js   — Pyodide runner (singleton) + editor + input()
│       │   └── blockly-lab.js  — workspace Blockly + generator Python + run
│       └── pages/             — logika khusus tiap halaman (home, belajar, materi, tools, paths, path-detail)
├── content/
│   ├── index.json            — daftar course & modul
│   ├── paths/index.json      — 10 learning path
│   ├── _templates/modul/     — template lesson.md + tasks.json
│   ├── web-dasar/01-web-bekerja/  — CONTOH modul lengkap (lihat §Konten contoh)
│   ├── level0/, python-dasar/     — folder siap pakai, materi menyusul dari Sensei
├── docs/CONTENT-GUIDE.md
└── README.md
```

## Cara kerja progress

Progress belajar disimpan di `localStorage` browser (key `rit_progress_v1`)
lewat abstraksi `ProgressStore` di `assets/js/progress-store.js`. Modul
pertama tiap course selalu terbuka; modul berikutnya otomatis terbuka
("active") setelah modul sebelumnya ditandai selesai ("done"). Ganti
implementasi ke Supabase nanti cukup dengan mengganti isi `progress-store.js`
— kode lain memanggilnya lewat interface yang sama (`getStatus`, `setDone`,
`getDoneList`, `resetAll`), jadi tidak perlu diubah.

## Sistem checkpoint

Tiap modul punya `tasks.json` berisi daftar task dengan salah satu dari 4
tipe: `html-contains`, `python-output`, `python-test`, `quiz`. Task dinilai
otomatis, murni di sisi client (tidak ada penilaian manual). Semua task
lolos → modul selesai → tombol "Lanjut ke Modul Berikutnya" muncul. Detail
format lengkap ada di `docs/CONTENT-GUIDE.md`.

## Batasan yang perlu diketahui (prototype)

- **Python Lab & input()**: Pyodide dijalankan di main thread supaya
  `input()` bisa memakai dialog `window.prompt()` bawaan browser (paling
  sederhana & reliabel tanpa perlu header COOP/COEP khusus). Konsekuensinya,
  batas waktu eksekusi 10 detik bersifat *best-effort* — kode dengan infinite
  loop murni CPU-bound tanpa I/O (mis. `while True: pass`) tetap bisa
  membekukan tab sampai di-reload. Ini keterbatasan bawaan menjalankan
  Pyodide tanpa Web Worker + `SharedArrayBuffer` (yang butuh header server
  khusus, tidak tersedia di hosting statis seperti GitHub Pages / Netlify /
  `python -m http.server` biasa).
- **Konten belum lengkap**: sesuai brief, hanya `web-dasar/01-web-bekerja`
  yang diisi materi lengkap sebagai contoh. Modul lain yang terdaftar di
  `content/index.json` (level0, sisa web-dasar, python-dasar) akan tampil
  dengan pesan "materi belum tersedia" sampai Sensei mengisinya — ini
  perilaku yang disengaja, bukan bug.
- **Semua library dari CDN** (Pyodide, CodeMirror 6 via import map esm.sh,
  Blockly, marked.js, Google Fonts) — butuh koneksi internet aktif. Tidak
  ada fallback offline di prototype ini.
- **Dark mode**: token CSS sudah disiapkan tapi belum diaktifkan penuh
  (sesuai brief, opsional untuk prototype).

## Verifikasi yang sudah dilakukan

- 10 halaman HTML + 404 semuanya jalan tanpa error konsol.
- Semua file JSON (`content/index.json`, `content/paths/index.json`,
  `tasks.json`) tervalidasi valid JSON.
- Semua file JavaScript (ES modules) lolos syntax check.
- Server statis lokal (`python -m http.server`) berhasil menyajikan semua
  halaman & aset (HTTP 200), termasuk lewat path relatif supaya kompatibel
  dengan GitHub Pages project page (subfolder).

Karena lingkungan build ini tidak punya browser sungguhan untuk uji visual
interaktif (mengetik kode → Run → lihat hasil, atau drag-drop block Blockly),
**mohon Sensei coba langsung di browser sungguhan** sebelum dipakai
siswa — terutama tiga lab dan alur checkpoint end-to-end.
