---
title: "Logika Keputusan (if/else)"
order: 5
course: "python-dasar"
emoji: "🚦"
---

Pernahkah kamu membuat keputusan? "Kalau mendung, aku bawa jas hujan. Kalau cerah, aku pakai topi." Otak kita mengeksekusi logika ini dengan sangat natural. Di dunia komputer, kita harus mengajarkan cara komputer memilih jalan bercabang ini secara eksplisit.

## Kenapa Ini Penting?

Program yang lurus tanpa percabangan akan sangat membosankan (karena selalu melakukan urutan dari atas ke bawah secara persis, tanpa mempedulikan situasi). Logika percabangan memungkinkan program beradaptasi: memeriksa syarat pendaftaran sekolah, menentukan kelulusan siswa, hingga memutuskan apakah HP player di dalam game sudah mencapai 0 dan *Game Over*.

## Bercabang dengan `if` dan `else`

Kata kunci percabangan adalah logika Jika-Maka: `if` (jika) dan `else` (jika tidak/selebihnya).

```python
skor = 80

if skor >= 75:
    print("Selamat! Kamu Lulus Ujian.")
else:
    print("Jangan menyerah! Coba lagi besok.")
```

**Perhatikan Indentasi!** Python mengandalkan jarak tulisan menjorok ke dalam (indentasi berupa spasi atau tab) di bawah kondisi `if`. Spasi tersebut memberi tahu Python: *"Baris-baris ber-spasi ini HANYA boleh dijalankan kalau syarat `if` di atasnya Benar."*

## Operator Perbandingan

Untuk mengecek kondisi, kita butuh pembanding yang menghasilkan `True` atau `False`:
- `==` (Sama dengan) — Hati-hati, `==` mengecek perbandingan, sedangkan `=` (sama dengan tunggal) memasukkan nilai ke variabel.
- `!=` (Tidak sama dengan)
- `>` (Lebih besar) dan `<` (Lebih kecil)
- `>=` (Lebih besar sama dengan) dan `<=` (Lebih kecil sama dengan)

## Banyak Kondisi dengan `elif`

Bagaimana jika ada lebih dari 2 pilihan? Kita pakai `elif` (singkatan dari *Else If*).

```python
lampu_lalu_lintas = "Kuning"

if lampu_lalu_lintas == "Hijau":
    print("Jalan Terus!")
elif lampu_lalu_lintas == "Kuning":
    print("Hati-hati, pelankan kendaraan.")
elif lampu_lalu_lintas == "Merah":
    print("Berhenti total!")
else:
    print("Lampu rusak! Hati-hati menyeberang.")
```

Coba mainkan logika cuaca di editor interaktif berikut:

```python
cuaca = "Hujan"

if cuaca == "Panas":
    print("Makan es krim.")
elif cuaca == "Hujan":
    print("Makan mie rebus.")
else:
    print("Makan nasi goreng.")
```

## Ringkasan
- Percabangan membuat program mampu "memutuskan" alur eksekusi berdasarkan kondisi tertentu.
- Gunakan `if` untuk kondisi pertama, `elif` untuk tambahan pilihan lain, dan `else` sebagai penangkap opsi terakhir.
- Penulisan Python WAJIB memperhatikan blok kode yang menjorok (indentasi) di bawah `if`/`elif`/`else`.
- `==` dipakai membandingkan. `=` dipakai menetapkan nilai variabel.

Sekarang, buktikan logikamu pada checkpoint kelulusan di bawah ini! 👇
