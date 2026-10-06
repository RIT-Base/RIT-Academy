---
title: "HTML Form & Tabel"
order: 4
course: "web-dasar"
emoji: "📝"
---

Pernah isi formulir pendaftaran lomba secara online, atau login ke sebuah
aplikasi? Itu semua dibangun pakai **form**. Ya, *form* ini adalah Formulir. Form adalah cara HTML buat nerima input dari pengunjung web lewat HTML. Selain form, di modul ini kamu juga bakal belajar **tabel**, buat nampilin data yang tersusun rapi dalam baris dan kolom, misalnya jadwal
pelajaran atau daftar nilai.

## Form: Tempat Pengunjung Mengisi Data

Form dibungkus dengan tag `<form>`. Di dalamnya, ada beberapa elemen
penting:

- `<label>` — teks penjelas buat sebuah input, misalnya "Nama Lengkap".
- `<input>` — kotak isian. Punya atribut `type` yang nentuin jenis isi formulir.
  inputnya: `text` (teks biasa), `email`, `number`, dan masih banyak lagi.
- `<button>` — tombol, biasanya buat mengirim (submit) form.

```html
<form>
  <label for="nama">Nama Lengkap:</label>
  <input type="text" id="nama" name="nama">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Daftar</button>
</form>
```

Perhatikan atribut `for` di `<label>` dan `id` di `<input>` — keduanya
harus **sama persis**. Ini yang bikin label "terhubung" ke input-nya,
supaya kalau pengunjung klik teks label-nya, kursor otomatis pindah ke
kotak input tersebut. Berguna banget buat kenyamanan pengguna.

> 💡 **Tips:** `type="email"` bikin browser otomatis mengecek format email
> (harus ada `@`) sebelum form dikirim — kamu nggak perlu nulis pengecekan
> sendiri.

Coba edit contoh di bawah — tambahkan satu input baru, lalu **Run**:

```html
<form>
  <label for="kelas">Kelas:</label>
  <input type="text" id="kelas" name="kelas">
  <button type="submit">Simpan</button>
</form>
```

> ⚠️ **Perhatian:** Di halaman sungguhan, form butuh server buat "menangkap"
> data yang dikirim (nanti kamu pelajari kalau lanjut ke path backend).
> Untuk sekarang, fokus dulu ke cara nulis struktur form yang benar.

## Tabel: Menyusun Data dalam Baris dan Kolom

Tabel dibangun dari tiga tag utama:

- `<table>` — pembungkus seluruh tabel.
- `<tr>` (*table row*) — satu baris.
- `<td>` (*table data*) — satu sel/kolom di dalam baris. Kalau selnya
  adalah **judul kolom**, pakai `<th>` (*table header*) supaya teksnya
  otomatis tebal.

```html
<table>
  <tr>
    <th>Nama</th>
    <th>Kelas</th>
  </tr>
  <tr>
    <td>Budi</td>
    <td>X-1</td>
  </tr>
  <tr>
    <td>Siti</td>
    <td>XI-2</td>
  </tr>
</table>
```

Bayangin tabel kayak papan catur: `<table>` adalah papannya, `<tr>` adalah
tiap baris kotak, dan `<td>`/`<th>` adalah tiap kotak itu sendiri.

## Ringkasan

- `<form>` membungkus elemen input; `<label for="...">` harus punya `id`
  yang sama dengan `<input id="...">` yang dijelaskannya.
- `<input type="...">` punya banyak jenis (text, email, number, dst);
  `<button type="submit">` untuk mengirim form.
- `<table>` dibangun dari baris `<tr>`, yang isinya sel `<td>` (data biasa)
  atau `<th>` (judul kolom).

Selanjutnya kamu akan belajar HTML **semantik** — cara menyusun bagian
halaman (header, menu navigasi, konten utama) supaya lebih bermakna, bukan
cuma sekadar tampil rapi.

Sudah paham? Kerjakan task di kartu checkpoint di bawah — kamu akan diminta
bikin form pendaftaran sederhana 👇
