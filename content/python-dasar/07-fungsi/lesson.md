---
title: "Merapikan Kode dengan Fungsi"
order: 8
course: "python-dasar"
emoji: "⚙️"
---

Di kontrol stik PlayStation, ada satu tombol kotak kecil yang saat dipencet akan menyuruh jagoanmu loncat sambil mengeluarkan serangan spesial ganda berturut-turut. Bayangkan kalau tidak ada tombol itu — kamu harus menekan kombinasi rumit "Atas, Bawah, R1, Segitiga" berulang-ulang dengan cepat. Repot! Di pemrograman, kita bisa membuat tombol pintas atau membungkus perintah rumit itu ke dalam sebuah **Fungsi (Function)**.

## Kenapa Ini Penting?

Programmer yang andal menjunjung filosofi **DRY** (*Don't Repeat Yourself* / Jangan Mengulang Dirimu Sendiri). Kalau kamu menulis blok kode perhitungan atau blok sapaan yang sama berkali-kali di baris atas dan baris paling bawah, kodemu menjadi penuh sesak dan sangat sulit diperbaiki. Fungsi membuat alur kode menjadi modular (layaknya keping blok lego independen), rapi, serta dapat dipakai berulang-ulang kapan saja.

## Membuat dan Memanggil Fungsi

Kita menggunakan kata kunci `def` (dari kata mendefinisikan) untuk membungkus perintah.

```python
def sapaan_pagi():
    print("Selamat Pagi!")
    print("Semoga hari TCC-mu menyenangkan.")
```
Menulis blok `def` di atas **belum menjalankan apapun**, ia hanya membuat "tombol" atau "alatnya" saja. Untuk membuat alat itu berjalan, kamu harus menekan tombol (memanggil namanya):

```python
sapaan_pagi() # Panggilan pertama
sapaan_pagi() # Dipanggil lagi, dia akan mencetak sapaan yang sama!
```

## Parameter & Return

Fungsi tidak hanya digunakan untuk mencetak benda diam. Fungsi yang hebat bertindak ibarat *mesin penggiling*. Kita masukkan bahan mentah (**Parameter/Argumen**), diproses oleh mesin fungsi tersebut, dan dia mengembalikan bahan jadi (**Return**).

```python
# 1. Parameter `panjang` dan `lebar` bertindak sebagai celah masukan fungsi
def hitung_luas_persegi(panjang, lebar):
    luas = panjang * lebar
    # 2. Kata Return ibarat fungsi melemparkan "hasil akhir" kembali kepada si pemanggil fungsi
    return luas 

# 3. Lempar bahan (10 dan 5), tangkap hasilnya di wadah variabel hasil_perhitungan
hasil_perhitungan = hitung_luas_persegi(10, 5)

print("Total luas tanah adalah:", hasil_perhitungan)
```

**Kenapa harus `return` dan tidak langsung `print`?** 
Kalau kita hanya mem-*print* (mencetak ke layar), nilai perhitungan tersebut akan lenyap! Teks di layar itu benda mati. Namun jika menggunakan `return`, fungsi benar-benar melemparkan *data murni* yang bisa disimpan ke variabel lain, bisa ditambah dengan bilangan lain lagi, atau bisa diselipkan ke perulangan lain.

## Ringkasan
- Fungsi membungkus serangkaian perintah sehingga kita bisa memanggil ulang nama pintasannya tanpa harus copy-paste blok.
- Python memakai syntax awalan `def nama_fungsi():`.
- *Parameter* memberikan data dari luar untuk masuk diolah oleh Fungsi.
- *Return* membangkitkan nilai output kembali kepada kode yang memanggilnya, ketimbang sekadar membuangnya di layar.

Sudah siap jadi programmer efisien? Coba tugas fungsi ini! 👇
