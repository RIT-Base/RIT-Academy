---
title: "Menulis Laporan Bug yang Disukai Developer"
order: 3
course: "qa-testing"
emoji: "🐞"
---

Kesalahan terbesar seorang Tester pemula adalah mengirim chat WhatsApp ke Programmernya yang isinya cuma begini: *"Mas Budi, fitur Loginnya rusak nih, tolong cekin dong!"*.
Budi si Programmer akan emosi. Rusaknya kenapa? Di HP apa? Pakai browser apa? Bagaimana cara membuat errornya muncul lagi? Pesan chat di atas adalah laporan sampah (Garbage Report).

## Kenapa Ini Penting?
Sebagai QA, tugas utamamu BUKAN sekadar "Menemukan" bug, melainkan "Mengkomunikasikan" bug tersebut kepada Programmer agar bisa **diperbaiki dengan cepat tanpa programmer harus banyak tanya balik**. Di situlah dibutuhkannya format **Bug Report** yang presisi dan sempurna.

## Anatomi Laporan Bug yang Profesional

Sebuah laporan tiket temuan kerusakan yang berkelas Internasional (biasanya ditulis di aplikasi seperti *Jira* atau *Trello*) MUTLAK wajib mengandung 5 elemen krusial ini:

### 1. Title (Judul Deskriptif)
Jangan tulis judul: *[Error Login]* ➔ Terlalu kabur/bias.
Tulis: *[Crash] Aplikasi menutup paksa sendiri saat login menggunakan username panjang karakter melebihi 20 huruf di HP Android 8.* ➔ Jelas, langsung tahu lokasi kejadiannya.

### 2. Severity & Priority (Tingkat Darurat)
- **Severity (Keparahan Bentuk):** Seberapa hancur aplikasinya? (Critical/Kritis: Mati Total || Minor/Kecil: Tombol warnanya salah, tapi masih bisa diklik).
- **Priority (Prioritas Perbaikan):** Seberapa urgen harus diperbaiki sekarang? (High: Tolong kerjakan saat ini juga || Low: Kerjakan bulan depan aja pas santai).

### 3. Steps to Reproduce (Langkah Memanggil Ulang Kutu)
Ini BAGIAN PALING PENTING SEDUNIA.
Programmer tidak akan bisa memperbaiki bug jika mereka tidak bisa memunculkan bug itu kembali di layar laptop mereka sendiri. Kamu HARUS memandu mereka langkah per langkah!
*Contoh:*
1. Buka aplikasi di Chrome versi 110.
2. Pergi ke halaman /keranjang.
3. Kosongkan keranjang, lalu klik tombol Checkout 3 kali berturut-turut cepat.
4. Error akan muncul.

### 4. Expected vs Actual Result (Harapan vs Kenyataan)
- **Expected (Harapan QA):** Seharusnya saat keranjang kosong, tombol checkout menjadi warna abu-abu (Mati/Disabled).
- **Actual (Kenyataan Pahit):** Tombol checkout tetap hijau, dan saat di-klik berulang kali layar memuntahkan kode rahasia merah.

### 5. Attachment (Lampiran Bukti Nyata)
Haram hukumnya melapor tanpa membawa barang bukti. Selalu lampirkan hasil Tangkapan Layar (Screenshot), apalagi jika dibarengi Video Rekaman Layar durasi 10 detik! Ini akan membungkam programmer yang hobi ngeles *"Ah di laptopku normal kok!"*.

💡 **Wawasan: Empati Komunikasi**
Ingat, programmer adalah manusia yang gampang stres setelah ngoding ribuan baris. Jangan gunakan bahasa yang menuduh di tiket laporanmu (misal: *"Kodingan loginnya Budi jelek bikin HP mati"*). Gunakan gaya bahasa obyektif: *"Sistem gagal memproses data masuk pada modul X"*.

## Ringkasan
- Melaporkan kerusakan error (Bug) hanya menggunakan 1 kalimat keluhan pendek via chat obrolan adalah tindakan sangat amatir.
- **Title (Judul)** wajib bersifat jelas, detail, dan deskriptif menjelaskan di mana pokok kronologi lokasi kejadian utamanya.
- Kunci mutlak keberhasilan *Bug Report* ada pada penulisan tata **Steps to Reproduce** (Langkah Memanggil Ulang) yang sangat urut, spesifik detail, agar sang Programmer berhasil melihat dan memancing penampakan si *Bug* keluar di laptopnya sendiri.
- Penyematan perbedaan teori pembanding antara kondisi Harapan ideal (**Expected**) dan situasi Kenyataan Pahit Error (**Actual Result**) harus tegas dipisahkan di laporan.
- Sertakan **Screen Record (Video)** sebagai alat barang bukti pamungkas.

Kamu telah sukses memetakan laporan berkas medis sang Kutu Error dengan rapi. Sekarang mari kita ambil kaca pembesar sungguhan (*DevTools Browser*) agar kamu tahu persis jeroan sistem tubuh aplikasi yang sedang mati tersebut!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
