---
title: "Seni Merancang Skenario Uji (Test Case)"
order: 2
course: "qa-testing"
emoji: "📋"
---

Mengecek aplikasi bukanlah pekerjaan asal nebak pencet tombol kiri kanan sambil rebahan. Seorang *QA Tester Profesional* menggunakan pedoman kitab suci khusus yang disebut **Test Case** (Skenario Ujian).

## Kenapa Ini Penting?
Tanpa buku skenario *Test Case*, kamu pasti akan lupa menguji fitur B saat asyik memeriksa fitur A. Lalu saat aplikasi rilis, fitur B malah meledak error! *Test Case* memastikan semua kemungkinan sudut ruangan aplikasi sudah 100% dipel.

## Tiga Jalur Pengujian Mental

Misalkan bosmu memintamu mengetes "Formulir Pendaftaran Umur Siswa" (Yang syarat aturannya: Hanya menerima angka Umur minimal 10 tahun, dan maksimal 18 tahun).
Bagaimana cara QA merancang pengujiannya?

### 1. Positive Testing (Jalur Lurus Orang Normal)
Ini adalah ujian "Basa Basi". Kamu berpura-pura menjadi pengunjung teladan yang baik budi dan penurut.
- **Kamu mengetik:** Angka `15`.
- **Ekspektasi Harapan:** Sistem sukses menerima dan menyimpannya. *Pass (Lolos)*.

### 2. Negative Testing (Jalur Jahil Pengguna Barbar)
Ini adalah arena taman bermainnya QA! Kamu bertingkah seperti orang paling menyebalkan di bumi.
- **Kamu mengetik:** Kata `Tiga Belas` (Pakai huruf alfabet, padahal diminta angka).
- **Kamu mengetik:** `$$$@#` (Pakai simbol alay).
- **Kamu tidak mengetik apa-apa** dan langsung menekan tombol *Kirim* secara kosong (Spamming).
- **Ekspektasi Harapan:** Sistem TIDAK BOLEH hancur berkeping-keping layarnya! Sistem harus dengan anggun mengeluarkan peringatan huruf merah yang sopan: *"Maaf, mohon isikan wujud angka saja!"*. Jika sistem sukses memblokir kejahilanmu, statusnya *Pass (Lolos)*.

### 3. BVA (Boundary Value Analysis / Uji Batas Jurang)
Ini trik level dewa para QA. Seringkali programmer salah menaruh tanda rumus Kurang Dari (`<`) dan Kurang Dari Sama Dengan (`<=`) di dalam kodenya. Untuk mendeteksi kelemahan rumus itu, kamu HANYA PERLU mengecek angka-angka persis di pinggir jurang perbatasan:
Ingat batas aturannya (Umur 10 s.d 18)? Maka angka yang WAJIB kamu serang adalah:
- Uji ujung batas bawah mutlak: Uji angka `9` (Harus Ditolak), lalu angka `10` (Harus Lolos).
- Uji ujung batas atas mutlak: Uji angka `18` (Harus Lolos), lalu angka `19` (Harus Ditolak).

💡 **Wawasan: Matrix Excel**
Seorang QA menulis ratusan Skenario Jalur ini di dalam sebuah tabel Excel yang rapi sebelum aplikasinya jadi. Jadi saat aplikasinya sudah jadi dan diserahkan programmer, QA tinggal membacakan daftar ujiannya, mencentang Lolos (*Pass*) atau Gagal (*Fail*). Rapih sekali!

## Ringkasan
- Pengujian tak boleh nebak asal. Harus dituliskan kerangka skenarionya ke dalam dokumentasi **Test Case**.
- **Positive Testing** bertugas mengecek apakah jalan lurus alur sistem yang dijanjikan berjalan normal/benar tanpa hambatan.
- **Negative Testing** merupakan ajang pengujian celah kebodohan input User (Karakter aneh/kosong) agar sistem mampu merespons dengan peringatan cegatan (*Error Handling*) yang tidak merusak aplikasi.
- **BVA (Boundary Value)** memfokuskan serangan angka uji tepat murni di ujung limit kriteria batas perbatasan guna meneliti akurasi rumus logika komputasi kodingannya sang Programmer.

Kamu sudah ahli mendiagnosa dan menyusun strategi tes yang mematikan! Lalu bagaimana caranya melaporkan Error itu kepada Programmer agar mereka paham dan tidak ngamuk? Seni pelaporan rahasianya ada di materi selanjutnya!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
