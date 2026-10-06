---
title: "Cara Kerja Komputer"
order: 4
course: "level0"
emoji: "💻"
---

Waktu kamu buka aplikasi kalkulator, ketik `12 x 8`, terus muncul `96` — kelihatannya instan dan simpel. Tapi di dalam komputer/HP-mu, ada proses yang selalu terjadi dengan pola yang sama, buat hampir semua hal yang komputer lakukan. Yuk kita bongkar pola itu.

## Kenapa Ini Penting?

Semua alat digital yang kamu pakai — HP, laptop, konsol game — bekerja dengan cara dasar yang sama. Kalau kamu paham polanya, kamu bakal lebih gampang ngerti kenapa HP kamu kadang lemot, kenapa file tersimpan, dan gimana caranya program bisa "mikir".

## Pola Dasar: Input → Proses → Output

Hampir semua yang komputer lakukan mengikuti tiga langkah ini:

1. **Input** — data atau perintah yang kamu masukkan. Contoh: kamu mengetik `12 x 8` di kalkulator, atau menekan tombol lompat di game.
2. **Proses** — komputer "mikir", menghitung atau mengolah input tadi sesuai instruksi program.
3. **Output** — hasilnya ditampilkan/dikeluarkan ke kamu. Contoh: layar menampilkan `96`, atau karakter game kamu benar-benar melompat.

Coba lihat contoh sederhana pola ini dalam kode di bawah — anggap ini "kalkulator mini":

```html
<!-- Input: angka yang ditulis di kode. Proses: dijumlahkan otomatis oleh browser lewat JavaScript sederhana di bawah -->
<h1 id="hasil">Menghitung...</h1>
<script>
  const angka1 = 12;
  const angka2 = 8;
  document.getElementById("hasil").innerText = "Hasil: " + (angka1 * angka2);
</script>
```

Coba ubah angka `12` dan `8` di kode itu, lalu tekan **Run** — perhatikan output-nya ikut berubah. Itulah pola Input → Proses → Output secara langsung.

## Tiga "Organ" Penting di Dalam Komputer

Buat menjalankan pola tadi, komputer punya beberapa bagian penting:

- **CPU** (*Central Processing Unit*) — ini "otak"-nya komputer, yang benar-benar melakukan perhitungan dan menjalankan instruksi. Semua proses di atas terjadi di sini.
- **RAM** (*Random Access Memory*) — ibarat **meja kerja sementara**. Makin besar mejanya (RAM-nya), makin banyak hal yang bisa dikerjakan sekaligus tanpa komputer jadi lemot. Begitu komputer dimatikan, "meja" ini dibersihkan total — makanya kerjaan yang belum disimpan bisa hilang.
- **Storage** (penyimpanan, contoh: SSD/HDD) — ini seperti **lemari arsip permanen**. Beda dengan RAM, data di storage tetap ada meski komputer dimatikan. File foto, video, dan aplikasi kamu tersimpan di sini.

> 💡 **Tips:** Kalau HP kamu lemot pas buka banyak aplikasi sekaligus, itu sering karena "meja kerja" (RAM) udah kepenuhan — bukan berarti "lemari arsip"-nya (storage) penuh.

## Sistem Operasi: yang Mengatur Semuanya

Semua bagian di atas nggak bakal jalan rapi tanpa **sistem operasi (OS)** — contohnya Windows, macOS, Android, atau iOS. OS ini ibarat **manajer gedung**: dia yang mengatur aplikasi mana boleh pakai berapa banyak RAM, mengatur file di storage, dan jadi jembatan antara kamu (lewat layar sentuh/keyboard) dengan CPU di dalam.

Setiap kali kamu buka aplikasi, sebenarnya kamu lagi minta izin ke OS buat "pinjam" sedikit CPU dan RAM supaya aplikasi itu bisa jalan.

## Ringkasan

- Hampir semua kerja komputer mengikuti pola **Input → Proses → Output**.
- **CPU** adalah otak yang memproses, **RAM** adalah meja kerja sementara, **storage** adalah lemari arsip permanen.
- **Sistem operasi** mengatur semua bagian itu supaya bisa bekerja sama dengan rapi.

Selanjutnya kamu akan belajar bagaimana satu komputer bisa "ngobrol" dengan komputer lain di seluruh dunia lewat internet dan jaringan.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇