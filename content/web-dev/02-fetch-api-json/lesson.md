---
title: "Mengambil Data Luar: Fetch API & JSON"
order: 2
course: "web-dev"
emoji: "📡"
---

Pernah melihat sebuah *widget* di website yang menampilkan suhu cuaca saat ini atau daftar harga crypto yang terus berubah tiap detiknya? Darimana website itu mendapatkan datanya? Mereka "meminjam" data dari server lain menggunakan **API (Application Programming Interface)**.

## Kenapa Ini Penting?
Dunia web saling terhubung. Daripada kamu pusing mendata harga Bitcoin tiap detik, kamu cukup "memanggil" sistem pencatat bursa dan menampilkan datanya di websitemu. Kemampuan memanggil data ini adalah inti dari aplikasi modern (Web App).

## Format Kurir Data: JSON

Ketika websitemu meminta data dari server, server membalas dengan sebuah paket teks yang terstruktur rapi. Format paling populer saat ini adalah **JSON (JavaScript Object Notation)**. Bentuknya sangat mirip dengan Object di JavaScript:

```json
{
  "nama": "Naruto Uzumaki",
  "desa": "Konoha",
  "misi_selesai": 150
}
```

## Memanggil Kurir: Fetch API

Untuk mengambil data (request) dari server seberang, JavaScript menyediakan fungsi bawaan bernama `fetch()`. Tapi ingat, pengiriman data butuh *waktu* (seperti menunggu abang kurir paket datang). Kita tidak boleh membuat *browser* macet selama menunggu!

Oleh karena itu, kita menggunakan metode **Async/Await** (Asinkron).

```javascript
// Fungsi ini diberi label 'async' karena ada proses menunggu
async function ambilDataCuaca() {
  try {
    // 1. Await (Tunggu) kurirnya datang membawa respon
    const respon = await fetch("https://api.cuaca-contoh.com/hari-ini");
    
    // 2. Await (Tunggu) paket responnya dibongkar menjadi bentuk JSON
    const dataJSON = await respon.json();
    
    // 3. Tampilkan datanya
    console.log("Suhu hari ini:", dataJSON.suhu, "derajat");
  } catch (error) {
    console.log("Gagal mengambil data cuaca!", error);
  }
}
```

💡 **Wawasan: HTTP Method GET & POST**
Secara default, `fetch()` menggunakan metode **GET** (hanya mengambil data). Jika kamu ingin mengirimkan data pendaftaran ke server, kamu menggunakan metode **POST** (mengirim data).

## Ringkasan
- **API** adalah cara websitemu berbicara dengan sistem/server lain.
- Data yang dipertukarkan biasanya berformat teks terstruktur bernama **JSON**.
- Gunakan fungsi `fetch()` untuk meminta data dari luar.
- Karena pengambilan data butuh waktu, gunakan pola asinkron **async / await** agar website tidak *freeze* (macet) saat menunggu respon server.

Kini websitemu punya akses ke data seluruh dunia!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
