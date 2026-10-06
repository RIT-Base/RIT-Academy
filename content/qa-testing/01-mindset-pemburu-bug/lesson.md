---
title: "Mindset QA: Menemukan Error Sebelum Rilis"
order: 1
course: "qa-testing"
emoji: "🕵️"
---

Bayangkan tim Programmer telah begadang seminggu penuh membuat Aplikasi Belanja Online yang sangat canggih. Saat aplikasinya dirilis ke publik hari Senin pagi, ternyata tombol "Bayar" tidak bisa dipencet sama sekali gara-gara ada 1 baris kode yang lupa dihapus. Dalam waktu dua jam, perusahaan rugi puluhan juta Rupiah dan dihujat ribuan *user* di Twitter. Kiamat kecil!

Di sinilah Pahlawan Penyelamat itu muncul: Divisi **QA (Quality Assurance)**.

## Kenapa Ini Penting?
Programmer adalah "Pencipta" (Maker), mereka fokus membangun dan egois melihat keberhasilannya sendiri. Sedangkan QA adalah "Pemburu" (Breaker). Tugas QA Tester bukanlah ngoding dari nol, melainkan mencoba BERBAGAI CARA ISENG untuk merusak, menghancurkan, dan menekan batasan aplikasi itu SAAT MASIH DI DALAM PABRIK, sebelum aplikasinya bocor dirilis ke pengguna asli.

## Mengapa Bug (Kutu Error) Selalu Ada?

Tidak ada aplikasi sempurna di dunia ini. Bug lahir karena:
- Ketidakcocokan logika bahasa mesin.
- Kelelahan programmer.
- HP pengunjung aplikasi memiliki ukuran dan sistem yang aneh-aneh (Android 8, Android 13, iPhone 10).
Hukum besi QA: **"Bug yang ditemukan saat pengembangan harganya Rp 10.000 (Murah diperbaiki). Tapi Bug yang lolos meledak saat rilis publik, harganya Rp 10.000.000 (Menghancurkan reputasi bisnis)."**

## Siklus Hidup Kutu (Bug Life Cycle)

Pekerjaan QA tidak sekadar bilang "Mas, ini error nih!". Ada tata cara suci dalam perburuannya:
1. **New (Lahir):** Kamu, sang QA, menemukan bahwa saat user memasukkan password *Emoji* di form login, aplikasinya meledak (Crash). Kamu menuliskannya di tiket laporan sistem (seperti di aplikasi Jira).
2. **Assigned (Ditempelkan):** Manajer memberikan tugas penyembuhan bug tersebut ke tangan salah satu Programmer (Si Budi).
3. **Fixed (Diobati Budi):** Si Budi memperbaiki kodenya di laptopnya, lalu melempar balik statusnya ke kamu: "Nih, coba cek lagi, udah kubenerin!"
4. **Re-Test (Uji Ulang):** Kamu sebagai QA wajib melakukan tes persis sama dengan kelakuan pertamamu tadi.
5. **Closed (Mati):** Jika benar sudah sembuh, kamu tutup tiket kutunya!

💡 **Wawasan: Jangan Takut Dibenci!**
Banyak pemula sungkan menjadi QA karena takut dimusuhi Programmer akibat sering mencari-cari kesalahan kodingan mereka. Ubah *Mindset*-mu! Programmer profesional justru sangat MENCINTAI QA. Kenapa? Karena QA-lah pelindung wajah mereka dari hujatan netizen dan amukan Bos besar saat rilis hari H. Kalian adalah tim, bukan rival!

## Ringkasan
- Divisi **QA (Quality Assurance) Tester** bertugas mengemban pilar terakhir pertahanan kualitas produk dengan cara secara aktif mencari titik hancur/celah kesalahan (Bug) dari sebuah aplikasi sebelum produk tersebut dihirup publik.
- **Biaya perbaikan** akan melonjak drastis jika Bug lolos dan meledak di ranah tahap *Production (Rilis)*.
- Penanganan pencatatan Error mengikuti skema tata laksana silsilah baku yang disebut **Bug Life Cycle (Siklus Hidup Bug)**.
- *Mindset QA* bukanlah untuk pamer mencari kesalahan menjatuhkan programmer, melainkan *Quality Control* kolaboratif menjaga marwah nama baik produk dan keselamatan *User*.

Mentalitas sudah beres. Tapi, masa iya ngetes aplikasi cuma dengan main asal pencet sekenanya? Oh tentu tidak, kita harus merancang Skenario Ujian sistematis! Lanjut!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
