---
title: "Cara Kerja Web (Sekilas)"
order: 6
course: "level0"
emoji: "🌐"
---

Kamu udah tahu apa itu internet, IP address, DNS, dan hubungan client-server dari modul sebelumnya. Sekarang mari kita lihat, secara garis besar, bagaimana semua itu dipakai waktu kamu buka sebuah **website**.

## Kenapa Ini Penting?

Modul ini cuma kasih kamu **gambaran umum dari ketinggian 10.000 kaki** — biar kamu punya bayangan sebelum masuk ke course Web Dasar nanti, tempat kita bakal bongkar detailnya satu-satu sambil praktik langsung.

## Gambaran Besar: Browser → Request → Server → Response

Waktu kamu ketik alamat website dan tekan Enter, secara garis besar ada 4 langkah yang terjadi:

1. **Browser** (Chrome, Firefox, dll.) mengirim **request** — semacam "permintaan" — ke server yang menyimpan website itu.
2. Request itu melewati proses DNS yang udah kamu pelajari (mencari IP address dari nama domain).
3. **Server** menerima request itu, lalu menyiapkan halaman yang diminta.
4. Server mengirim balik **response** berupa halaman web, yang lalu ditampilkan browser di layar kamu.

Semua ini biasanya kejadian dalam hitungan kurang dari 1 detik.

## HTTP: Aturan Bahasa Web

Supaya browser dan server "nyambung" saat berkomunikasi, mereka pakai aturan bersama namanya **HTTP**. Kamu mungkin sering lihat `https://` di depan alamat website — huruf "S" tambahan itu berarti komunikasinya dienkripsi, jadi lebih aman dari yang mengintip di tengah jalan.

## URL: Alamat Halaman Web

**URL** adalah alamat lengkap sebuah halaman web, misalnya `https://academy.tcc15.my.id/materi`. Anggap ini kayak alamat lengkap suatu tempat — bukan cuma nama kotanya, tapi juga jalan dan nomor rumahnya, biar kamu diantar tepat ke halaman yang dimaksud.

> 💡 **Tips:** Ini baru gambaran umum. Nanti di course **Web Dasar**, modul pertama bakal bahas detail ini lebih dalam — lengkap dengan praktik langsung.

## Ringkasan

- Alurnya secara umum: **Browser → Request → Server → Response**.
- **HTTP** adalah aturan bahasa yang dipakai browser dan server buat "ngobrol".
- **URL** adalah alamat lengkap sebuah halaman web.

Selanjutnya, sebelum kamu mulai course Web Dasar atau Python Dasar, kenalan dulu sama alat-alat yang bakal sering kamu pakai buat belajar dan praktik IT — di modul terakhir Level 0: **Peralatan IT Penting**.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇