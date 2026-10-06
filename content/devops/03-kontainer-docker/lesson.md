---
title: "Kontainerisasi dengan Docker"
order: 3
course: "devops"
emoji: "🐳"
---

Pernah berdebat dengan teman kerjamu: *"Loh, kodingannya di laptopku jalan normal kok, kenapa pas dipindah ke laptopmu malah banyak pesan error??"*. 

Ini adalah penyakit abadi dunia *Software Engineering*. Alasannya? Karena di laptopmu ada program Python versi 3.10 dan ada database lengkap, sementara di laptop temanmu, Pythonnya versi lama dan belum pasang database. Lingkungannya (Environment) tidak sama!

## Kenapa Ini Penting?
Untuk memusnahkan kalimat horor *"It works on my machine"* dari muka bumi, lahir sebuah teknologi revolusioner bernama **Kontainer** (Container), dan **Docker** adalah penguasa terbesarnya. Docker memastikan kodemu dibungkus rapi beserta seluruh sistem bawaannya, sehingga ia PASTI JALAN di komputer mana pun tanpa sisa.

## Mesin Virtual vs Kontainer (Docker)

Zaman dulu, agar lingkungan (Environment) server aman, orang memecah 1 Server Besar menjadi 3 *Virtual Machine* (VM) menggunakan aplikasi seperti VirtualBox. Kekurangannya? Jika kamu bikin 3 VM, kamu harus menginstal 3 Windows lengkap di dalamnya. RAM komputermu akan menangis.

**Docker (Kontainer) Jauh Lebih Ringan!**
Docker tidak menginstal sistem operasi baru. Ia hanya meminjam "Inti/Jantung" OS milik laptop indukmu, lalu membungkus kodemu ke dalam "Kotak Kontainer" virtual yang kedap udara. Kotak A (Aplikasi Toko) tidak akan pernah mencampuri file di Kotak B (Database).

## Resep Rahasia: Dockerfile

Bagaimana cara kita membungkus aplikasi ke dalam Kotak Kontainer itu? Lewat file resep yang dinamakan `Dockerfile`.

Isinya berisi langkah-langkah robotik seperti ini:
```dockerfile
# 1. Tolong pinjam cetakan kotak yang sudah terinstal Python 3.10 ya!
FROM python:3.10

# 2. Bikin folder baru bernama /app di dalam kotaknya
WORKDIR /app

# 3. Kopi semua file ngodingku ke dalam kotak itu
COPY . .

# 4. Kalau sudah, tolong otomatis jalankan perintah ini ya di dalam kotak
CMD ["python", "app.py"]
```

Jika resep itu dimasak (istilahnya di-**Build**), ia akan menjadi **Image** (Cetakan Kue).
Cetakan Kue (`Image`) ini lalu bisa dikirimkan ke server. Server hanya tinggal menuangkan cetakan itu untuk menjadi **Container** (Kue Matang yang menyala).

## Ringkasan
- Docker diciptakan untuk mengatasi masalah perbedaan *Environment* antara laptop Developer dan Server produksi.
- Berbeda dengan *Virtual Machine (VM)* yang rakus memakan RAM karena harus menginstal seluruh OS, **Kontainer** jauh lebih gesit, ringan, dan cepat karena ia menumpang pada OS sang Induk Server.
- Resep teks langkah-langkah pembangunan aplikasi di dalam Docker disebut **Dockerfile**.
- Resep ini lalu di-Build menjadi **Image** (Cetakan utuh), yang saat dinyalakan/dieksekusi berubah fungsi disebut dengan wujud **Container** aktif.

Lingkungan server sudah sangat terjamin stabil karena Docker. Tapi capek kan kalau setiap kita mengupdate kodingan, kita harus masuk server sendiri untuk mereset dan mem-*build* ulang Docker-nya? Mari otomatisasi hal itu di materi CI/CD!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
