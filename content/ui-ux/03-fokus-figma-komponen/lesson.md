---
title: "Mastering Figma: Frame, Auto Layout & Komponen"
order: 3
course: "ui-ux"
emoji: "📐"
---

Dulu, orang mendesain web pakai Adobe Photoshop. Hasilnya? File yang berat, lambat, dan menyiksa saat harus berkolaborasi dengan *Programmer*. Lalu muncullah **Figma** — sebuah aplikasi desain berbasis web yang mengubah standar industri selamanya.

## Kenapa Ini Penting?
Figma bukan sekadar aplikasi menggambar; Figma diciptakan persis mengikuti cara *Programmer* memikirkan kode (ingat modul *Frontend Modern & Arsitektur Komponen*?). Jika kamu mendesain di Figma dengan fitur Komponen & Auto Layout, *Programmer* akan menangis terharu saat membedah desainmu.

## Fitur Sakti Figma

### 1. Frame bukan Sekadar Grup
Di aplikasi lain, kamu biasa menyatukan beberapa objek menggunakan fitur `Group` (CTRL+G). Di Figma, **JANGAN GUNAKAN GROUP!** Gunakan **Frame**.
- *Grup:* Hanya membungkus objek, bentuk bungkusnya akan memelar dan menyusut mengikuti objek di dalamnya.
- *Frame:* Ini seperti sebuah bingkai layar / Kanvas kecil. Ia punya batas tegas, bisa memotong (Clip) gambar yang keluar batas, dan punya grid sendiri. Layar HP Android-mu di Figma itu adalah sebuah *Frame*.

### 2. Auto Layout (Desain Responsif Otomatis)
Pernah mendesain tombol, lalu saat nama tombolnya diganti dari "OK" ke "Kirim Sekarang", kotaknya kekecilan sehingga teksnya tembus keluar batas? 
Di Figma, fitur **Auto Layout** (SHIFT+A) menyihir kotak tersebut agar melar otomatis menyesuaikan isi panjang teksnya! Jarak spasi atas-bawah (*Padding*) akan terus terkunci konsisten. (Ini sama persis dengan konsep Flexbox di CSS Web).

### 3. Keajaiban "Component" (Lego Master)
Bayangkan kamu mendesain 50 halaman, dan di semua halaman ada tombol "Home" berwarna Biru. Suatu hari Klien bilang: *"Tolong ganti warna tombol Home di seluruh 50 halaman itu jadi Merah ya."* 
Mati kau! Kamu harus ganti satu-satu? TENTU TIDAK!

Kamu harus menjadikan tombol Home itu sebagai **Main Component** (Pusat Cetakan Lego) sebelum menaruhnya di 50 halaman tadi (disebut *Instance / Kloningan*).
Jika kamu mengubah warna cetakan utama (*Main Component*) menjadi merah, SELURUH 50 anak tombol *Instance*-nya akan otomatis berubah merah detik itu juga!

💡 **Wawasan: Design Tokens**
Perusahaan besar menggunakan variasi Komponen canggih. Jika kamu membuat cetakan tombol, kamu bisa memberi tombol itu opsi *State* di panel kanan (misal opsi status: "Normal", "Ditekan", "Mati/Disabled"). Sehingga *Programmer* tahu persis warna apa yang harus muncul saat *mouse* diklik.

## Ringkasan
- Tinggalkan kebiasaan kuno menggunakan *Group*. Mulailah menggunakan **Frame** untuk membungkus elemen struktur karena frame lebih akurat merepresentasikan wadah layar dan kontainer kode.
- **Auto Layout** membuat elemen UI-mu pintar (bisa memanjang/menyusut otomatis menyesuaikan ukuran konten di dalamnya tanpa merusak *Padding* spasi).
- Fitur **Component** (Komponen) memungkinkan desainer membuat satu Cetakan Induk. Mengedit sang induk akan otomatis merubah seluruh bentuk hasil duplikat (Instance)-nya di penjuru halaman.

Desain visual (*High-Fidelity*) dan warna-warninya kini telah rapi! Tapi ini masih gambar statis (mati). Mari kita hidupkan layarnya dengan menyambung-nyambungkannya di fitur *Prototype*!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
