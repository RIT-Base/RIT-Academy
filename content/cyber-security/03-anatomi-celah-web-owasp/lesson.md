---
title: "Anatomi Celah Web (OWASP Top 10)"
order: 3
course: "cyber-security"
emoji: "⚠️"
---

Membangun website itu ibarat membangun rumah. Semegah apapun rumahnya, kalau jendelanya lupa dikunci, maling tetap bisa masuk. Di dunia Web, komunitas pengawal keamanan siber (OWASP) selalu merilis daftar 10 celah paling berbahaya tiap beberapa tahun.

## Kenapa Ini Penting?
Sebagai Programmer, mengetahui bahasa ngoding saja belum cukup. Jika kamu tidak tahu cara kerja seorang *Hacker* menyerang aplikasimu, kodemu akan menjadi sasaran empuk untuk dihancurkan.

## 2 Raja Celah Kemanan Web (Web Vulnerabilities)

Dari sekian banyak daftar, mari kita bahas 2 yang paling ikonik sepanjang masa:

### 1. SQL Injection (Suntikan Racun Database)
Celah ini terjadi karena Programmer "terlalu percaya" pada inputan User.
Bayangkan sebuah form Login yang logika di belakangnya seperti ini:
`"Tolong carikan di database User dengan username " + inputUser`

Seorang hacker akan dengan sengaja menginputkan teks aneh seperti ini di kolom username:
`admin' OR 1=1 --`

Secara ajaib, logika databasenya akan berubah terbaca menjadi:
*"Carikan saya User dengan nama 'admin', ATAU berikan akses jika 1 sama dengan 1"*.
Karena 1 memang sama dengan 1 (selalu *True*), maka hacker tersebut **LANGSUNG MASUK** tanpa butuh password sama sekali! Gila, kan?

### 2. Cross-Site Scripting (XSS - Suntikan Skrip ke Korban)
Kalau SQL Injection menyerang Database, XSS menyerang *Pengunjung Website* lain.
Celah ini terjadi di website yang membolehkan interaksi publik (seperti kolom Komentar Blog atau Forum). 

Hacker menulis komentar yang ternyata bukan sekadar teks, tapi kode JavaScript berbahaya:
`<script> alert('Kamu kena hack! Kirim tokenmu ke saya!'); </script>`

Jika website tersebut tidak menyaring karakter khusus (seperti `<` dan `>`), maka siapapun pembaca malang yang tak sengaja membuka halaman komentar tersebut, browsernya akan secara otomatis mengeksekusi kode rahasia itu!

💡 **Wawasan: Solusinya?**
Obat paling manjur untuk kedua penyakit di atas adalah **Sanitasi Input**. JANGAN PERNAH PERCAYA PADA PENGGUNA. Jika aplikasi meminta angka umur, pastikan yang diketik HANYA angka.

## Ringkasan
- Komunitas **OWASP** menjadi rujukan dunia tentang standar keamanan aplikasi web.
- **SQL Injection** terjadi ketika inputan jahat bisa memanipulasi logika bahasa Database, berisiko membocorkan/merusak seluruh data.
- **XSS (Cross-Site Scripting)** terjadi ketika *hacker* menyuntikkan kode program ke dalam website untuk menyerang atau mencuri tiket login pengunjung lain.
- Prinsip emas keamanan: **Jangan pernah percaya murni pada input user (Sanitasi Input)!**

Materi teori peretasan selesai. Sekarang, mari uji skillmu di arena gladiator sungguhan!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
