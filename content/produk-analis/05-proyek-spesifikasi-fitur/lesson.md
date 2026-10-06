---
title: "Proyek Nyata: Dokumen Mini PRD Aplikasi"
order: 5
course: "produk-analis"
emoji: "📄"
---

Selamat! Kamu sudah paham bedanya kebutuhan asli dan palsu, bisa memetakan langkah navigasi (Flowchart), membangun gudang data (ERD), dan tahu cara menata kerja tim tanpa bentrok (Agile & Kanban). Kini saatnya pembuktian pamungkas: menyusun semua resep masakan dewa tersebut menjadi sebuah KITAB Suci Utama, yaitu Dokumen PRD (Product Requirements Document)!

## Kenapa Ini Penting?
PRD adalah "Surat Perintah Kerja" dari sang Jendral (Product Manager) kepada seluruh prajurit Programmer, QA, dan Desainer di lapangan. 

Jika PRD-mu isinya cuma satu kalimat: *"Tolong bikinin sistem absen siswa yang canggih ya"*.
- **Programmer** akan membuat absensi pakai sidik jari yang harganya 50 Juta.
- **Desainer** akan mendesain absensi pakai grafis tombol warna ungu janda.
- **QA** tidak tahu cara ngetesnya error tidaknya pakai standar batas lulus yang mana.
- Hasilnya? Semua prajurit tersesat dan berantakan! 
PRD yang sempurna akan mengikat dan menstandarkan semua imajinasi mereka ke dalam satu haluan pikiran yang sepakat presisi sama persis.

## Menyusun Mini PRD (Dokumen Persyaratan Produk)

Dalam proyek ini, bayangkan sekolahmu punya penderitaan akut: **"Siswa kesulitan mencari info jadwal lapangan Futsal yang kosong, seringkali 2 tim futsal bentrok tabrakan jadwal berebut lapangan yang sama padahal jamnya udah dibooking via mulut ke mulut!"**

Sebagai PM, ayo rumuskan solusi penyembuhannya di atas kertas dokumen Mini PRD eleganmu (Bisa pakai Notion / Google Docs):

### BAB 1: Target Latar Belakang Masalah (Latar Eksekutif)
- **Tujuan Solusi (Goal):** Membuat platform *Booking* sistematis sewa lapangan Ekskul yang transparan waktu Real-Time.
- **Kondisi Masalah:** Sering terjadi jadwal *double book* (bentrok) dan perebutan lapangan berujung cekcok fisik, karena tidak ada sistem terpusat kalender harian kosong yang bisa dibaca murid dan satpam yayasan sekolah.

### BAB 2: Cerita Sasaran Korban (User Story & Ceklis Syarat Tamat)
Jangan lupa sematkan rincian anatomi peran sasarannya!
- **User Story 1:** *"Sebagai seorang **Siswa Ekskul Olahraga**, saya ingin bisa **Melihat status Slot Jam Kosong jadwal ketersediaan Booking Lapangan Utama dari HP ku tanpa nanya-nanya verbal dari jauh**, Agar **Siswa tim seklasku tidak capek-capek rebutan hadir jalan jauh jika lapangannya masih penuh jamnya**."*
- **Acceptance Criteria (Batas Valid Lulus Tes):**
  - Tampilan visual wajib berbentuk porsi UI blok kalender (Tanggal, Nama Jam).
  - Jadwal kotak jam yang sudah laku ter-Booking sebelumnya oleh tim lain harus dikunci *(Disabled)* tombol warnanya menjadi Abu-Abu dan tidak bisa lagi di-klik booking paksa/tertindih dari sistem UI-nya.

### BAB 3: Diagram Arah Aliran Navigasi (User Flowchart)
Pasang foto ilustrasi bagan wujud standar gambar bentuk geometri *Flowchart* kasarmu (Masih ingat bangun ruang Terminator Kapsul ➔ Jajar Genjang Input? Pamerkan ilmunya!).
*(Contoh Alur: Start ➔ User Lihat Kalender Kotak Kosong ➔ Klik Booking Kotak Kosong ➔ Cek Syarat Logic Mesin Wajik (Decision Diamond: Apakah Slot ini Benar belum diambil orang pada millisecond ini?)*

### BAB 4: Gambaran Dinding Kerangka Database Gudang (ERD)
Sertakan juga panduan rujukan bentuk tabel Excel-nya bagi pengerjaan sang Programmer Database masa depan:
- Buat bentuk Kotak Entitas **SISWA** (dengan Primary Key berwujud atribut NIK\_NISN unik).
- Buat bentuk Kotak Entitas sasaran **LAPANGAN_YAYASAN** (PK: ID\_Lapangan\_Kode).
- Sambungkan keduanya melalui Entitas perantara transaksi tengah bernama **REKAMAN_BOOKING** dengan garis relasional tali simpul wujud 1-to-Many dari masing-masing sudut!

💡 **Wawasan: Pamer Karya Mahakarya Manajemen!**
Cetak hasil ringkasan penuangan kerangka analisa kerjamu di *Notion* di atas dalam wujud dokumen *.PDF*. Jadikan ini sebagai bukti berkas Portofolio Analis mu kala nanti melamar ke dunia Manajemen Organisasi korporasi. HRD akan takjub mengetahui bahwa alur runut pemikiran logikamu bahkan jauh lebih mahir tertata elegan berstruktur melebihi sekadar tukang ahli koding syntax mesin murni saja!

## Ringkasan
- Penyakit *miss-komunikasi* mematikan antar berbagai divisi kerja (Seni Desain vs Logika Mesin vs Standar Test Keamanan) mutlak bisa diobati 100% dengan satu kitab rujukan penengah pengeksekusian ide suci yang dinamakan **PRD (Product Requirements Document)**.
- Arsitek pembuat kerangka naskah dokumen tuntutan syarat spesifikasi *PRD* adalah wewenang tugas suci utama seorang Manajer pimpinan alur (**Product Manager**).
- Struktur isi *PRD* kelas atas minimum mengkristalkan gabungan tumpahan rumusan gabungan utuh komprehensif mulai dari penjabaran ringkasan *Latar Eksekutif Masalah Bisnis*, daftar wujud kebutuhan *User Story* dan penangkal standar selesainya (*Acceptance Criteria*), hingga perwakilan cetak biru skema panduan logika *Flowchart Flow* dan tali asmara entitas data *ERD Database*.

Tamat sudah rentetan perjalanan modul akademi penuangan intisari ilmu komputasi seisi piramida digital dari lapisan paling bawah mesin (OSI 7 Layer), hingga ke puncak gunung menara tertinggi tahta pimpinan logika manusia (Product Management). Banggalah, engkau lulus membawa pedang pusaka yang utuh untuk menaklukkan peradaban masa depan!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
