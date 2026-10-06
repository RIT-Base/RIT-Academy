---
title: "Otomasi dengan Loop"
order: 6
course: "python-dasar"
emoji: "🔁"
---

Seandainya guru menghukummu menulis *"Saya tidak akan terlambat masuk lab"* sebanyak 100 kali di papan tulis. Di dunia nyata tanganmu akan keriting. Namun di dunia pemrograman, pekerjaan berat berulang seperti ini adalah spesialisasi utama mesin. Kita bisa menyelesaikannya cukup dengan 3 baris kode yang disebut **Perulangan (Loop)**.

## Kenapa Ini Penting?

Komputer didesain untuk tugas repetitif tanpa henti dan tanpa membuat kesalahan. Menampilkan 10.000 list barang di toko online, memeriksa nyawa karakter setiap milidetik dalam game, hingga mengirim ratusan email sekaligus — semuanya digerakkan oleh satu konsep sederhana: Loop. Jika kamu menguasai Loop, kamu menguasai seni mengotomasi komputer.

## Mengulang Jumlah Tertentu dengan `for`

Jika kamu *sudah tahu* berapa kali harus mengulang, gunakan `for` dan perintah pembantu bernama `range()`.

```python
for angka in range(5):
    print("Hukuman ke-", angka)
```
Coba tebak apa hasil kodenya? Komputer (terutama Python) mulai berhitung dari angka `0`, jadi ia akan mencetak: `0, 1, 2, 3, 4` — tepat 5 kali, tapi berhenti sebelum menyentuh angka limitnya!

Coba latihan *for loop* di blok kode interaktif ini:

```python
# Akan mengulang sebanyak 3 kali:
for putaran in range(3):
    print("Berlari keliling lapangan: Putaran", putaran)
print("Selesai berolahraga!")
```

## Mengulang Tanpa Batas Waktu dengan `while`

Jika kamu *tidak tahu pasti jumlahnya*, melainkan menunggu sebuah "Kondisi" tercapai, kita gunakan `while` (Selama).

```python
nyawa = 3

while nyawa > 0:
    print("Bertarung! Nyawa saat ini:", nyawa)
    nyawa = nyawa - 1  # Kita mengurangi nyawa setiap putaran

print("Game Over. Nyawamu habis.")
```

**⚠️ Awas Bahaya Looping Tanpa Henti!**
Di dalam perulangan `while`, syarat *(kondisinya)* harus pada suatu ketika berubah menjadi `False`. Pada contoh di atas, nyawa terus dikurangi (`nyawa = nyawa - 1`). Coba bayangkan kalau kita *lupa* memasukkan baris pengurangan nyawa. Nilai nyawa akan terus 3 selamanya, program akan mencetak "Bertarung!" miliaran kali per detik hingga browser atau komputermu nge-*hang* (*crash*). Ini disebut **Infinite Loop**.

## Ringkasan
- Loop digunakan untuk otomatisasi pekerjaan berulang.
- Gunakan `for` dan `range()` ketika kamu tahu pasti berapa kali suatu kode harus diulang.
- Python mulai berhitung selalu dari `0` (Zero-Indexed).
- Gunakan `while` ketika perulangan bergantung pada kondisi benar-atau-salah. Pastikan suatu saat kondisi berubah menjadi salah (False) agar tidak terjadi Infinite Loop!

Uji pengetahuan perulanganmu di checkpoint berikut! 👇
