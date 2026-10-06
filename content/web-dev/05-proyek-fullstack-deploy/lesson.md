---
title: "Integrasi Fullstack & Publikasi Cloud"
order: 5
course: "web-dev"
emoji: "🚀"
---

Sekarang kamu punya Frontend (Etalase) dan Backend (Gudang). Saat kamu sedang ngoding di laptop (localhost), keduanya berjalan mesra berdampingan. Tapi begitu kamu ingin membagikannya ke temanmu di internet, kamu tidak bisa memberikan URL `localhost`! Kamu harus mempublikasikannya (Deploy) ke Server Cloud!

## Kenapa Ini Penting?
Aplikasi sehebat apapun tak ada nilainya jika tidak bisa diakses orang lain. Memahami cara mengintegrasikan Frontend dan Backend lalu mengorbitkannya ke Cloud adalah langkah pamungkas seorang **Fullstack Developer**.

## Trik Menyambungkan Dua Dunia

### 1. Masalah CORS (Cross-Origin Resource Sharing)
Saat Frontend-mu (di-host di `myweb.com`) mencoba mengambil data dari Backend-mu (di-host di `api-myweb.com`), Browser akan **memblokir** permintaan tersebut demi keamanan!
- *Solusi:* Kamu harus menambahkan peraturan **CORS** di kode Backend-mu untuk "Mengizinkan" web Frontend-mu mengambil datanya.

### 2. Memisahkan Rumah (Arsitektur Terpisah)
Di era modern, kita jarang menaruh Frontend dan Backend di satu ruko yang sama. Kita mendeploy-nya secara terpisah:
- **Frontend** (React/Vue) dititipkan di layanan statis super cepat seperti **Vercel** atau **Netlify** (Gratis!).
- **Backend & Database** dititipkan di layanan khusus komputasi seperti **Render** atau **Railway**.
- **Solusi Alternatif (BaaS):** Malas bikin Backend dari nol? Gunakan **Supabase** atau **Firebase**! Layanan ini otomatis membuatkanmu Database + Sistem Login + API dalam 1 kali klik.

### 3. Checklist Sebelum Launching (Production)
Jangan buru-buru rilis! Cek ini dulu:
- Hapus semua `console.log()` sisa masa pengembangan.
- Pastikan tidak ada kredensial API rahasia atau password database yang tertulis langsung di dalam kode HTML/JS-mu (*Gunakan Environment Variables / .env*).
- Pastikan route API Frontend sudah mengarah ke link Cloud, bukan ke `localhost` lagi.

## Ringkasan
- Menjadi **Fullstack** berarti menguasai penyatuan logika Frontend dan ketersediaan Backend.
- Browser punya pengawal keamanan bernama **CORS** yang akan memblokir request API beda domain jika Backend tidak secara tegas mengizinkannya.
- Frontend modern (seperti React) sangat cocok dideploy di layanan seperti **Vercel**.
- **BaaS (Backend as a Service)** seperti Firebase/Supabase dapat memangkas drastis waktu pengembangan.

Selamat! Gelar Fullstack Web Developer resmi menjadi milikmu. Mau lanjut belajar dunia aplikasi HP? Kita gas ke Mobile Development!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
