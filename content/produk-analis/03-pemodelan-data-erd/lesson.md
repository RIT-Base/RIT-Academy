---
title: "Struktur Data Bisnis: Konsep Relasi ERD"
order: 3
course: "produk-analis"
emoji: "🗄️"
---

Flowchart di ranah Analisis Produk sudah memandu "Arah Langkah Aksi" ke mana pengunjung bergerak. Tapi, data apa saja persisnya yang bakal ditelan oleh gudang *Database Backend Server* (Ingat modul *Web Dev Backend Database SQL*)?
Untuk menjawabnya, arsitek sistem membuat kerangka tulang peta penyimpanan data relasional yang disebut **ERD (Entity-Relationship Diagram)**.

## Kenapa Ini Penting?
Gudang database SQL aslinya berwujud tabel-tabel baris/kolom murni (Kumpulan Kotak Excel). Kalau Programmer tidak diberi panduan ERD, mereka tidak akan tahu tabel *Siswa* ini harusnya nyambung terikat dengan tabel *Kelas* yang mana. Akibatnya? Data sekolahmu acak adul campur aduk ketika dipanggil pencariannya nanti.

## Komponen Pembangun Anatomi Gudang ERD

Bentuk ERD sedikit mirip Flowchart, tapi dengan peruntukan penamaan bentuk bangun khusus dan gaya tali panah relasi (Hubungan Garis) yang unik tajam:

### 1. Entitas (Kotak Persegi Utama)
**Entity** adalah Wujud Kata Benda utamanya. Siapa/Apa yang sedang kita data di kehidupan nyata sekolah ini? 
*Contoh Entitas:* `SISWA`, `GURU`, `MATA_PELAJARAN`, `KELAS`.

### 2. Atribut (Lingkaran Oval Nempel)
Setiap benda/entitas wajib punya properti karakter deksripsi sifat yang melekat mendarah daging di badannya. Inilah **Attribute**. 
*Contoh untuk Entitas SISWA punya Atribut:* (Oval Nama, Oval Alamat, Oval Tanggal Lahir, dll).

### 3. Sang Penguasa Identitas Unik: Primary Key (PK)
Ini adalah jenis Atribut elit! Coba pikirkan, di sekolahmu pasti ada 3 murid yang punya kebetulan nama panggilan pasaran yang sama persis: "Budi". Bagaimana cara komputer tahu Budi mana yang belum bayar kas?
Tentu, atribut `Nama` TIDAK BISA diandalkan. Kita butuh atribut yang tidak akan pernah kembar sama angkanya sampai kiamat.
Atribut unik penentu nasib ini disebut **Primary Key (Kunci Utama)**. 
- *Contoh PK Entitas Siswa:* `Nomor_Induk_Siswa_Nasional (NISN)`
- *Contoh PK Entitas KTP:* `NIK_KTP_Penduduk`.
(Dalam penggambaran ERD visual, atribut yang berkedudukan sebagai PK ini akan digaris bawahi).

## Ikatan Tali Asmara Relasi (Relationship)

Ini bagian terserunya! Entitas tak bisa berdiri sendiri tanpa jodoh ikatan relasinya dengan tabel Entitas lain. 
Digambarkan dengan wujud Belah Ketupat (Di tengah-tengah tali penghubung dua Entitas), garis hubungan (Kardinalitas) itu memiliki 3 rasio alam semesta baku:

1. **One-to-One (1 banding 1):** Hubungan sangat setia tiada dua seumur hidup.
   *Contoh:* (1) Warga Negara ➔ *Hanya memiliki* ➔ (1) Paspor / KTP Identitas Asli.
2. **One-to-Many (1 banding Banyak N):** Hubungan ke banyak bawahan kasta yang paling subur sering terjadi di semua sistem di dunia!
   *Contoh:* (1) Ibu Ibu ➔ *Melahirkan* ➔ (Banyak) Anak.
   *Contoh IT:* (1) Wali Kelas Utama ➔ *Membimbing* ➔ (Banyak / Many 30) Murid Siswa di ruang kelasnya.
3. **Many-to-Many (M banding Banyak N):** Hubungan liar bebas terjalin bersilang sarang laba-laba dua sisi massal!
   *Contoh IT:* (Banyak M) Siswa di sekolah itu ➔ *Boleh bebas Memilih Mendaftar ke* ➔ (Banyak N) Jenis Pilihan Ekstrakurikuler yang beragam!

## Ringkasan
- Analis Produk yang andal wajib memetakan cetak biru relasi struktur lumbung tabel simpanan database logis menggunakan **ERD (Entity-Relationship Diagram)**.
- Setiap objek kata benda nyata utama (Seperti Guru, Produk, Transaksi) dijadikan wujud kotak sentral **Entitas**.
- Tiap entitas tersebut punya sifat-sifat deksriptif kolom rincian (seperti nama, warna, harga, no_hp) yang disebut lingkaran **Atribut**.
- Atribut yang sifat identitas kodenya dijamin 100% mutlak mustahil kembar dengan atribut objek entitas lain tetangganya dikaruniai mahkota penanda **Primary Key (PK)**.
- Pertalian asmara benang pengikat antar entitas (*Kardinalitas Relasional*) diklasifikasikan ke 3 wujud alam: **1-to-1**, **1-to-Many**, dan kerumitan laba-laba persilangan **Many-to-Many**.

Diagram aliran logika dan tabel pondasi logis gudangnya kini resmi tergambar paripurna sudah. Sekarang saatnya kamu kumpulkan tumpukan semua berkas *Product Manager* (Riset Masalah, User Story, Flowchart, dan ERD) ini untuk mengatur dan memerintahkan programmer bekerja nge-gas! Ayo loncat ke ilmu sihir memanajemen kolaborasi kuli kerja programmer di bab **Agile & Scrum**!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
