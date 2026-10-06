---
title: "Proyek Nyata: Sistem Monitoring Cerdas"
order: 5
course: "iot-elektronika"
emoji: "🏆"
---

Selamat! Kamu sudah paham listrik dasar, logika mikrokontroler, pembacaan sensor, hingga cara mengirim datanya ke internet. Saatnya merangkum semuanya menjadi desain Arsitektur Sistem Pintar!

## Kenapa Ini Penting?
Di dunia kerja, klien tidak akan memintamu "menyalakan lampu". Mereka akan memintamu memecahkan masalah: "Gimana caranya agar kebun anggrek saya suhunya selalu stabil meski saya lagi dinas luar kota?". Kamu harus bisa mendesain solusinya dari hulu ke hilir.

## Studi Kasus 1: Smart Greenhouse

**Masalah:** Tanaman mati karena kepanasan dan tidak disiram saat pemiliknya pergi.

**Desain Arsitektur (Solusi IoT):**
1. **Input (Sensor):** Pasang sensor suhu (DHT11) dan sensor kelembapan tanah di pot.
2. **Brain (Mikrokontroler):** Gunakan ESP32 untuk membaca kedua sensor tadi setiap 5 menit.
3. **Logika Lokal (Otomatisasi):** 
   - *Jika Suhu > 30°C ➔ Nyalakan Kipas Angin.*
   - *Jika Tanah Kering ➔ Nyalakan Pompa Air.*
4. **Cloud & Output Jauh:** ESP32 mengirim laporan suhu terbaru via MQTT ke Server. Pemilik bisa melihat grafik suhu di aplikasi *Blynk* di HP-nya dari luar kota.

## Studi Kasus 2: Alarm Kebakaran Otomatis (Smart Home)

**Masalah:** Rumah sering kosong, bahaya kebakaran tidak terdeteksi sejak awal.

**Desain Arsitektur (Solusi IoT):**
1. **Input:** Sensor Asap (MQ-2) dan Sensor Api (Flame Sensor) diletakkan di dapur.
2. **Brain:** Modul ESP32 tersambung ke router rumah.
3. **Logika Lokal:** *Jika terdeteksi asap pekat ➔ Bunyikan Buzzer (Alarm fisik) sangat keras.*
4. **Cloud & Output Jauh:** ESP32 mem-*publish* peringatan darurat ke Cloud. Server Cloud otomatis mengirim notifikasi/pesan Telegram ke HP pemilik rumah!

💡 **Wawasan: Edge Computing vs Cloud Computing**
Pengecekan logika "Jika ada api, bunyikan alarm" sebaiknya ditaruh di *dalam* ESP32 (disebut *Edge Computing*), BUKAN di Cloud. Kenapa? Karena jika internet rumah mati, alarm fisik harus tetap bisa berbunyi seketika!

## Ringkasan
- Membangun sistem IoT nyata dimulai dari merumuskan masalah, lalu mendesain arsitektur dari **Sensor ➔ Mikrokontroler ➔ Cloud ➔ User**.
- Logika otomatisasi kritis (seperti alarm kebakaran) harus dijalankan secara lokal di alat (Edge) agar tetap bekerja walau internet putus.
- Cloud berfungsi sebagai perekam data jangka panjang dan pengirim laporan jarak jauh.

Kamu sekarang sudah punya kerangka berpikir layaknya System Engineer kelas dunia. Siap merakit ide gilamu sendiri?

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
