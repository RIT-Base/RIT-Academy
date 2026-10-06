---
title: "CSS Pengantar"
order: 6
course: "web-dasar"
emoji: "🎨"
---

Coba bandingin: halaman-halaman HTML yang kamu bikin sejauh ini vs website
favoritmu — pasti beda jauh, kan? Website favoritmu punya warna, jarak yang
rapi, font yang enak dibaca. Bedanya ada di **CSS**. Kalau HTML itu
kerangka bangunan, CSS itu cat, keramik, dan dekorasinya. Di modul ini kamu
mulai belajar CSS dari dasar — konsep yang bakal terus kamu pakai di
hampir semua proyek web ke depannya.

## CSS Itu "Baju"-nya HTML

**CSS** (*Cascading Style Sheets*) adalah bahasa buat ngatur tampilan
elemen HTML: warna, ukuran, jarak, font, dan tata letak. Kalau HTML nulis
"ini judul", CSS yang nentuin "judul ini warnanya biru, ukurannya besar,
fontnya begini". Satu elemen HTML yang sama bisa tampil sangat berbeda
tergantung CSS yang dipasang ke dia — persis kayak satu orang yang sama
bisa kelihatan beda banget pakai baju formal vs baju olahraga.

## Cara Nulis CSS: Selektor

CSS ditulis dalam bentuk **aturan** (*rule*), dengan pola:

```text
selektor {
  properti: nilai;
}
```

**Selektor** nentuin elemen HTML mana yang mau diatur. Ada tiga jenis
selektor yang paling sering dipakai:

- **Selektor tag** — pilih semua elemen dengan nama tag tertentu.
  ```css
  p {
    color: blue;
  }
  ```
  Ini bikin **semua** `<p>` di halaman jadi warna biru.

- **Selektor class** — pilih elemen yang punya atribut `class` tertentu,
  ditulis pakai titik (`.`) di depan nama class-nya.
  ```css
  .kartu {
    color: red;
  }
  ```
  Ini cuma ngubah elemen yang HTML-nya ditulis `class="kartu"`.

- **Selektor id** — pilih **satu** elemen spesifik yang punya atribut `id`
  tertentu, ditulis pakai pagar (`#`).
  ```css
  #judul-utama {
    color: green;
  }
  ```

> 💡 **Tips:** Class dipakai kalau gaya itu mau dipakai berkali-kali di
> banyak elemen (misalnya semua kartu produk). Id dipakai kalau elemennya
> memang cuma ada satu di halaman (misalnya satu judul utama).

CSS bisa ditulis langsung di dalam file HTML pakai tag `<style>` di bagian
`<head>`. Coba lihat contoh berikut, lalu **Run**:

```html
<style>
  h1 {
    color: purple;
  }
  .kartu {
    color: darkblue;
  }
</style>

<h1>Judul Ungu</h1>
<p class="kartu">Paragraf ini berwarna biru tua karena class "kartu".</p>
<p>Paragraf ini warnanya default karena tidak punya class "kartu".</p>
```

## Warna dan Font

Selain `color` (warna teks), ada beberapa properti dasar lain yang sering
dipakai:

- `background-color` — warna latar belakang elemen.
- `font-size` — ukuran teks (misalnya `20px`).
- `font-family` — jenis font (misalnya `Arial, sans-serif`).

```css
.kartu {
  color: white;
  background-color: navy;
  font-size: 18px;
  font-family: Arial, sans-serif;
}
```

## Box Model: Setiap Elemen Itu "Kotak"

Ini konsep penting yang sering bikin bingung pemula: **setiap elemen HTML
dianggap browser sebagai sebuah kotak**, dan kotak itu punya empat lapisan:

1. **Content** — isi elemen itu sendiri (teks/gambar).
2. **Padding** — jarak antara isi dan tepi kotak (kayak bantalan di
   dalam kotak).
3. **Border** — garis pembatas kotak.
4. **Margin** — jarak antara kotak ini dengan elemen lain di luarnya.

Bayangin kamu ngirim barang lewat paket: **content** itu barangnya,
**padding** itu bubble wrap di sekitarnya, **border** itu kardusnya, dan
**margin** itu jarak antar kardus di dalam truk pengiriman.

```css
.kartu {
  padding: 16px;
  border: 2px solid black;
  margin: 10px;
}
```

> ⚠️ **Perhatian:** Sandbox HTML Lab di RIT Academy nggak bisa "menilai"
> warna atau ukuran yang kamu pilih — jadi checkpoint modul ini lebih
> fokus ngecek apakah kamu sudah **menulis** CSS-nya dengan benar (ada
> `<style>`, ada elemen ber-class), bukan warna spesifiknya.

## Ringkasan

- CSS mengatur tampilan elemen HTML: warna, ukuran, font, jarak, dst.
- Aturan CSS = selektor + properti + nilai, ditulis di dalam `<style>`.
- Tiga selektor dasar: tag (`p`), class (`.kartu`), id (`#judul-utama`).
- Box model: setiap elemen adalah kotak dengan content, padding, border,
  dan margin.

Selanjutnya kamu akan belajar **flexbox** — cara CSS mengatur tata letak
beberapa elemen sekaligus, misalnya bikin beberapa kartu berjejer rapi.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
