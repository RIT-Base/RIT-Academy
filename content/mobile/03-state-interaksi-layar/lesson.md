---
title: "Interaktivitas & State Management"
order: 3
course: "mobile"
emoji: "🔄"
---

Layar buatanmu mungkin sudah sangat cantik, tapi kalau tombol *Like* ditekan dan jumlah angkanya tidak bertambah, aplikasimu hanyalah gambar lukisan tak bernyawa. Di sinilah konsep **State** mengambil alih!

## Kenapa Ini Penting?
Interaksi (seperti mengetik di form, mencentang *to-do list*, atau membuka halaman baru) butuh tempat untuk "Mengingat" perubahan. Inilah yang membedakan UI yang statis dengan aplikasi yang hidup.

## Dua Kasta Widget di Flutter

Tidak semua Widget di Flutter setara kemampuannya. Secara garis besar dibagi 2:

### 1. StatelessWidget (Si Patung Batu)
Widget ini **Statik / Tetap**. Sekali dia digambar di layar HP, dia tidak bisa diubah lagi (kecuali layarnya dihancurkan dan dibuat ulang dari awal).
*Contoh:* Halaman "Tentang Aplikasi" yang isinya cuma teks biasa.

### 2. StatefulWidget (Si Tanah Liat)
Widget ini punya **State (Ingatan)**. Dia bisa diubah bentuknya *kapan saja* saat aplikasi sedang berjalan.
Kalau tombol *Like* dipencet, variabel `jumlahLike` bertambah. Lalu kita memanggil fungsi sakti: `setState()`. Fungsi ini akan menyuruh Flutter untuk **menggambar ulang** spesifik bagian layar itu saja dengan nilai `jumlahLike` yang baru!

```dart
// Ilustrasi Logika StatefulWidget
int angka = 0;

void tekanTombol() {
  setState(() {
    angka = angka + 1; // Ubah data memori, lalu refresh layarnya!
  });
}
```

### Navigasi Layar (Routing)
Gimana caranya pindah dari halaman Login ke halaman Home? Di Flutter, setiap layar/halaman (Screen) hanyalah Widget besar. Proses berpindah halaman disebut **Routing / Navigator**.

- `Navigator.push()`: Buka halaman baru (ditumpuk di atas layar sebelumnya, sehingga kamu bisa pencet tombol 'Back' di HP-mu).
- `Navigator.pop()`: Hancurkan halaman yang sedang aktif saat ini (kembali ke layar sebelumnya).

💡 **Wawasan: Form Input Teks**
Untuk mengambil teks yang diketik *user* di kolom password, kita menggunakan `TextField`. Dan agar kita bisa "menangkap" huruf yang diketik, kita mengikat kolom tersebut dengan tali pengintai bernama `TextEditingController`.

## Ringkasan
- UI yang tidak berubah menggunakan **StatelessWidget**.
- UI yang dinamis dan bisa berubah secara interaktif (angka skor, ceklis tugas) wajib menggunakan **StatefulWidget**.
- Fungsi **`setState()`** digunakan untuk memberitahu aplikasi agar me-render ulang layar sesuai data terbaru.
- Pindah antar halaman (Screen) menggunakan sistem tumpukan **Navigator (push & pop)**.

Aplikasi kita sudah bisa diajak berinteraksi dan pindah halaman! Sayangnya, saat aplikasi ditutup (di-kill dari RAM), semua data hilang. Mari kita belajar menyimpannya permanen di materi selanjutnya.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
