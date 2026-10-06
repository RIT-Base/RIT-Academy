---
title: "Naik Kelas: Sekilas Test Automation"
order: 5
course: "qa-testing"
emoji: "🤖"
---

Bayangkan Facebook sedang memperbarui aplikasi kodenya untuk menambahkan fitur baru berupa tombol "Live Video". Sebagai *QA Tester*, apakah kamu hanya perlu mengecek jalan tidaknya fitur "Live Video" itu saja? TENTU TIDAK!

Kamu WAJIB mengklik ngecek kembali (Dari nol!) ratusan tombol lama yang lain (Tombol Like, Tombol Komen, Tombol Share). Kenapa? Karena seringkali *Programmer* menambahkan 1 bata baru, tapi 100 fondasi batu bata lama di bawahnya malah mendadak rubuh berantakan (Istilah medisnya ini disebut: **Regression Error**).

Masalahnya: Kalau di Facebook ada 10.000 skenario halaman, masa kamu *Tester Manual* harus ngeklik ulang satu-persatu sendirian pakai tangan tiap bulan? Tanganmu bisa melepuh putus! Di situlah kekuatan **QA Test Automation (Pengujian Otomasi)** mengambil alih dunia.

## Kenapa Ini Penting?
Gaji seorang *QA Automation Engineer* (Yang sanggup memprogram robot penguji) seringkali jauh melampaui seorang *QA Manual Tester*, bahkan kadang melampaui sang *Programmer* si pembuat aplikasinya sendiri! Mereka adalah dewa benteng kestabilan perusahaan raksasa (Unicorn/Decacorn). 

## Menulis Sihir untuk Menggerakkan Hantu Browser

Daripada mengeklik manual, *QA Automation Engineer* akan membuka laptopnya, menulis sebuah baris puisi kode pemrograman (misalnya menggunakan bahasa *JavaScript / Python*), lalu menjalankan sebuah alat gaib otomatis populer (Seperti **Selenium**, **Cypress**, atau sang pendatang baru paling mengerikan: **Playwright**).

Begini ilustrasi puisi magis skrip kode robot Cypress tersebut:
```javascript
// Puisi Robot Cypress untuk Tes Login Sederhana

// 1. Robot, tolong buka halaman ini!
cy.visit('https://sekolahku.com/login')

// 2. Robot, tolong cari kotak tulisan Username, ketikkan "admin"
cy.get('#input-username').type('admin')

// 3. Robot, tolong cari kotak tulisan Password, ketikkan "rahasia"
cy.get('#input-password').type('rahasia')

// 4. Robot, tolong klik tombol Kirim!
cy.get('button[name="Kirim"]').click()

// 5. Robot, tolong pastikan bahwa di halaman berikutnya ADA tulisan "Selamat Datang"
cy.contains('Selamat Datang').should('be.visible')
```

Apa yang terjadi saat skrip itu dijalankan (*Run*)?
Pernah lihat adegan film "Hollow Man" (Manusia Transparan Tak Terlihat)?
Komputermu akan tiba-tiba otomatis membuka jendela browser Google Chrome baru, kursornya **bergerak sendiri**, keyboardnya **mengetik secepat kilat** sendirian (mengisi kolom yang diperintahkan tadi), ngeklik masuk, dan ia membalas laporan hijau (*PASS*) hanya dalam durasi kilat 2 Detik!! 
Kamu tinggal ngopi bersantai memantau robot ini menyelesaikan ribuan daftar ujian sisa yang tak manusiawi itu!

## Ringkasan
- Menambahkan kodingan fitur baru tanpa disengaja dapat merusak (menghancurkan kaitan) runtutan kumpulan kode fitur lama yang dulunya sehat bugar, penyakit kambuh ini dikenal sebagai **Regression Error**.
- Mencegah error regresi memaksakan QA harus mengklik uji coba ulang semua (*Regression Test*) fitur masa lalu secara repetitif. Karena tenaga manual (Manusia) lambat, maka digunakanlah konsep kode skrip **Test Automation** (Robot Hantu).
- Teknologi alat pengendali robot browser yang populer mendominasi skena ini meliputi **Selenium**, pendobrak kuat **Cypress**, dan teknologi gahar baru Microsoft **Playwright**.
- Kumpulan baris kalimat skrip ini bekerja sangat efisien dengan cara mengambil patokan target (*Get Element ID/Class*) dan mengeksekusinya secara simulasi interaksi kursor manusia gaib (*type, click, scroll*).

Selamat! Kamu sudah menyandang ban lengan detektif kualitas elit (*Quality Assurance*). Tapi tunggu, sebelum sebuah fitur/produk dikoding dari awal, siapa coba bos besar arsitek yang merumuskan ide brilian desain bisnisnya? Dia adalah Sang Dewa Produk. Penasaran? Masuk ke Modul Pemuncak Terakhir: Produk Analis!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
