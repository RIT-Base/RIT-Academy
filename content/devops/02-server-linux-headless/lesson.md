---
title: "Mengelola Server Linux Headless & Nginx"
order: 2
course: "devops"
emoji: "🖥️"
---

Mendeploy website (menyebarkan ke internet) tidak harus selalu menggunakan layanan *PaaS (Platform as a Service)* otomatis seperti Vercel. Di dunia kerja nyata, kamu seringkali hanya akan diberi "Kunci" ke sebuah komputer mentah di ujung dunia yang tidak memiliki layar, tidak punya mouse, tidak ada tampilan UI yang indah. Hanya ada terminal layar hitam.

Komputer jenis ini disebut **Server Headless** (Tanpa Kepala/Monitor). Bagaimana cara kita mengendalikannya?

## Kenapa Ini Penting?
Memahami cara kerja Server murni (seperti menyewa VPS murah seharga 50 ribu per bulan) memberimu kekuasaan absolut (Root) atas seluruh isi mesin, jauh lebih bebas ketimbang batasan yang diterapkan oleh platform-platform otomatis gratisan. 

## Meremote Server: Senjata SSH

Satu-satunya jalan mengendalikan mesin Headless adalah meremotenya dari laptopmu lewat perintah SSH (Secure Shell).

```bash
# Perintah di terminal laptopmu:
ssh nama_user@alamat_IP_servermu

# (Lalu masukkan passwordnya)
```
*BOM!* Kini tulisan terminalmu sudah berubah nama. Apapun yang kamu ketik di situ, aslinya tereksekusi di komputer server di benua lain!

## Administrasi Linux Server

Sekarang server sudah hidup, kamu harus memantaunya selayaknya dokter memantau detak jantung pasien:
- Gunakan perintah `htop` atau `top` untuk melihat aplikasi apa saja yang sedang banyak memakan RAM dan CPU di servermu. (Melihat daftar Proses).
- Jika ada aplikasi error yang membuat macet, cari nomor identitasnya (PID), lalu hentikan paksa dengan perintah `kill 1234`.

## Membuka Pintu Toko: Web Server (Nginx)

Kamu sudah menaruh file kodemu ke dalam server ini dan menjalankannya di `localhost:3000` (Port 3000). Tapi pengunjung dari luar tidak akan bisa mengaksesnya! Kenapa?
Karena servermu menolak tamu dari luar.

Kita butuh Satpam Penjaga Pintu. Satpam ini bernama **Web Server** (contoh paling populer: **Nginx** *baca: engine-ex*, atau Apache).
- Kita minta tolong Nginx untuk berdiri menjaga pintu depan server di gerbang resmi jalur internet umum (Port 80 untuk HTTP, atau Port 443 untuk HTTPS).
- Saat tamu internet datang mengetuk pintu depan Nginx, Nginx akan berkata: *"Oh, kamu mau akses website? Sebentar, aku arahkan kamu masuk lewat pintu belakang ke aplikasi anak ini yang menyala di localhost:3000 ya!"*

Teknik satpam yang membelokkan jalur masuk ini dalam bahasa IT disebut **Reverse Proxy**. 

## Ringkasan
- Server **Headless** adalah komputer spesifikasi murni yang hanya memiliki wujud terminal CLI (tanpa antarmuka grafis / layar UI biasa).
- Digunakan alat bernama **SSH (Secure Shell)** untuk mengendalikan server ini dari jarak jauh.
- Perintah **`htop` / `top`** sangat berguna untuk mendiagnosis beban pemakaian RAM dan CPU di dalam server.
- **Nginx** bertugas sebagai "Web Server / Reverse Proxy" yang menerima kunjungan dari internet umum, lalu meneruskannya secara aman ke dalam kodemu yang berjalan di belakang layar.

Satu masalah: bagaimana jika Server Linux ini kotor karena kita kebanyakan instal aplikasi uji coba dan merusak modul OS-nya? Di situlah kita butuh teknologi canggih bernama Kontainer! Lanjut!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
