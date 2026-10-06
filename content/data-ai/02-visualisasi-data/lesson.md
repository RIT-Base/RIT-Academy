---
title: "Bercerita Lewat Grafik (Data Visualization)"
order: 2
course: "data-ai"
emoji: "📈"
---

Seberapa hebat pun kamu menemukan perhitungan angka rata-rata di data yang rumit, audiensmu (Bos di kantor, atau masyarakat umum) tidak akan mau melihat ribuan tabel berjejal angka. Manusia adalah makhluk visual; mereka butuh gambar! 

## Kenapa Ini Penting?
**Data Visualization** (Visualisasi Data) adalah seni bercerita. Tugas utamamu bukan sekadar menggambar, melainkan menyederhanakan data kompleks menjadi satu grafik yang membuat orang langsung berkata: *"Oh! Penjualan kita bulan ini merosot tajam!"* dalam waktu kurang dari 3 detik.

## Memilih Grafik yang Tepat

Kesalahan terbesar pemula adalah salah memilih jenis bentuk grafik. Beda tujuan cerita, beda pula jenis grafiknya!

### 1. Bar Chart (Grafik Batang) 📊
**Kapan dipakai?** Untuk **Membadingkan Kategori** satu dengan yang lain secara tegas.
*Contoh:* Membandingkan jumlah murid pria vs wanita di tiap jurusan, atau merk HP apa yang paling banyak dipakai siswa di kelas.

### 2. Line Chart (Grafik Garis) 📉
**Kapan dipakai?** Untuk menunjukkan **Tren Waktu (Time-Series)**.
*Contoh:* Melihat grafik pergerakan harga emas atau suhu kota Garut dari tanggal 1 hingga 30. (Kalau pakai batang, matamu akan pusing melihat 30 batang).

### 3. Pie Chart (Grafik Lingkaran) 🥧
**Kapan dipakai?** Untuk menunjukkan **Proporsi (Bagian dari Keseluruhan / Persentase)**.
*Aturan Emas:* Jangan pernah buat Pie Chart yang potongannya lebih dari 5! (Nanti bentuknya jadi seperti kepingan puzzle yang sangat kecil dan pusing dibaca).

### 4. Scatter Plot (Grafik Titik Sebar)
**Kapan dipakai?** Untuk melihat **Korelasi (Hubungan)** antara dua angka yang berbeda.
*Contoh:* Meneliti apakah ada korelasi antara "Lama jam tidur" (Sumbu X) dengan "Nilai Ujian" (Sumbu Y). Jika kumpulan titiknya naik miring rapi, berarti korelasi positif (makin cukup tidur, makin pintar).

💡 **Wawasan: Alat Tempur di Python**
Untuk melukis data ini dari Pandas DataFrame, kita biasanya memanggil bantuan kawan karibnya: library **Matplotlib** dan **Seaborn**. Cukup mengetik 2-3 baris kode, grafik berwarna yang estetik bisa langsung tertayang di layarmu.

## Ringkasan
- Visualisasi mengubah data mentah yang kaku menjadi presentasi visual yang mudah diserap otak manusia seketika.
- **Bar Chart** ideal untuk perbandingan jumlah antar kategori.
- **Line Chart** wajib dipakai jika kamu ingin melihat tren perjalanan data lintas waktu (Hari/Bulan/Tahun).
- **Pie Chart** khusus untuk melihat komposisi/persentase total 100%, namun jangan paksakan jika jenis potongannya terlalu banyak.
- **Scatter Plot** membantumu mendeteksi hubungan/korelasi dua jenis variabel berbeda.

Cerita data-mu sudah cantik dan siap disajikan. Selanjutnya, mari berkenalan dengan 'otak' tambahan canggih di luar sana yang bisa kita ajak mengobrol (AI)!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
