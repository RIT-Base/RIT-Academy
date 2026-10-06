---
title: "Memodelkan Alur Sistem dengan Flowchart"
order: 2
course: "produk-analis"
emoji: "🔀"
---

Kalimat instruksi *User Story* memang bagus karena gampang dibaca manusia. Sayangnya, kalau instruksinya mulai memuat logika bercabang seperti *"Gimana kalau saat dia klik bayar ternyata saldonya nggak cukup? Tapi gimana kalau cukup tapi PIN nya salah ketik? Terus kalau salah ketik 3 kali apa yang terjadi?"*.

Menjelaskan kerumitan laju percabangan jalan itu menggunakan teks paragraf lisan sungguhlah panjang memusingkan. Di sinilah ilmu purba dari peradaban analisis IT diluncurkan: **Flowchart (Diagram Alir)**.

## Kenapa Ini Penting?
Coretan Flowchart adalah bahasa universal mutlak. Tidak peduli kamu dari divisi bisnis, desain, ataupun teknisi server; semuanya akan langsung setuju satu pikiran saat melihat peta blok-blok geometris Flowchart. Ia bertugas memetakan kemana arah kaki pengguna melangkah menyusuri lorong lorong aplikasi.

## Membedah Blok Geometris Suci (Standar ISO)

Flowchart bukan sembarang gambar kotak panah asal-asalan. Dalam konvensi standar internasional (ISO), setiap bentuk bangun datar menyimpan makna kodrat yang tak boleh ditukar!

### 1. Kapsul Pil Oval (Terminator)
Wujudnya elips seperti bentuk pil kapsul bundar obat (Bukan kotak murni, bukan bundar murni).
- **Kodrat Fungsi:** Ia **HANYA** boleh diutus sebagai simbol Penanda Garis MULAI (Start) pergerakan, atau Penanda TAMAT (End) perjalanan ujung alur sebuah proses berhentinya aplikasi.

### 2. Jajar Genjang (Input / Output)
Bentuknya kotak yang miring menyamping (Jajar Genjang).
- **Kodrat Fungsi:** Melambangkan momen aktivitas "Pengguna Sedang Mengetik Sesuatu / Data Masuk" (Contoh: Mengetik nama *Username*, Menggeser kartu ATM) ATAU momen "Sistem Meludahkan Informasi / Tampilan Data Keluar" (Contoh: Menampilkan bon struck layar pop-up struk pembayaran).

### 3. Kotak Persegi Panjang (Proses Komputer)
Wujudnya kotak balok lurus biasa.
- **Kodrat Fungsi:** Ini adalah ruang rahasia mesin. Aktivitas murni keringat perhitungan mesin yang sedang tidak butuh ditatap interaksi manusia. (Contoh: Sistem diam-diam menghitung Total Harga belanja keranjang kerupuk dipotong Diskon pajak PPN 11%, atau sistem mengecek mencocokkan password ke database gudang belakang).

### 4. Wajik Belah Ketupat (Decision / Kotak Percabangan Karma)
Bentuk diamond / wajik berlian (Belah Ketupat). Ini adalah ikon TERSUKSES dan TERPENTING di seluruh penjuru Flowchart!!
- **Kodrat Fungsi:** Titik penentuan nasib takdir. Di kotak ini hanya akan melahirkan SATU pertanyaan yang WAJIB mengalirkan panah terbelah DUA (Tidak boleh lebih/kurang): Rute Panah ke arah **YA (True)** atau Rute Panah menyimpang ke arah **TIDAK (False)**.
- *Contoh di dalam kotak wajik:* (Apakah Saldo ATM Anda Cukup?) ➔ Jika 'YA': Lanjut keluarkan uang ➔ Jika 'TIDAK': Beri layar peringatan dan suruh pulang.

💡 **Wawasan: Aturan Simpul (Flowline)**
Panah arah jalannya air harus selalu urut lurus tanpa putus dari Pil Oval [Start] mengular ke bawah menuju Pil Oval penutup akhir [End/Finish]. Panah DILARANG KERAS melayang menggantung menabrak dinding buntu atau mati tanpa arah muara!

## Ringkasan
- Analis Sistem butuh wadah peta visual bergambar bernama **Flowchart (Diagram Alir)** untuk menumpahkan penjabaran kompleksnya kerumitan logika percabangan jalan fitur sistem yang tidak bisa dijelaskan murni via lisan narasi.
- **Oval (Terminator)** mutlak eksklusif untuk menandai Titik Mulai Start / Akhir Stop.
- **Jajar Genjang (I/O)** dikhususkan merepresentasikan gerak kegiatan interaksi masukan input dari pengguna dan luaran info dari web.
- **Persegi Panjang (Proses)** menceritakan babak perhitungan mekanis eksekusi komputasi otak server di belakang layar yang sedang bekerja.
- **Wajik Berlian Belah Ketupat (Decision)** adalah titik persimpangan nasib wajib: "Apakah Ya atau Tidak?" yang mencabangkan dua alur berbeda arah takdirnya.

Peta alur interaksi jalannya web aplikasinya sudah keren. Tapi di ruang bawah tanah gudangnya (Database server Backend), tabel-tabel Excel barangnya harus kita susun rancangan kaitannya juga loh! Melompatlah ke ranah ERD (Entity)!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
