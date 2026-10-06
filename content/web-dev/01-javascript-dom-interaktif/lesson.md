---
title: "Menghidupkan Web dengan JavaScript & DOM"
order: 1
course: "web-dev"
emoji: "⚡"
---

Bayangkan kamu sedang membaca komik superhero. Halaman komiknya indah (CSS) dan ceritanya jelas (HTML). Tapi, apa jadinya kalau tokoh superheronya tiba-tiba bergerak dan meninju layar saat kamu menyentuhnya? Itulah fungsi **JavaScript**!

## Kenapa Ini Penting?
Website modern bukanlah sekadar brosur digital yang diam. Mereka bisa menerima inputanmu, menampilkan *pop-up*, berganti *dark mode*, hingga menjalankan animasi. Semua keajaiban itu digerakkan oleh JavaScript dengan memanipulasi *DOM*.

## Apa itu DOM? (Document Object Model)

Browser melihat file HTML-mu bukan sekadar teks, tapi sebagai sebuah "Pohon Keluarga".
- `html` adalah kakek buyut.
- `head` dan `body` adalah anaknya.
- `div`, `p`, dan `h1` di dalam `body` adalah cucu-cucunya.

Pohon keluarga ini disebut **DOM**. Dengan JavaScript, kita bisa memanjat pohon ini, mengambil salah satu elemen (misalnya sebuah teks), lalu mengubah isinya secara *live* tanpa perlu me-refresh halaman!

### Senjata Utama: Memilih & Mengubah

Cara paling umum untuk 'mengambil' elemen dari HTML adalah dengan `document.querySelector()`.

```javascript
// 1. Ambil elemen dari HTML yang punya ID "judul-utama"
const judul = document.querySelector("#judul-utama");

// 2. Ubah teksnya
judul.textContent = "Halo, Dunia JavaScript!";

// 3. Ubah warna CSS-nya
judul.style.color = "blue";
```

### Event Listener (Telinga Sang Web)
Gimana caranya web tahu kalau tombol ditekan? Kita pasangkan "telinga" bernama *Event Listener*.

```javascript
const tombol = document.querySelector("#tombol-sakti");

// Saat tombol "di-klik" (click), jalankan sebuah perintah
tombol.addEventListener("click", function() {
    alert("BOM! Tombol telah ditekan!");
});
```

💡 **Wawasan: Tipe Event Lainnya**
Selain klik (`click`), ada banyak *event* lain! Misalnya saat kamu mengetik di keyboard (`keyup`), saat kursor mouse lewat di atas elemen (`mouseover`), atau saat kamu *scroll* layar (`scroll`).

## Ringkasan
- **JavaScript** adalah bahasa yang memberikan logika dan interaksi pada halaman web.
- **DOM** adalah cara browser merepresentasikan struktur HTML layaknya "Pohon Keluarga".
- `querySelector()` digunakan untuk mengambil elemen tertentu.
- **Event Listener** digunakan untuk memicu aksi ketika pengguna melakukan sesuatu (seperti mengklik tombol).

Kamu sudah bisa mengubah isi halaman secara ajaib! Langkah berikutnya: mengambil data dari dunia luar!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
