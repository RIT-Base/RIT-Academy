---
title: "Proyek Nyata: Mini Dashboard & Etika Data"
order: 5
course: "data-ai"
emoji: "🛡️"
---

Selamat! Kamu sudah paham cara membersihkan data (dengan Pandas), melukiskannya ke dalam grafik (dengan Visualisasi), lalu mengotomasi pekerjaan manual dengan Bot AI. Saatnya menyusun semuanya menjadi mahakarya seorang ilmuwan data: Sebuah **Data Dashboard**!

## Kenapa Ini Penting?
Di dunia industri, eksekutif (Bos perusahaan) tidak peduli seberapa jago kamu ngoding Python. Yang mereka pedulikan adalah sebuah layar berisi sekumpulan grafik rapi (*Dashboard*) yang bisa mereka klik dan baca untuk mengambil keputusan strategi bisnis. 

## Arsitektur Data Pipeline & Dashboard

Data Dashboard tidak muncul begitu saja, ia berawal dari sebuah pipa aliran (*Pipeline*) pengolahan data:
1. **Koleksi & Ekstrak:** Data ditarik dari database asli atau file mentah CSV.
2. **Transform (Pembersihan):** Menggunakan kekuatan Pandas untuk menghapus data kosong (Null/NaN), menyeragamkan format huruf, dan menggabungkan kolom terkait.
3. **Load & Visualize:** Data yang bersih di-render menjadi kumpulan grafik indah (Bar, Line, Pie).
Di era modern, kamu tak perlu bikin website dari nol untuk ini, cukup gunakan pustaka Python canggih bernama **Streamlit**. Dengan Streamlit, script Python-mu otomatis berubah jadi Web Interaktif interaktif.

## Hal yang Harus Kamu Sadari: Etika & Privasi Data

Kekuatan data datang dengan tanggung jawab luar biasa. Dalam membuat dashboard, perhatikan tiga hukum etika privasi utama ini:

### 1. PII (Personally Identifiable Information)
Jangan PERNAH mencantumkan data privasi (Nomor Induk Siswa, Nomor KTP, No HP, Alamat Rumah) ke dalam Dashboard atau model AI untuk publik! Lakukan **Anonymize** (samarkan/hapus kolom identitas tersebut) sebelum data masuk tahap visualisasi publik. 

### 2. Bias Data di dalam AI
Jika datamu dominan satu gender saja (misal 90% laki-laki), saat AI menyerap tren datanya, IA akan secara diskriminatif merekomendasikan keputusan yang merugikan porsi wanita di masa depan. Algoritma (Mesin AI) yang buruk adalah cerminan dari data yang buruk pula (Garbage In = Garbage Out).

### 3. Izin Akses (Consent)
Hanya olah dan visualisasikan data yang diizinkan langsung (punya *Consent*) dari si pemilik data. Menggali *Insight* menggunakan data curian akan berakhir di meja hukum pidana!

## Ringkasan
- Tujuan akhir dari semua pengolahan data adalah **Dashboard**: layar ringkas berisi kumpulan visualisasi angka penunjang keputusan eksekutif (Bisa dibangun pesat menggunakan **Streamlit**).
- Skema pipanya selalu sama: Koleksi data ➔ Transformasi/Pembersihan data (*Pandas*) ➔ Load ke Visualisasi.
- **Etika Privasi sangat krusial**: Samarkan data berisiko tinggi atau **PII** (KTP, Alamat, No Telepon).
- Perhatikan **Bias Data**: Data yang timpang sebelah akan mencetak prediksi AI yang timpang dan merugikan sebagian kelompok masyarakat.

Luar Biasa! Kemampuan analisis datamu kini bukan sekadar teknis mesin, tetapi matang secara logika dan etis kemanusiaan. Gunakan ilmu datamu dengan penuh kebijaksanaan!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
