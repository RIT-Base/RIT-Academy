---
title: "Mengenal Git & GitHub"
order: 8
course: "web-dasar"
emoji: "🐙"
---

Pernahkah kamu mengerjakan tugas kelompok dan filenya diberi nama seperti `tugas_akhir.docx`, lalu besoknya direvisi jadi `tugas_akhir_fix.docx`, dan besoknya lagi `tugas_akhir_fix_beneran_terakhir_banget.docx`? Saat kita membuat website, kode HTML dan CSS kita akan terus berubah. Kalau kita menggunakan cara "ganti nama file" tadi, dijamin kepala akan pusing!

Di sinilah **Git** dan **GitHub** datang sebagai penyelamat hidup programmer.

## Kenapa Ini Penting?

Bayangkan kamu sedang bermain game yang sulit. Agar tidak mengulang dari awal saat game over, kamu pasti rajin membuat *Save Point* atau *Checkpoint*. Nah, **Git** adalah sistem pembuat *save point* untuk kodemu. Sementara **GitHub** adalah layaknya "Google Drive khusus Programmer" untuk memamerkan dan mencadangkan kodemu ke internet agar teman setim bisa ikut mengerjakan bersama tanpa merusak kodemu. Memahami Git adalah syarat mutlak bekerja di dunia IT profesional.

## Git (Di Laptopmu) vs GitHub (Di Awan)

Seringkali pemula menganggap Git dan GitHub itu sama. Padahal mereka adalah dua hal berbeda:
- **Git** adalah aplikasinya (alat pencatat versi) yang di-install dan berjalan di komputermu sendiri. Ia mencatat *siapa* mengubah kode *apa* dan pada *jam berapa*.
- **GitHub** adalah website / layanan awan tempat kamu meletakkan catatan Git-mu itu.

## 4 Perintah Ajaib (Mantra Git)

Kamu belum dituntut menghafal cara kerja Git yang sangat canggih sekarang. Cukup ketahui 4 alur dasarnya yang paling sering diketik programmer di Terminal:

1. `git init` 
   **Inisialisasi.** Mengubah folder biasa di laptopmu menjadi folder sakti yang diawasi oleh Git.
2. `git add .`
   **Siap-siap.** "Hai Git, tolong kumpulkan semua barang (file) yang baru saja aku edit ini, aku mau menyimpannya."
3. `git commit -m "pesan"`
   **Simpan Permanen.** Membungkus barang tadi menjadi sebuah *Checkpoint*! Pesan yang ditulis biasanya menceritakan apa yang kamu ubah (Misal: `"Menambah warna biru di header"`).
4. `git push`
   **Terbangkan ke Awan.** Mengirim semua checkpoint yang ada di laptopmu meluncur naik ke GitHub agar aman di internet.

Saat di RIT Academy nanti (di level selanjutnya), kamu akan terbiasa menggunakan keempat jurus dasar ini!

## Ringkasan
- Menamai file dengan `v1`, `v2`, `final` adalah cara lama yang berbahaya untuk mengelola kode.
- **Git** adalah sistem catatan perubahan (Version Control System) di komputermu.
- **GitHub** adalah platform awan (cloud) untuk menyimpan dan berkolaborasi kode.
- 4 langkah dasar: `init` (mulai), `add` (tambah/pilih), `commit` (simpan), dan `push` (unggah).

Siap menerbangkan website lokalmu ke internet? Selesaikan kuis konsep Git di bawah ini sebelum kita lanjut ke Modul Deployment! 👇
