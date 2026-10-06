---
title: "Kriptografi: Menjaga Rahasia Digital"
order: 2
course: "cyber-security"
emoji: "🔑"
---

Pernah menulis pesan rahasia di kertas pas SD, pakai bahasa sandi alien yang cuma dimengerti oleh kamu dan teman sebangkumu? Selamat! Kamu sebenarnya sudah mempraktekkan ilmu **Kriptografi**! 

## Kenapa Ini Penting?
Di internet, data yang lewat (seperti password atau isi pesan WhatsApp) ibarat kartu pos yang terbuka. Siapapun yang menjadi "tukang pos" di tengah jalan bisa membacanya. Kriptografi mengubah kartu pos itu menjadi brankas baja yang terkunci rapat.

## Tiga Serangkai: Hash, Encode, dan Encrypt

Banyak pemula (bahkan programmer) yang masih tertukar menyebut ketiga hal ini. Padahal sifatnya sangat beda!

### 1. Encoding (Penerjemahan Bentuk)
Tujuannya **bukan** untuk merahasiakan, melainkan mengubah wujud data agar bisa ditransfer lewat media tertentu. Ibarat mengubah angka `10` menjadi huruf Romawi `X`.
- **Sifat:** BISA dibalik (Decode) dengan sangat gampang oleh siapa saja tanpa perlu password.
- **Contoh:** Base64. (Pernah lihat teks aneh berakhiran `==` ? Itu biasanya Base64!).

### 2. Hashing (Sidik Jari Digital)
Mengubah data sepanjang apapun menjadi teks acak dengan panjang yang selalu *tetap*.
- **Sifat Utama:** HANYA SATU ARAH! (Sangat sulit / mustahil untuk membalikkan teks acak menjadi teks asli). Jika satu huruf saja diubah di teks asli, hasil Hash-nya akan berubah 100%.
- **Kegunaan:** Menyimpan Password di database dan mengecek keaslian file. (Contoh algoritma: MD5, SHA-256).

### 3. Encryption (Enkripsi - Gembok Rahasia)
Teks asli diacak (Ciphertext) sedemikian rupa sehingga hanya bisa dibaca kembali oleh orang yang memegang **Kunci (Key)** yang tepat.
- **Sifat:** BISA dibalikkan (Decryption) asalkan punya kuncinya.
- **Jenisnya ada 2:**
  1. **Simetris:** Kunci gembok dan kunci pembukanya *SAMA* (Contoh: AES). Ibarat kamu mengunci diary dan hanya kamu yang punya kuncinya.
  2. **Asimetris:** Kunci gembok dan kunci pembukanya *BEDA* (Contoh: RSA). Ini yang digunakan oleh internet (HTTPS). Server memberi gembok publik ke pengunjung, dan hanya server yang memegang kunci privat untuk membukanya.

## Ringkasan
- **Encoding** tidak mengamankan data, hanya mengubah formatnya (mudah dibalik / di-decode).
- **Hashing** berjalan searah dan menciptakan sidik jari unik untuk data. Biasa digunakan untuk menyimpan password.
- **Encryption** mengacak pesan menggunakan kunci, di mana data hanya bisa dibalik / dibaca (Decrypt) oleh pemegang kunci. 

Dengan paham ketiga hal ini, kamu tidak akan salah lagi saat mendesain fitur "Lupa Password" atau sistem chat. Selanjutnya, mari kita jalan-jalan mencari lubang tikus di aplikasi Web!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
