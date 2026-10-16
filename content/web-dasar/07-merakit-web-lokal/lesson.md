---
title: "Merakit Website di Komputer Sendiri"
order: 7
course: "web-dasar"
emoji: "💻"
---

Selamat! Selama modul 1 sampai 6, kamu sudah berhasil mempelajari fondasi HTML dan CSS langsung di dalam website RIT Academy. Tapi yang kamu buat baru di RIT Academy dan belum di file asli yang bisa dijalankan.

Sekarang saatnya kamu "lulus dari lab online" dan mulai merakit berkas website fisik pertamamu di komputermu sendiri. Modul ini akan memandu caramu menyiapkan folder kerja yang rapi seperti standar para programmer profesional.

## Struktur Folder Web

Setiap kali seorang web developer ingin membuat website baru, langkah pertama yang mereka lakukan bukanlah langsung mengetik kode, melainkan **menyiapkan folder proyek**.

Mari kita buat satu folder baru di komputermu (misalnya di dalam folder `Documents` atau `Projects`), beri nama `profil-saya`. Di dalam folder itu, kita susun struktur standar berikut:

```text
profil-saya/
├── assets/
│   └── foto.jpg
├── index.html
└── style.css
```

Mari kita bedah perannya masing-masing:
1. **`index.html`:** Halaman pertama yang muncul ketika website kamu dibuka.
2. **`style.css`:** Kumpulan CSS yang berisi semua aturan warna, jarak, dan hiasan. Kalau mau lebih rapih lagi, style.css juga bisa dimasukan ke folder assets.
3. **Folder `assets`:** Wadah khusus untuk menyimpan gambar, foto, atau ikon pendukung agar tidak tercecer berantakan di luar.

## Menghubungkan HTML dan CSS di Komputer Lokal

Buka folder `profil-saya` tersebut menggunakan aplikasi code editor pilihanmu (seperti **Visual Studio Code**). 

Buka file `index.html`, lalu buat kerangka dasar lengkap dengan tag `<link>` di dalam bagian `<head>` untuk memanggil file `style.css`:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil Saya</title>
  <!-- Menghubungkan file CSS eksternal -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="kartu">
    <img src="assets/foto.jpg" alt="Foto Profil" class="foto-profil">
    <h1>Halo, Saya Mahasiswa RIT!</h1>
    <p>Selamat datang di website lokal pertama saya.</p>
  </div>
</body>
</html>
```

Lalu di dalam file `style.css`, kamu bisa mulai menghias tampilannya:

```css
body {
  font-family: sans-serif;
  background-color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.kartu {
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.foto-profil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
```

Sekarang coba buka file `index.html` tersebut dengan cara klik ganda (*double click*) langsung dari File Explorer / File Manajer punyamu. Website buatanmu akan langsung terbuka di browser!

Perhatikan alamat yang tertulis di address bar browser: alamatnya akan berawalan **`file:///C:/Users/...`**  (atau semacamnya). Ini artinya halaman tersebut baru berjalan secara **lokal** di komputermu sendiri.

> **Catatan Khusus Pengguna HP (Tanpa Laptop):**
> *Kalau kamu tidak membawa laptop, kamu tetap bisa membuat berkas web ini lewat browser HP menggunakan **github.dev** (VS Code versi web resmi dari GitHub) atau aplikasi Android gratis seperti **Spck Editor** atau **Acode**. Caranya sama persis: buat file `index.html` dan `style.css` di dalam satu folder proyek yang sama!*

## 3 Aturan Emas & Fun Fact Industri Folder Web

Sebelum lanjut, ada 3 kebiasaan penting yang membedakan programmer pemula dengan programmer berpengalaman:

### 1. Kenapa Harus Dinamai `index.html`?
> **Fun Fact:** *Pernahkah kamu penasaran kenapa file utamanya wajib bernama `index.html`, bukan `halaman-utama.html` atau `beranda.html`? Di masa awal internet, web server dirancang untuk otomatis mencari "daftar isi / indeks" ketika seseorang membuka sebuah alamat web. Kalau kamu menamainya `beranda.html`, pengunjung harus mengetik alamat panjang seperti `website.com/beranda.html` agar tidak melihat layar error!*

### 2. "Musuh Bebuyutan URL: Spasi" (Gunakan Kebab-Case)
Jangan pernah memberi nama file atau folder web menggunakan spasi, misalnya: `foto profil saya.jpg` atau `tugas 1.html`.
Kenapa? Karena sistem internet akan otomatis mengganti spasi menjadi kode `%20`, sehingga alamatmu menjadi `foto%20profil%20saya.jpg`. Karena alamatnya berubah dengan adanya kode `20%`, akhirnya foto tidak muncul karena salah alamat.
*Gunakan gaya **kebab-case** dengan tanda strip/minus:* `foto-profil-saya.jpg` dan `tugas-1.html`.

### 3. Tragedi Huruf Besar vs Huruf Kecil (Windows vs Linux)
Di laptop Windows, memanggil file `Foto.JPG` dengan kode `<img src="foto.jpg">` biasanya tetap muncul karena Windows tidak membedakan huruf besar dan kecil (*case-insensitive*).
Tapi server internet dan GitHub berjalan di atas sistem operasi **Linux** yang sangat disiplin (*case-sensitive*). Bagi Linux, `Foto.jpg` dan `foto.jpg` adalah dua file yang sama sekali berbeda!
*Aturan Emas:* **Selalu gunakan huruf kecil semua** untuk semua nama file, gambar, dan folder webmu agar gambarmu tetap bisa diakses saat di-upload ke internet nanti.

## Ringkasan
- Meja kerja web standar memisahkan `index.html`, `style.css`, dan sub-folder `assets/`.
- File CSS dihubungkan di bagian `<head>` menggunakan `<link rel="stylesheet" href="style.css">`.
- File yang dibuka lewat klik ganda berstatus lokal (`file:///...`) dan belum bisa dilihat oleh orang lain di internet.
- Tiga aturan nama file: gunakan `index.html` untuk halaman utama, hindari spasi (pakai strip `-`), dan biasakan huruf kecil semua.

Lalu bagaimana kalau tampilan web lokalmu terasa ada yang miring atau warnanya kurang pas? Di modul berikutnya, kita akan membongkar alat rahasia browser untuk membedah dan menguji coba desain secara langsung!

Sudah paham strukturnya? Jawab task checkpoint di bawah ini 👇