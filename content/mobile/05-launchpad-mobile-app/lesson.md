---
title: "Launchpad: Merilis Aplikasi Mobile Pertamamu"
order: 5
course: "mobile"
emoji: "🏆"
---

Aplikasimu sudah jalan lancar saat disambung kabel ke laptop. Tampilannya keren, interaksinya responsif, dan datanya aman tersimpan. Tapi, kodingan ini belum bisa dibagikan ke tetanggamu. Kita harus "Memasaknya" (Build) menjadi sebuah produk siap saji!

## Kenapa Ini Penting?
Tanpa langkah akhir ini, pengguna biasa tidak akan pernah bisa mencicipi hasil kerjamu. Mem-build (kompilasi) dan me-rilis aplikasi adalah bukti nyata bahwa kamu telah "Naik Level" dari pelajar menjadi seorang *Developer* sungguhan!

## Tahap 1: Kosmetik & Izin Akses

Sebelum di-build, pastikan baju aplikasimu sudah rapi:
1. **App Icon (Logo Aplikasi):** Jangan gunakan ikon robot Android standar lagi! Gunakan aset gambar buatanmu.
2. **Splash Screen:** Layar pembuka (selama 2-3 detik) berlogo aplikasimu saat aplikasinya di-klik, sebelum masuk ke Menu Utama. (Kesan pertama itu penting!)
3. **App Name:** Ubah nama paket di file `AndroidManifest.xml` (misal dari "com.example.app" menjadi "com.namamu.namaaplikasi").
4. **Permissions (Izin Akses):** Jika aplikasimu memakai kamera atau internet, kamu WAJIB meminta izin tertulis di dalam file konfigurasinya, kalau tidak, aplikasi akan langsung *Force Close* saat mencoba membuka kamera.

## Tahap 2: Proses Build (Kompilasi)

Saat kamu ngoding, kodenya berjalan di atas mesin virtual yang lambat (Debug Mode). Untuk diserahkan ke pengguna, kita harus mengompresnya menjadi ukuran paling kecil dan paling cepat (Release Mode).

Jika menggunakan Flutter:
- Perintah sakti: `flutter build apk --release` (atau `build appbundle` jika untuk Play Store).
- Proses ini bisa memakan waktu 3-5 menit (laptopmu akan bekerja sangat keras mengubah kode Dart menjadi bahasa mesin Android murni).
- Hasil jadinya adalah satu file tunggal: `app-release.apk` (ukuran biasanya sekitar 15-20 MB).

## Tahap 3: Peluncuran (Launch)

Ada dua jalan untuk membagikan file `.apk` ini:
1. **Cara Gerilya (Indie / Gratis):** Kirim file `.apk` langsung ke WhatsApp temanmu, atau unggah ke GitHub Releases / Google Drive. Pengguna harus mengaktifkan izin "Install from Unknown Sources" di HP-nya.
2. **Cara Profesional (Google Play Store):** Kamu harus mendaftar akun Developer (sekali bayar seumur hidup $25). Di sini, kamu harus mengunggah *App Bundle*, membuat screenshot promo, dan menulis deskripsi pemasaran. Setelah direview Google (2-7 hari), aplikasimu resmi tayang di seluruh dunia!

💡 **Wawasan: iOS Build (iPhone)**
Untuk me-rilis ke App Store iPhone, kamu *wajib* memiliki komputer Mac / MacBook dan membayar langganan developer Apple (sekitar Rp 1,5 Juta PER TAHUN). Dunia iOS sangat tertutup dan ketat. Itulah alasan mengapa kebanyakan developer pemula memulai rilis ke Android terlebih dahulu.

## Ringkasan
- Sebelum mem-build aplikasi, atur kosmetik (*App Icon* & *Splash Screen*) dan nyatakan secara tertulis *Permissions* (Izin Akses) yang dibutuhkan aplikasi di file konfigurasi OS.
- Ubah kodemu menjadi file siap pakai (untuk Android: format `.apk` atau `.aab`) melalui mode **Build Release**.
- File `.apk` bisa disebar secara mandiri (Direct link) maupun dipublikasikan secara profesional melalui **Google Play Store**.

Selamat! Sebuah kehormatan luar biasa untuk meresmikanmu sebagai *Mobile App Developer*. Jangan berhenti berkreasi ya!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
