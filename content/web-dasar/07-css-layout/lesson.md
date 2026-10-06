---
title: "CSS Layout dengan Flexbox"
order: 7
course: "web-dasar"
emoji: "📐"
---

Pernah lihat website yang nampilin beberapa "kartu" produk berjejer rapi
sejajar, terus waktu dibuka di HP, kartunya otomatis tersusun ke bawah?
Itu kerjaan **flexbox** — salah satu cara CSS mengatur tata letak beberapa
elemen sekaligus. Di modul ini kamu bakal belajar bikin layout yang rapi
dan otomatis menyesuaikan ukuran layar.

## Masalah yang Diselesaikan Flexbox

Tanpa aturan layout khusus, elemen HTML (seperti `<div>`) secara default
akan tersusun ke bawah satu-satu, seperti balok yang ditumpuk. Coba
bayangin kamu punya tiga kartu, dan kamu pengen mereka berjejer
**horizontal**, bukan ketumpuk vertikal. Flexbox adalah jawabannya.

## `display: flex` — Menyalakan Mode Flexbox

Buat mengaktifkan flexbox, kamu cukup kasih `display: flex` ke elemen
**pembungkus** (bukan ke elemen yang mau dijejer, tapi ke "wadah"-nya).

```html
<style>
  .container {
    display: flex;
    gap: 12px;
  }
  .kartu {
    padding: 16px;
    border: 2px solid navy;
  }
</style>

<div class="container">
  <div class="kartu">Kartu 1</div>
  <div class="kartu">Kartu 2</div>
  <div class="kartu">Kartu 3</div>
</div>
```

Coba jalankan kode di atas, lalu bandingkan hasilnya kalau baris
`display: flex;` kamu hapus — kartu-kartunya bakal balik ketumpuk ke
bawah. Properti `gap` di situ ngatur jarak antar kartu, biar nggak
nempel-nempel.

## Arah dan Perataan

Flexbox punya beberapa properti buat ngatur arah dan perataan elemen di
dalam wadahnya:

- `flex-direction: row` (default) — elemen berjejer horizontal.
  `flex-direction: column` — elemen bertumpuk vertikal (kayak biasa, tapi
  lewat flexbox).
- `justify-content` — ngatur perataan **horizontal** (kalau arahnya
  `row`), misalnya `center` (di tengah), `space-between` (nyebar rata).

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

> 💡 **Tips:** Anggap `.container` seperti rak buku, dan tiap kartu adalah
> buku yang ditaruh di rak itu. `display: flex` bikin buku-bukunya berdiri
> berjejer, bukan ditumpuk begitu saja.

## Sekilas Responsive: Biar Rapi di HP Juga

Website yang bagus harus tetap rapi baik dibuka di laptop maupun HP.
Salah satu kunci dasarnya adalah baris berikut di `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Baris ini bilang ke browser HP: "tampilkan halaman sesuai lebar layar
aslinya, jangan di-zoom out otomatis." Tanpa ini, halamanmu bisa kelihatan
kekecilan di HP.

Satu properti CSS yang sering dipasangkan: `max-width`, supaya konten
nggak melebar terlalu jauh di layar besar.

```css
.container {
  max-width: 900px;
  margin: 0 auto;
}
```

`margin: 0 auto` di sini bikin wadahnya otomatis ke tengah halaman.

> ⚠️ **Perhatian:** Sandbox HTML Lab tidak bisa mengecek warna atau posisi
> visual secara otomatis — checkpoint modul ini fokus mengecek apakah kamu
> sudah menulis struktur HTML dan class yang diminta, bukan hasil visualnya
> secara pixel-perfect.

## Ringkasan

- `display: flex` di elemen pembungkus membuat elemen di dalamnya berjejer
  (default: horizontal).
- `flex-direction`, `justify-content`, dan `gap` mengatur arah, perataan,
  dan jarak antar elemen dalam flexbox.
- `<meta name="viewport" ...>` dan `max-width` membantu tampilan tetap
  rapi di berbagai ukuran layar.

Sampai sini, fondasi HTML dan CSS dasarmu sudah cukup kuat! Selanjutnya
kamu akan belajar **Git & GitHub** — cara menyimpan dan mengelola kode
proyekmu, supaya siap di-deploy jadi website sungguhan.

Sudah paham? Kerjakan task di kartu checkpoint di bawah — kamu akan diminta
menyusun 3 kartu berjejer rapi pakai flexbox 👇
