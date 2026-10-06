---
title: "Variabel & Kotak Data"
order: 3
course: "python-dasar"
emoji: "📦"
---

Bayangkan kamu sedang memainkan game RPG. Layar menampilkan "Nama Player: Arthur", "Nyawa: 100", dan status "Poisoned: False". Bagaimana cara game tersebut menyimpan semua data ini? Komputer menyimpan informasi dalam sesuatu yang disebut **Variabel**.

## Kenapa Ini Penting?

Sebuah program pasti memproses data. Kalau kita tidak punya tempat untuk "menampung" dan melabeli data tersebut, kita tidak bisa menggunakannya di tahap selanjutnya. Pemahaman yang kuat tentang bagaimana data disimpan dan apa jenisnya sangat krusial agar perhitungan dan logika kita tidak berujung error.

## Variabel: Laci Berlabel

Kamu bisa membayangkan variabel seperti sebuah *kardus atau laci berlabel*. Kamu memberi nama lacinya (label) dan menaruh barang di dalamnya (data). Saat kamu butuh data itu, kamu cukup memanggil nama lacinya.

Membuat variabel di Python itu sangat gampang. Cukup tulis namanya, beri tanda sama dengan `=`, dan isi nilainya.

```python
# Membuat laci berlabel 'nama' yang berisi teks
nama = "Arthur"

# Membuat laci berlabel 'nyawa' yang berisi angka
nyawa = 100

print(nama)
print(nyawa)
```

**Aturan Penamaan:** Nama variabel tidak boleh pakai spasi (biasanya pakai garis bawah/underscore `_`) dan tidak boleh diawali dengan angka. 

## Jenis-Jenis Barang (Tipe Data)

Sama seperti laci baju dan laci piring berbeda fungsinya, di Python kita juga punya **Tipe Data**. Komputer harus tahu benda apa yang sedang ia pegang:
1. **String (`str`):** Teks. Cirinya selalu pakai tanda kutip (`"Halo"`, `'Apel'`).
2. **Integer (`int`):** Angka bulat, bisa positif atau negatif (`10`, `500`, `-3`). Tanpa tanda kutip!
3. **Float (`float`):** Angka desimal. Di Python, koma desimal menggunakan titik (`3.14`, `9.5`).
4. **Boolean (`bool`):** Nilai kebenaran mutlak. Hanya ada dua: `True` (Benar) atau `False` (Salah). Wajib huruf besar di depannya.

Coba buat dan mainkan variabelmu di bawah ini:

```python
nama_player = "Budi"
level = 5
health = 90.5
is_alive = True

print("Player:", nama_player)
print("Level saat ini:", level)
```

## Ringkasan
- **Variabel** adalah nama tempat penyimpanan sementara (seperti laci) untuk sebuah data.
- **Tipe data** menentukan jenis isinya: teks (String), angka bulat (Integer), angka desimal (Float), dan kebenaran (Boolean).
- Angka bulat dan desimal ditulis tanpa tanda kutip. Jika angka diberi kutip (misal `"100"`), komputer akan menganggapnya sebagai teks yang tidak bisa ditambah atau dikali selayaknya angka biasa.

Mari uji pemahamanmu tentang tipe data pada checkpoint ini! 👇
