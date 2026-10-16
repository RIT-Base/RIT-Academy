---
title: "CSS dalam Website"
order: 6
course: "web-dasar"
emoji: "🎨"
---

Di modul-modul sebelumnya, kamu sudah berhasil merakit kerangka website yang lengkap pakai HTML  mulai dari judul, teks, gambar, form, sampai struktur semantik yang rapi. Tapi kalau dilihat sekarang, tampilannya masih polos banget, cuma ada teks hitam di atas latar putih dengan font standar browser.

Nah, sekarang saatnya kita kasih desain websitenya pakai **CSS**. Di modul ini, kita akan lebih fokus ke memahami cara kerjanya dan tahu ke mana harus mencari contekan sintaksnya saat kamu membutuhkannya nanti.

> **Fun Fact:** *Sebelum CSS diciptakan pada tahun 1996, programmer zaman dulu harus mewarnai teks langsung di dalam HTML menggunakan tag seperti `<font color="red">`. Kalau sebuah website punya 50 halaman dan bos minta ganti warna jadi biru, programmer harus mengedit 50 file itu satu per satu! CSS diciptakan supaya satu baris aturan bisa mendandani puluhan halaman sekaligus.*

## CSS Itu Apa?

**CSS** (*Cascading Style Sheets*) adalah bahasa yang bertugas mengatur tampilan visual elemen HTML. Kalau HTML bilang *"Ini adalah tombol"*, maka CSS yang menentukan *"Tombol ini warnanya ungu, sudutnya melengkung, dan ada jarak di dalamnya agar enak diklik"*.

Di era sekarang (apalagi ada bantuan AI dan mesin pencari), kamu **nggak perlu hafal banget semua nama properti CSS**. Yang paling penting adalah kamu paham:
1. Bagaimana cara menyambungkan CSS ke HTML.
2. Logika selektor (elemen mana yang mau dihias).
3. Konsep "Box Model" agar tampilan web tidak berantakan.

## 3 Cara Memasang CSS ke HTML

Ada tiga cara untuk memasukkan aturan CSS ke dokumen web:

### 1. Inline CSS (Menempel Langsung di Tag)
Ditulis langsung di dalam atribut `style` pada tag HTML:
```text
<h1 style="color: purple; font-size: 24px;">Judul Berwarna Ungu</h1>
```
*Kapan dipakai?* Jarang sekali di proyek nyata, biasanya hanya untuk tes kilat satu elemen. 

> *Kalau kamu pernah liat CSS ditulis dengan gaya seperti ini, CSS tersebut biasanya sudah bagian dari Framework CSS atau Framework website. CSS murni jarang digunakan di style inline seperti ini*

### 2. Internal CSS (Di Dalam Tag `<style>`)
Ditulis di dalam tag `<style>` yang diletakkan di dalam bagian `<head>`:
```text
<head>
  <style>
    h1 {
      color: purple;
    }
  </style>
</head>
```
*Kapan dipakai?* Cocok untuk latihan di sandbox lab online seperti yang kamu coba di bawah nanti. Atau di website yang tiap halamannya beda style atau website dengan halaman yang berdiri sendiri.

> *Permalsalahan utama di metode ini adalah ketika semua halaman CSS-nya sama tapi ada perubahan CSS yang berubah di semua halaman (misal mau ganti warna latar belakang, dan warna latar belakang ini harus sama di 10 halaman yang berbeda). Akhirnya kamu harus ganti satu per satu kalau ada perubahan style. Karena itu, internal CSS biasa digunakan untuk style(desain) yang digunakan spesifik di halaman tersebut.*

### 3. External CSS (File Terpisah `.css`)
Menulis kode CSS di file terpisah (misalnya `style.css`), lalu dipanggil di bagian `<head>` menggunakan tag `<link>`:
```text
<head>
  <link rel="stylesheet" href="style.css">
</head>
```
*Kapan dipakai?* **Ini adalah standar industri yang dipakai di semua website profesional.** Dengan cara ini, file HTML tetap bersih fokus ke isi, sementara semua urusan desain berkumpul rapi di file CSS terpisah.

## Cara Menulis Aturan CSS: Selektor

Sintaks CSS selalu mengikuti pola sederhana:
```text
selektor {
  properti: nilai;
}
```

**Selektor** bertugas menunjuk elemen mana yang ingin kamu rias. Ada 3 selektor yang paling sering kamu jumpai:
- **Selektor Tag (`h1`, `p`, `button`):** Mengubah **semua** elemen sejenis di halaman.
- **Selektor Class (`.kartu`, `.tombol-aksi`):** Ditandai dengan titik (`.`). Digunakan untuk menghias kelompok elemen tertentu yang memiliki atribut `class="..."`. Ini yang paling sering dipakai.
- **Selektor ID (`#header-utama`):** Ditandai dengan pagar (`#`). Khusus untuk satu elemen tunggal yang unik di halaman.

Coba perhatikan dan jalankan contoh di bawah ini:

```html
<style>
  /* Menghias semua judul h1 */
  h1 {
    color: darkblue;
  }

  /* Menghias elemen yang punya class="kartu" */
  .kartu {
    background-color: #f0f4f8;
    color: #1e293b;
    padding: 12px;
    border-radius: 8px;
  }
</style>

<h1>Profil Anggota RIT</h1>
<p class="kartu">Kotak ini berwarna abu kebiruan lembut karena class "kartu".</p>
<p>Paragraf ini tidak punya class "kartu", jadi tampil polos.</p>
```

## Memahami prinsip "Box Model" dalam CSS

Ini adalah konsep terpenting di CSS yang wajib kamu pahami: **Browser menganggap semua elemen HTML sebagai sebuah kotak**. Kotak ini punya 4 lapisan dari dalam ke luar:

1. **Content:** Isi aslinya (teks atau gambar).
2. **Padding:** Jarak di **dalam** kotak (antara teks dengan tepi kotak).
3. **Border:** Garis pinggir atau bingkai kotak.
4. **Margin:** Jarak di **luar** kotak (jarak antara kotak ini dengan kotak lainnya).

> 💡 **Kalau perlu digambarkan:**
> Bayangkan kamu mengirim barang belanjaan online. **Content** adalah barang yang kamu beli, **Padding** adalah bubble wrap empuk di dalam kardus agar barang tidak terbentur dinding kardus, **Border** adalah kardus kardusnya, dan **Margin** adalah jarak antar kardus di dalam mobil kurir agar tidak saling menabrak.

```html
<style>
  .kotak-paket {
    padding: 16px;          /* Bubble wrap di dalam */
    border: 2px solid navy; /* Kardus luar */
    margin: 20px 0;         /* Jarak ke tetangga atas/bawah */
  }
</style>

<div class="kotak-paket">
  Barang aman di dalam kotak berkat padding!
</div>
```

## Di Mana Mencari Contekan Sintaks CSS?

Jangan merasa bersalah kalau kamu lupa properti untuk membuat bayangan, ganti font, atau memiringkan teks. Programmer profesional pun setiap hari membuka contekan!

Berikut dua tempat referensi terbaik yang wajib kamu simpan di bookmark browser:
1. **MDN Web Docs (developer.mozilla.org):** Kamus resmi terlengkap dan paling akurat di dunia web. Kalau bingung fungsi sebuah properti, cukup cari di Google: `mdn [nama-properti]`, contoh: `mdn border-radius`.
2. **W3Schools (w3schools.com):** Sangat ramah pemula, langsung ada tombol "Try It Yourself" untuk mencoba-coba kodenya secara interaktif.

> 💡 **Tips Menanyakan CSS ke AI:**
> Kalau kamu menggunakan AI (seperti ChatGPT atau Claude) untuk membantu mendesain, jangan cuma minta *"Bikinin CSS bagus"*. Tanyakan dengan spesifik berbasis konsep yang kamu tahu, misalnya: *"Tolong buatkan CSS untuk class `.kartu-profil` dengan padding 16px, sudut melengkung border-radius 8px, dan warna latar abu lembut"*. Dengan pembuatan desain spesifik seperti ini, kamu lebih paham kodenya, kualitas kode yang dihasilkan AI meningkat, dan tampilannya lebih sesuai keinginan!

## Ringkasan
- CSS bertugas mendandani kerangka HTML.
- Tiga cara pasang CSS: Inline, Internal (`<style>`), dan External (`<link>` - standar industri).
- Selektor Class (`.nama-class`) adalah cara paling fleksibel dan umum dipakai untuk menghias elemen.
- Box Model: Content ➔ Padding (jarak dalam) ➔ Border (garis tepi) ➔ Margin (jarak luar).
- Tidak perlu menghafal semua properti; gunakan MDN Web Docs atau W3Schools sebagai referensi harian.

Di modul selanjutnya, kita akan keluar dari editor web ini dan mulai merakit file HTML serta CSS fisik di laptopmu sendiri!

Sudah paham konsepnya? Coba kerjakan latihan di kartu checkpoint di bawah 👇