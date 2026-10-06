---
title: "HTML Konten: Teks, Gambar, Link, List"
order: 3
course: "web-dasar"
emoji: "🖼️"
---

Sekarang kamu udah tahu kerangka dasar HTML. Tapi kerangka doang belum
cukup buat bikin halaman yang enak dilihat, harus ada isinya. Kamu butuh isi yang lebih
banyak, kaya teks yang rapi, gambar, link ke halaman lain, dan daftar. Empat hal
ini bakal kamu pakai hampir di setiap halaman web yang kamu bikin,
termasuk nanti waktu bikin halaman profil dirimu sendiri di akhir modul
ini.

## Heading dan Paragraf: Bikin Teks Punya Hierarki

Kamu udah kenal `<h1>` dan `<p>`. Ternyata `<h1>` itu bukan satu-satunya
heading, ada `<h1>` sampai `<h6>`. Heading dimulai dari yang paling besar/penting (`<h1>`)
sampai yang paling kecil (`<h6>`). Fungsinya mirip daftar isi buku: judul
bab pakai huruf paling besar, sub-bab lebih kecil, dan seterusnya.

> ⚠️ **Perhatian:** Heading bawaan HTML ukurannya berbeda, namun Heading tidak digunakan sebagai penentu ukuran teks. Ukuran teks nantinya bisa dimodifikasi di CSS. Heading fungsi utamanya adalah untuk mengatur struktur, hierarki, dan navigasi isi dokumen atau halaman web agar lebih rapi dan mudah dibaca.

```html
<h1>Profil Anggota TCC</h1>
<h2>Tentang Saya</h2>
<p>Halo, namaku Budi. Aku anggota TCC sejak kelas X.</p>
<h2>Hobi</h2>
<p>Aku suka main game strategi dan belajar coding di waktu luang.</p>
```

> 💡 **Tips:** *Best Practices*: satu halaman idealnya cuma punya **satu**
> `<h1>` yang dipakai buat judul utama halaman. Sub-bagian di bawahnya pakai `<h2>`,
> `<h3>`, dan seterusnya sesuai tingkatannya (boleh lebih dari satu).

## Gambar: Tag `<img>`

Buat nampilin gambar, kamu pakai tag `<img>`. Tag ini agak beda, dia
**nggak punya tag penutup** dan wajib punya atribut `src` (sumber gambar)
supaya browser tahu gambar mana yang harus ditampilkan. Untuk gambar yang tersedia secara online, kamu bisa langsung pakai link gambarnya di `src`. Tapi kalau gambarnya ada di komputer, `src` bisa diisi tempat foto tersebut disimpan. Contohnya seperti: `/images/photo.jpg`

```html
<img src="https://picsum.photos/200" alt="Foto profil">
<p>Contoh foto yang tidak dapat diakses dan akan tertulis alt</p>
<img src="https://ini-link-salah.com" alt="Foto profil">
```

Perhatikan juga atribut `alt`. Atribut ini memunculkan teks cadangan yang muncul kalau
gambarnya gagal dimuat, dan juga dibacakan oleh screen reader buat teman-teman
yang punya keterbatasan penglihatan. Jadi idealnya jangan pernah kosongkan `alt`.

## Link: Tag `<a>` yang Lebih Lengkap

Kamu udah kenal `<a href="...">` dari modul sebelumnya. Selain `href="..."`, ada satu atribut tambahan yang sering
kepake, yaitu `target="_blank"` biar link kebuka di **tab baru**. Ini kepake banget
kalau kamu nggak mau pengunjung website kehilangan halamanmu waktu klik
link keluar.

```html
<a href="https://academy.tcc15.my.id" target="_blank">Website TCC</a>
```

## List: `<ul>` dan `<ol>`

Kalau kamu mau nampilin daftar, ada dua jenis:

- **`<ul>`** (*unordered list*) — daftar tanpa urutan, dipakai kalau
  urutannya nggak penting. Setiap item didalamnya ditulis dengan `<li>`.
- **`<ol>`** (*ordered list*) — daftar bernomor, dipakai kalau urutannya
  penting (misalnya langkah-langkah).  Setiap item didalamnya ditulis juga dengan `<li>`

Coba edit contoh di bawah:

```html
<h2>Hobiku</h2>
<ul>
  <li>Main game</li>
  <li>Coding</li>
  <li>Nonton anime</li>
</ul>

<h2>Langkah Bikin Mi Instan</h2>
<ol>
  <li>Rebus air</li>
  <li>Masukkan mi</li>
  <li>Tambahkan bumbu</li>
</ol>
```

> ⚠️ **Perhatian:** Item list (`<li>`) harus selalu ada **di dalam**
> `<ul>` atau `<ol>` — kalau ditaruh di luar, browser bakal bingung dan
> tampilannya jadi aneh.

## Ringkasan

- `<h1>`–`<h6>` bikin hierarki judul; `<p>` untuk paragraf biasa.
- `<img src="..." alt="...">` menampilkan gambar; `alt` wajib diisi.
- `<a href="...">` untuk link; tambahkan `target="_blank"` kalau mau
  kebuka di tab baru.
- `<ul>` untuk daftar tanpa urutan, `<ol>` untuk daftar berurutan; keduanya
  isinya `<li>`.

Sekarang kamu punya cukup "bahan" buat bikin halaman yang lebih hidup.
Selanjutnya kamu akan belajar bikin **form** dan **tabel** — buat halaman
yang bisa menerima input dari pengunjung.

Sudah paham? Kerjakan task di kartu checkpoint di bawah — kamu akan diminta
bikin halaman profil diri sendiri 👇
