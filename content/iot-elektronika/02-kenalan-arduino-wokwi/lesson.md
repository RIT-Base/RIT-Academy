---
title: "Logika I/O & Simulasi Wokwi"
order: 2
course: "iot-elektronika"
emoji: "🤖"
---

Pernah lihat pintu minimarket yang otomatis terbuka saat kamu mendekat? Pintu itu tidak ajaib, ia digerakkan oleh "Otak" kecil bernama **Mikrokontroler**. Dan otak yang paling gampang dipelajari pemula adalah Arduino!

## Kenapa Ini Penting?
Rangkaian listrik biasa hanya bisa On dan Off secara manual. Dengan Mikrokontroler, kita bisa memprogram KAPAN dia On, KAPAN dia Off, dan dalam KONDISI apa. Inilah awal mula alat menjadi "Pintar".

## Mikrokontroler: Otak Mungil

Papan Arduino (misalnya Arduino Uno) punya banyak colokan kecil di pinggirnya yang disebut **Pin**.
- **Input (Telinga/Mata):** Menerima sinyal dari dunia luar (contoh: tombol ditekan, sensor cahaya).
- **Output (Tangan/Kaki):** Mengirim perintah keluar (contoh: menyalakan lampu, membunyikan alarm).

Dalam kode, kita menentukan apakah sebuah Pin itu jadi Input atau Output menggunakan instruksi `Pin Mode`. Lalu kita memerintahkannya nyala atau mati dengan `Digital Write` (Kirim Listrik 5V = Nyala/HIGH, Potus Listrik = Mati/LOW).

### Wokwi: Merakit Tanpa Beli Alat!
Beli alat itu mahal dan rawan rusak kalau salah colok. Solusinya? **Wokwi** (wokwi.com)! 

Ini adalah platform *simulator* langsung di browsermu. Kamu bisa narik kabel, pasang lampu, dan tulis kode program (bahasa C++), lalu klik "Play". Kalau kamu salah pasang kabel tanpa resistor, lampu LED di layar akan meledak virtual! Sangat aman untuk belajar.

💡 **Logika Delay:**
Mikrokontroler berpikir jutaan kali dalam sedetik. Kalau kamu bilang "Nyala lalu Mati", matamu tidak akan sempat melihat lampunya berkedip karena terlalu cepat! Kita butuh perintah `Delay` (Jeda) untuk memperlambatnya agar bisa dilihat manusia.

## Ringkasan
- **Mikrokontroler** (seperti Arduino) adalah otak yang bisa diprogram.
- Papan ini memiliki **Pin** yang diset sebagai **Input** (menerima) atau **Output** (mengirim).
- Mengontrol nyala/mati lampu disebut `Digital Write` (HIGH / LOW).
- Gunakan simulator **Wokwi** untuk belajar merakit rangkaian tanpa takut merusak komponen asli!

Kita sudah punya otaknya. Sekarang, mari pasang indera perasa ke otak tersebut dengan Sensor!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
