---
title: "Hierarki UI: Semua Adalah Widget"
order: 2
course: "mobile"
emoji: "📐"
---

Jika kamu pernah main *Minecraft* atau menyusun blok Lego, maka kamu akan langsung jago Flutter. Di Flutter, tidak ada yang namanya file HTML khusus atau CSS khusus. Layar, tombol, teks, hingga spasi kosong... **Semuanya Adalah Widget!**

## Kenapa Ini Penting?
Memahami cara kerja *Widget* adalah syarat mutlak di Flutter. Tanpa paham cara menyusun tumpukan widget ini (Widget Tree), desain layarmu akan berantakan dan ukuran teksnya bisa keluar dari batas layar HP!

## Membangun Pohon Widget (Widget Tree)

Sebuah aplikasi Flutter layaknya ranting pohon yang bercabang-cabang (Tree). 
- Layar utamanya adalah Widget `Scaffold` (Pondasi rumah).
- Di dalamnya ada `AppBar` (Atap / Header).
- Di tengahnya ada `Body` (Ruang tamu).

### Layout Dasar Andalan
Karena layar HP itu kecil, kita harus cermat menyusun tata letak barang-barang di dalamnya. Ini 3 Widget sakti untuk menyusun layout:

1. **Row (Baris):** Menyusun widget ke *Samping* (Kiri ke Kanan). Cocok untuk jejeran menu ikon.
2. **Column (Kolom):** Menyusun widget ke *Bawah* (Atas ke Bawah). Cocok untuk form login (Teks, lalu inputan, lalu tombol di bawahnya).
3. **Stack (Tumpuk):** Menyusun widget *Bertumpuk seperti kue lapis* (Depan - Belakang). Cocok untuk membuat foto profil yang ujungnya diberi ikon bulatan kecil "Online".

### Mencegah Layar Pecah (Overflow)
Pernah lihat error kotak kuning-hitam garis-garis di aplikasi Flutter? Itu artinya layar HP-mu kepenuhan!
Untuk mengatasinya, bungkus `Column`-mu dengan widget sakti bernama **`ListView`** atau **`SingleChildScrollView`**. Secara ajaib, layarmu kini bisa di-*scroll* (gulir) ke bawah!

```dart
// Contoh pseudocode struktur Widget Tree sederhana
Scaffold(
  appBar: AppBar(title: Text("Judul App")),
  body: Column(
    children: [
      Text("Halo!"),
      Row(
        children: [
          Icon(Icons.star),
          Text("Rating Bintang 5")
        ]
      )
    ]
  )
)
```
💡 **Wawasan: Padding itu Widget!**
Di web/CSS, padding (jarak ke dalam) adalah *style*. Tapi di Flutter, **Padding** adalah sebuah Widget utuh yang tugasnya "memeluk" widget anak di dalamnya agar tidak terlalu mepet ke pinggir layar. Ajaib kan?

## Ringkasan
- Di Flutter, setiap komponen UI di layar HP disebut dengan **Widget**.
- Susunan layoutnya bekerja seperti pohon yang bercabang, disebut **Widget Tree**.
- Tiga fondasi layout utama: **Row** (horizontal), **Column** (vertikal), dan **Stack** (menumpuk Z-axis).
- Gunakan **ListView** agar layar bisa di-scroll saat kontennya melebihi tinggi layar HP.

Desain layarmu sudah cantik, tapi tombolnya diklik kok nggak bereaksi? Nah, ayo berikan 'Nyawa' lewat materi State Management!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
