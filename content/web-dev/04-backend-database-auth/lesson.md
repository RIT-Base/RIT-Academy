---
title: "Backend, Database & Autentikasi JWT"
order: 4
course: "web-dev"
emoji: "🔐"
---

Jika Frontend adalah "Etalase" dan "Kasir" di depan toko, maka **Backend** adalah "Gudang" raksasa yang berada di belakang layar tempat semua barang disembunyikan.

## Kenapa Ini Penting?
Data di Frontend (browser) akan hilang saat kamu menutup Chrome. Untuk menyimpan akun user, keranjang belanja, dan postingan Instagram secara permanen, kamu WAJIB memiliki Backend dan Database. Dan tentu saja, semua itu butuh gembok keamanan!

## Elemen Inti Backend

### 1. Web Server (Sang Satpam Pintu)
Program yang mendengarkan request dari Internet (seperti Express.js di Node, atau FastAPI di Python). Ia menerima form Login, lalu mengecek kebenarannya.

### 2. Database (Sang Lemari Arsip)
Gudang penyimpanan utama. Umumnya terbagi dua:
- **Relasional (SQL):** Bentuknya seperti tabel Excel bersilang (MySQL, PostgreSQL). Sangat ketat dan rapi.
- **Non-Relasional (NoSQL):** Bentuknya seperti dokumen teks bebas (MongoDB). Fleksibel.

### 3. Hashing Password
PERATURAN EMAS: **Jangan pernah simpan password pengguna (misal "rahasia123") dalam bentuk teks asli di database!**
Jika databasemu dicuri hacker, tamatlah riwayat akun penggunamu. Kita menggunakan teknik *Hashing* (seperti `bcrypt`) untuk mengubah "rahasia123" menjadi sandi acak `$2b$10$X8aO.q2Z...` yang tak bisa dibaca balik.

### 4. Gembok Pintu: JWT (JSON Web Token)
HTTP bersifat *Stateless* (Pelupa). Jika kamu sudah sukses login, detik berikutnya server sudah lupa siapa kamu!
Solusinya? Server memberikanmu "Kartu Identitas" bernama **JWT** saat kamu berhasil login.

- Saat login sukses ➔ Server memberi token panjang: `eyJhb...`
- Frontend menyimpan token itu di memori.
- Untuk request data rahasia selanjutnya (misal: "Lihat Keranjang"), Frontend harus menyodorkan kembali token JWT itu ke Backend sebagai tiket akses.

💡 **Wawasan: API Endpoints (REST API)**
Backend berkomunikasi dengan menyodorkan URL khusus.
Contoh:
- `GET /api/products` (Ambil semua barang).
- `POST /api/login` (Submit data login).
Jika berhasil, server mengembalikan kode HTTP `200 OK`. Jika gagal login, kode `401 Unauthorized`. Jika server error, `500 Server Error`.

## Ringkasan
- **Backend** bertugas memproses bisnis logika dan menyimpan data permanen ke **Database**.
- Jangan pernah simpan password utuh! Gunakan **Hashing (bcrypt)**.
- **JWT (JSON Web Token)** digunakan sebagai kartu identitas (tiket) agar server mengingat bahasan bahwa kamu sudah login.
- **REST API** menggunakan rute (endpoint) dan mengembalikan kode status (seperti 200, 401, atau 500) beserta data JSON.

Luar biasa! Tokomu sudah punya etalase dan gudang. Tahap akhir: Menyewa ruko asli di Internet (Deploy)!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
