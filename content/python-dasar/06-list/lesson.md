---
title: "Koleksi Data (List)"
order: 7
course: "python-dasar"
emoji: "📚"
---

Bayangkan kamu membuat program inventori toko yang berisi 50 barang jualan. Apakah kamu harus membuat laci variabel `barang1`, `barang2`, sampai `barang50`? Mengetiknya saja capek! Jawabannya, masukkan saja semuanya ke dalam sebuah tas ransel besar ber-slot. Di Python, tas itu disebut **List**.

## Kenapa Ini Penting?

Aplikasi di dunia nyata selalu bekerja secara berkelompok dengan tipe data serupa. Feed Instagram terdiri dari "List of Posts", daftar kontak WhatsApp adalah "List of Contacts", bahkan lirik lagu bisa dilihat sebagai sebuah "List of Words". Belajar mengelola List artinya kamu siap menangani ribuan baris data hanya dengan nama satu variabel utama.

## Membuat & Mengambil Isi List

List dibungkus oleh tanda kurung siku `[]`, dan isinya dipisahkan oleh tanda koma `,`.

```python
keranjang_belanja = ["Susu", "Telur", "Roti", "Keju"]
```

> 💡 **Wawasan Tambahan — Istilah "Array":** 
> Di banyak bahasa pemrograman populer lainnya (seperti C++, Java, atau JavaScript), kumpulan data berderet seperti ini lebih sering disebut dengan istilah **Array**. Meskipun Python menyebutnya sebagai "List" dan memiliki kemewahan yang jauh lebih praktis, secara teori logikanya sama persis: *sebuah kumpulan variabel terstruktur*. Python sendiri juga punya alat data lain yang lebih rumit, tapi cukup pahami List dulu untuk saat ini.

Untuk mengambil salah satu isi di keranjang belanja, kita perlu nomor lacinya (indeks). Sekali lagi, ingat bahwa **Python dan komputer mulai menghitung dari angka 0, bukan 1.**

```python
# Mengambil "Susu", yaitu isi paling pertama!
print(keranjang_belanja[0])

# Mengambil "Roti", yaitu isi pada urutan ketiga (indeks 2)
print(keranjang_belanja[2])
```

Coba jalankan blok ini. Apa yang tercetak?
```python
hero = ["Warrior", "Mage", "Archer"]
print(hero[1])
```
Benar! Hasilnya "Mage".

## Menambahkan dan Mengubah Isi List

List bersifat luwes (*mutable*). Kamu bisa menimpa, menambah, dan menghapus isinya kapan saja!
Untuk menambah di bagian paling ekor, gunakan jurus rahasia `.append()`.

```python
tas = ["Buku", "Pulpen"]
# Memasukkan Penggaris ke daftar ujung list
tas.append("Penggaris")

print(tas)
```

Untuk mengubah item yang sudah ada, tunjuk nomor indeksnya dan timpa dengan `=` :
```python
warna = ["Merah", "Kuning", "Hijau"]
warna[1] = "Jingga" # Kuning diganti Jingga
```

## Ringkasan
- List `[]` digunakan untuk menyatukan banyak data menjadi 1 variabel utama.
- Posisi data dalam List disebut indeks. Selalu dimulai dari angka `0`.
- List bisa ditambah datanya menggunakan perintah sakti `.append(data_baru)`.
- Konsep terurut ini di bahasa komputer lain lebih terkenal dengan istilah *Array*.

Ayo tata barang-barang di checkpoint koleksi data ini! 👇
