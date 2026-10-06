---
title: "Eksplorasi Data dengan Python & Pandas"
order: 1
course: "data-ai"
emoji: "🐼"
---

Melihat ratusan ribu baris data angka dan teks di tabel Excel tentu membuat pusing tujuh keliling. Bagaimana kalau kita butuh mencari tahu "Berapa rata-rata nilai ujian matematika siswa laki-laki di kelas 10?" dari lautan data itu? Selamat datang di dunia *Data Science*!

## Kenapa Ini Penting?
Data adalah 'minyak' di era digital modern. Perusahaan besar mempekerjakan *Data Scientist* untuk memanen "Emas Insight" dari tumpukan data yang acak. Siapa yang menguasai pengolahan data, dia yang akan memenangkan pasar (dan tahu tren masa depan!).

## Senjata Utama: Pandas

Di dunia pemrograman Python, kita tidak membaca tabel baris demi baris secara manual (pakai fungsi `for loop` murni). Kita menggunakan kekuatan *Library* paling tersohor bernama **Pandas** (Bukan hewannya, melainkan singkatan dari *Panel Data*).

Pandas bisa membaca file raksasa berekstensi `.csv` (Comma Separated Values - format standar penyimpan tabel) dalam hitungan detik.

### Objek Sakti: DataFrame
Setelah file dibaca, Pandas mengubahnya menjadi sebuah objek super pintar bernama **DataFrame** (Ibaratkan sebuah tabel virtual di dalam memori komputermu).

```python
import pandas as pd

# 1. Membaca tabel dari file CSV
df = pd.read_csv("nilai_siswa.csv")

# 2. Mengintip 5 baris pertama data
print(df.head())

# 3. Menghitung Rata-Rata (Mean) sebuah kolom 'Matematika'
rata_matematika = df['Matematika'].mean()
print(f"Rata-rata nilainya adalah: {rata_matematika}")
```

### Mem-filter Data dengan Mudah
Kekuatan magis Pandas ada di kemampuan filternya yang mirip seperti bahasa manusia:

```python
# Saring (filter): Tolong tunjukkan hanya siswa Laki-laki ('L') saja!
siswa_laki = df[ df['Gender'] == 'L' ]

# Lanjut cari nilai maksimum Matematika di siswa laki-laki
nilai_max_laki = siswa_laki['Matematika'].max()
print(nilai_max_laki)
```

💡 **Wawasan: Pembersihan Data (Data Cleaning)**
Dalam dunia nyata, 80% waktu Data Scientist habis untuk "Bersih-bersih Data". Seringkali data mentah berisikan sel kosong (kosong tak terisi), salah tulis teks huruf besar-kecil, atau ada angka nyasar (Nilai: 1000). Pandas punya puluhan alat pembunuh sel kosong seperti `.dropna()`!

## Ringkasan
- Pengolahan data raksasa akan sangat lambat jika hanya menggunakan Excel biasa.
- **Pandas** adalah *library* andalan di Python untuk memanipulasi, menyaring, dan menghitung data.
- **DataFrame** adalah sebutan untuk tabel ajaib dua-dimensi buatan Pandas di dalam memori komputer.
- Pandas memungkinkan kita melakukan perhitungan agregat yang rumit (`mean()`, `max()`, `min()`) dan *filtering* (penyaringan) hanya dalam satu atau dua baris kode murni.

Kamu telah membuka gudang hartanya. Sekarang, mari kita ubah deretan angka itu menjadi cerita bergambar di modul visualisasi data!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
