---
title: "Program yang Interaktif"
order: 4
course: "python-dasar"
emoji: "💬"
---

Mencetak teks ke layar sudah, menyimpan data dalam variabel juga sudah. Tapi sampai sejauh ini, program kita terasa kaku. Dia hanya menjalankan apa yang tertulis di kode, dari atas ke bawah. Program yang keren, seperti aplikasi kasir, chatbot, atau game, selalu merespon masukan dari penggunanya!

## Kenapa Ini Penting?

Interaksi adalah inti dari setiap perangkat lunak modern. Program yang baik tidak hanya bicara, tetapi juga mendengarkan. Dengan menangkap perintah atau ketikan dari user (pengguna program), komputasi menjadi dinamis. Di modul ini, kamu belajar cara meminta dan memproses data dari luar sistem ke dalam sistem.

## Mendengar dengan `input()`

Kalau `print()` itu ibarat *mulut* bagi program untuk berbicara, maka `input()` adalah *telinganya* untuk mendengar ketikanmu.

```python
nama_kamu = input("Halo, siapa namamu? ")
print("Oh, halo " + nama_kamu + "!")
```
Di atas, program akan *berhenti sejenak* (menunggu), lalu apapun yang kamu ketik akan dimasukkan ke dalam laci (variabel) bernama `nama_kamu`. Baris kedua langsung menggabungkan teks sapaan dengan isi laci tersebut. Menggabungkan teks dengan tanda `+` disebut *string concatenation*.

Coba lihat bagaimana interaksi ini bekerja secara langsung:

```python
makanan = input("Apa makanan favoritmu? ")
print("Wah, aku juga suka " + makanan + "!")
```

## Awas, Komputer Terkadang Kaku! (Konversi Tipe Data)

Satu hal yang WAJIB diingat: **Apa pun yang masuk lewat `input()` akan SELALU dianggap sebagai String (Teks).**

Kalau kamu minta user memasukkan umur dan berencana menjumlahkannya, ini yang terjadi:
```python
umur = input("Berapa usiamu? ")
# Jika user mengetik 15, variabel umur berisi teks "15", BUKAN angka matematika 15.
# Jadi kalau kamu coba: umur + 5, program akan ERROR!
```

Solusinya? Kita harus *konversi* (mengubah) si String tadi menjadi angka Integer menggunakan fungsi `int()`.

```python
umur_teks = input("Berapa usiamu? ")
umur_angka = int(umur_teks)

tahun_depan = umur_angka + 1
print("Tahun depan, umurmu akan menjadi", tahun_depan)
```
Sekarang, matematikanya bekerja dengan semestinya!

## Ringkasan
- `input()` meminta pengguna mengetikkan sesuatu, dan program akan menunda eksekusi (menunggu) sampai user menekan Enter.
- Hasil dari `input()` **selalu** berwujud String (teks).
- Jika data masukan itu ingin dihitung secara matematis, gunakan fungsi `int()` (untuk Integer) atau `float()` (untuk angka desimal) guna mengubah tipe datanya.

Saatnya buat program yang menyapamu dengan ramah di checkpoint di bawah! 👇
