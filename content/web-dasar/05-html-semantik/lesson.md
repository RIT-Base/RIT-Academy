---
title: "HTML Semantik"
order: 5
course: "web-dasar"
emoji: "🧭"
---

Sejauh ini kamu udah bisa bikin halaman yang isinya lengkap — teks, gambar,
link, list, form, tabel. Tapi ada satu masalah: kalau semua bagian halaman
cuma dibungkus `<div>` generik, browser (dan mesin lain kayak Google atau
screen reader) nggak tahu mana yang "menu navigasi", mana yang "konten
utama", mana yang "footer". Di modul ini kamu belajar tag-tag yang kasih
**makna** ke tiap bagian halaman, bukan cuma sekadar bentuk.

## Kenapa "Makna" Itu Penting?

Coba bayangin kamu baca koran. Kamu langsung tahu mana bagian judul besar
di depan, mana kolom berita utama, mana bagian iklan di pinggir — bukan
karena ada tulisan "INI JUDUL", tapi karena **posisi dan bentuknya** kasih
petunjuk. HTML semantik kerjanya mirip: dengan tag yang tepat, struktur
halamanmu jadi "kebaca" — baik oleh manusia yang lihat kodenya, maupun oleh
mesin.

Ada tiga pihak yang diuntungkan kalau kamu pakai HTML semantik:

1. **Kamu sendiri** — kode lebih gampang dibaca ulang beberapa bulan
   kemudian.
2. **Google (SEO)** — mesin pencari lebih ngerti bagian mana yang konten
   penting, jadi halamanmu lebih gampang ditemukan.
3. **Screen reader** — alat bantu baca buat teman-teman tunanetra bisa
   "lompat" langsung ke bagian navigasi atau konten utama, bukan harus
   dengerin seluruh halaman dari atas.

## Tag-Tag Semantik Utama

- **`<header>`** — bagian atas halaman, biasanya berisi judul situs atau
  logo.
- **`<nav>`** — kumpulan link navigasi/menu.
- **`<main>`** — konten **utama** halaman. Idealnya cuma ada satu `<main>`
  per halaman.
- **`<section>`** — mengelompokkan bagian konten yang punya tema sendiri
  (misalnya "Tentang Kami", "Hobi").
- **`<footer>`** — bagian paling bawah halaman, biasanya berisi info hak
  cipta atau kontak.

```html
<header>
  <h1>Website Budi</h1>
</header>

<nav>
  <a href="#tentang">Tentang</a>
  <a href="#hobi">Hobi</a>
</nav>

<main>
  <section id="tentang">
    <h2>Tentang Saya</h2>
    <p>Aku mahasiswa FKOMINFO UNIGA / anggota RIT.</p>
  </section>
  <section id="hobi">
    <h2>Hobi</h2>
    <ul>
      <li>Main game</li>
      <li>Coding</li>
    </ul>
  </section>
</main>

<footer>
  <p>&copy; 2026 Budi. Dibuat untuk RIT Academy.</p>
</footer>
```

Coba lihat lagi: strukturnya persis kayak layout website pada umumnya —
header di atas, menu di bawahnya, isi utama di tengah, footer di paling
bawah. Bedanya, sekarang tiap bagian punya "nama" yang jelas.

> 💡 **Tips:** `<section>` beda sama `<div>` biasa — pakai `<section>`
> kalau bagian itu punya judul sendiri (biasanya diawali `<h2>` atau
> `<h3>`) dan bisa dianggap "bab" tersendiri di halamanmu.

Coba edit contoh di bawah — susun ulang jadi punya header, nav, main, dan
footer, lalu **Run**:

```html
<h1>Portofolio Budi</h1>
<a href="#proyek">Proyek</a>
<h2>Proyek Saya</h2>
<p>Ini daftar proyek yang pernah aku buat.</p>
<p>&copy; 2026</p>
```

> ⚠️ **Perhatian:** `<nav>` bukan berarti "semua link di halaman harus
> masuk sini" — cukup taruh link yang memang berfungsi sebagai menu
> navigasi utama.

## Ringkasan

- HTML semantik memberi makna ke tiap bagian halaman, bukan cuma bentuk.
- Manfaatnya: kode lebih mudah dibaca, SEO lebih baik, dan lebih ramah
  buat screen reader.
- Tag utama: `<header>` (atas), `<nav>` (menu), `<main>` (konten utama,
  idealnya satu per halaman), `<section>` (kelompok konten bertema),
  `<footer>` (bawah).

Sampai sini, kamu udah menguasai seluruh struktur HTML. Selanjutnya kamu
akan belajar **CSS** — cara "mendandani" semua struktur ini biar nggak
cuma benar, tapi juga enak dilihat.

Sudah paham? Kerjakan task di kartu checkpoint di bawah — kamu akan diminta
mengubah halaman jadi struktur semantik yang lengkap 👇
