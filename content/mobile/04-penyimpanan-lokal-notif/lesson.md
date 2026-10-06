---
title: "Penyimpanan Offline & Notifikasi Lokal"
order: 4
course: "mobile"
emoji: "💾"
---

Pernahkah kamu membuka aplikasi Catatan (Notes) atau game *offline* di HP, lalu sadar bahwa datamu tetap ada walaupun aplikasinya sempat kamu tutup (kill) paksa? Dari mana aplikasi mengingatnya? Jawabannya ada di penyimpanan lokal (*Local Storage*)!

## Kenapa Ini Penting?
Aplikasi *Mobile* sering digunakan di area yang tidak ada sinyal internet (seperti di kereta atau pesawat). Jika aplikasimu sangat bergantung pada internet (Cloud) untuk mengingat sesuatu, aplikasimu akan mati kutu saat masuk ke mode *offline*.

## Mode Ingatan Aplikasi

Menyimpan data di HP punya 2 kasta berbeda, tergantung kerumitannya:

### 1. SharedPreferences (Gudang Kecil)
Ini dipakai untuk menyimpan setingan yang sangat sederhana (Key & Value).
*Contoh Kasus:* 
- Mengingat apakah user sedang login atau belum (Variabel: `isLoggedIn = True`).
- Mengingat apakah tema aplikasi malam atau siang (Variabel: `isDarkMode = False`).
Ukurannya sangat kecil dan cepat dibaca.

### 2. SQLite / Hive (Lemari Arsip Besar)
Jika datanya mulai banyak (misal: ribuan daftar transaksi keuangan bulanan, atau artikel offline), kamu tidak bisa pakai SharedPreferences. Kamu butuh **Database Lokal**.
- **SQLite:** Standar lama yang sangat andal, menggunakan tabel berelasi (seperti di Backend).
- **Hive:** Database *NoSQL* modern buatan komunitas Flutter yang super ngebut. Sangat digemari karena mudah dipakai tanpa repot bikin query tabel rumit.

### Sistem Alarm: Notifikasi Lokal (Background Service)
Kelebihan utama aplikasi Mobile dibanding Web adalah kemampuannya "membangunkan" pengguna lewat layar kunci (Lock Screen) meskipun aplikasinya sedang dimatikan!

Ini disebut *Local Notifications*. Aplikasi menitipkan tugas jadwal alarm ini ke Sistem Operasi (Android/iOS). Nanti Sistem Operasi-lah yang akan membunyikan *pop-up* di jam yang ditentukan, lalu jika di-klik, ia akan menarik bangun aplikasimu kembali.

💡 **Wawasan: API Spesifik OS**
Karena Notifikasi adalah fitur bawaan inti HP (berbeda cara kerjanya di Android dan iPhone), seringkali fitur-fitur seperti ini mengharuskan kita mengedit file pengaturan *Native* (`AndroidManifest.xml` untuk Android dan `Info.plist` untuk iOS) guna meminta izin ke Sistem Operasi.

## Ringkasan
- Data dalam variabel *State* akan hilang jika aplikasi di-kill. Untuk menyimpan data selamanya di dalam HP, gunakan penyimpanan lokal.
- **SharedPreferences** bagus untuk mengingat data kecil seperti settingan Tema Gelap/Terang.
- **SQLite** atau **Hive** digunakan sebagai database offline untuk menyimpan data bertumpuk seperti laporan daftar tugas harian.
- **Notifikasi Lokal** diatur oleh sistem operasi perangkat (Android/iOS) agar aplikasi bisa membunyikan peringatan walau aplikasinya sedang tidak dijalankan di layar.

Semua fitur mutakhir sudah lengkap terpasang. Sekarang waktunya kita ubah kode ini menjadi aplikasi `.apk` sungguhan dan pamerkan ke teman-teman!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
