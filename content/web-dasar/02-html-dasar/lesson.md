---
title: "HTML Dasar: Struktur Dokumen"
order: 2
course: "web-dasar"
emoji: "🧱"
---

Di modul sebelumnya kamu udah belajar kalau waktu kamu buka website, browser minta
"response" ke server, dan yang dikirim balik itu isinya **HTML**. Nah,
sekarang saatnya kamu belajar nulis HTML. HTMl dipakai
untuk nyusun isi dan struktur halaman web. Tanpa HTML, website tidak bisa menampilkan isi konten yang ada, termasuk yang lagi kamu baca sekarang.

> **Fun Fact:** *Walaupun sering dianggap bahasa pemrograman, HTML sendiri lebih tepatnya dikategorikan sebagai **Markup Language**; yaitu bahasa untuk mengubah text menjadi tampilan tertentu yang menarik dan dapat dibaca (contoh lainnya seperti **Markdown**). Alasan lainnya adalah karena HTML sendiri tidak bisa menggunakan logika komputasi seperti melakukan operasi matematika.*

## HTML

Bayangin kamu mau bangun rumah. Sebelum ada cat, keramik, atau furnitur,
yang pertama dibikin adalah **kerangkanya**. Tanpa kerangka itu, nggak ada yang bisa dibangun.

**HTML** (*HyperText Markup Language*) berfungsi sebagai kerangka
itu, tapi buat halaman web. HTML nentuin bagian mana yang merupakan judul, paragraf,
gambar, tombol dan bagian-bagian lainnya. HTML juga menandkan fungsi yang bisa digunakan di bagian-bagian tersebut. Nantinya kerangka tersebut akan diisi dan dipoles di modul berikutnya ketika kamu akan belajar CSS untuk mengatur desain yang ada di HTML (seperti warna, jarak, tata letak). Sebelum kesana, sekarang kita fokus dulu ke kerangkanya.

## Struktur Dasar Sebuah Dokumen HTML

Setiap file HTML punya struktur baku yang selalu sama, apa pun isinya.
Coba perhatikan contoh berikut:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Halaman Pertamaku</title>
  </head>
  <body>
    <h1>Halo, ini halamanku!</h1>
    <p>Ini paragraf pertama yang aku tulis.</p>
  </body>
</html>
```

Yuk bedah satu-satu:

- `<!DOCTYPE html>` — baris ini adalah pengumuman ke browser: "Halo browser,
  file ini pakai standar HTML terbaru ya." Selalu ditulis di baris paling atas.
- `<html>...</html>` — pembungkus **semua** isi dokumen HTML. Segala sesuatu di
  halamanmu nantinya harus ada di dalam tag ini.
- `<head>...</head>` — bagian yang **nggak muncul langsung di layar**.
  Isinya berupa info-info "di belakang layar" buat browser, misalnya judul tab (`<title>`).
- `<body>...</body>` — bagian yang **benar-benar muncul di layar**. Semua
  teks, gambar, tombol yang dilihat pengunjung di browser akan ditaruh di sini.

> **Tips:** Kalau kamu edit sesuatu tapi nggak muncul di halaman, cek dulu.
> Jangan-jangan kamu naruhnya di dalam `<head>`, bukan `<body>` atau malah salah ketik.

## Tag dan Atribut

Kamu udah lihat beberapa **tag** di atas: `<html>`, `<head>`, `<body>`,
`<h1>`, `<p>`. Tag itu semacam "label" yang kasih tahu browser ini jneis konten apa. 
Kebanyakan tag ditulis berpasangan dengan tag pembuka (`<p>`) dan tag
penutup (`</p>`). Isi konten yang berada di antara keduanya dianggap sebagai
isi dari tag itu.

Selain tag, ada juga **atribut**. Atribut adalah informasi tambahan yang ditempel di tag
pembuka. Contoh paling umum adalah tag `<a>` (link) yang butuh atribut
`href` buat nentuin link-nya mengarah ke mana:

```html
<a href="https://academy.tcc15.my.id">Kunjungi website TCC</a>
```

Di sini, `href="..."` adalah atribut. Tanpa atribut ini, browser nggak tahu
link-nya harus ngarah ke mana walaupun teksnya tetap kelihatan biru dan
bisa diklik.

Coba edit contoh di bawah. Ganti alamat link dan teksnya, lalu coba klik:

```html
<h1>Link Favoritku</h1>
<a href="https://www.wikipedia.org">Klik di sini</a>
```

> ⚠️ **Perhatian:** Tag yang lupa ditutup (misalnya ada `<p>` tanpa `</p>`)
> kadang masih kelihatan jalan di browser, tapi bisa bikin struktur
> halaman berantakan kalau ada tag lain setelahnya. Biasakan selalu tutup
> tag dari awal. Biasanya teks editor yang dipakai buat ngoding udah bisa otomatis buat tag penutup ini.

## Ringkasan

- HTML adalah kerangka struktur sebuah halaman web.
- Dokumen HTML selalu dimulai `<!DOCTYPE html>`, lalu punya `<html>` yang
  membungkus `<head>` (info di belakang layar) dan `<body>` (isi yang
  tampil di layar).
- Tag adalah label jenis konten (`<h1>`, `<p>`, `<a>`, dst), sedangkan
  atribut adalah info tambahan di tag pembuka (misalnya `href` pada `<a>`).
- Tag umumnya berpasangan: pembuka dan penutup.

Selanjutnya kamu akan belajar lebih banyak jenis tag buat nampilin teks,
gambar, link, dan daftar — biar halamanmu makin berisi.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
