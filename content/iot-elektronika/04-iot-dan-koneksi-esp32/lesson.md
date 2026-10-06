---
title: "IoT: Menghubungkan Alat ke Internet"
order: 4
course: "iot-elektronika"
emoji: "📡"
---

Gimana caranya kamu bisa mematikan AC kamar dari luar kota pakai HP? Atau menyiram tanaman saat kamu lagi liburan? Selamat datang di era **IoT (Internet of Things)**!

## Kenapa Ini Penting?
Elektronik tanpa koneksi internet hanya pintar secara lokal. Dengan IoT, jangkauannya menjadi tak terbatas. Kamu bisa memonitor rumah dari belahan dunia lain secara *Real-Time*.

## Otak Baru: Modul ESP32

Arduino biasa tidak punya antena WiFi. Tapi tenang, kita punya mikrokontroler canggih bernama **ESP32** (atau adiknya ESP8266). Modul ini sangat sakti karena:
1. Punya pin I/O persis kayak Arduino.
2. Ukurannya sekecil jempol orang dewasa.
3. **Punya modul WiFi dan Bluetooth bawaan!**

### Cara Kerja IoT (Protokol HTTP & MQTT)

ESP32 yang terhubung ke WiFi rumahmu bisa bertukar pesan dengan "Cloud" (Server di internet). Ada dua cara utama:

1. **HTTP (Request & Response):** Cara kerja standar browser. ESP32 minta data ke server, server membalas. Cocok untuk data yang tidak butuh super instan.
2. **MQTT (Pub-Sub):** Protokol spesial IoT yang sangat ringan. Ibarat Grup Chat. 
   - Sensor Suhu mengirim (Publish) pesan: "Suhu 35°C!".
   - HP kamu yang sudah berlangganan (Subscribe) ke grup itu, langsung menerima notifikasi seketika (Real-Time).

### Arsitektur Sistem IoT
Bentuk utuhnya kira-kira begini:
`Sensor (Kamar) ➔ ESP32 ➔ WiFi Router ➔ Server Cloud ➔ HP Kamu (Internet)`

💡 **Wawasan: Platform Cloud IoT**
Kamu tidak perlu merakit Server Cloud sendiri dari nol! Banyak platform gratis untuk belajar IoT seperti *Blynk*, *Thingspeak*, atau *Firebase* yang sudah menyediakan aplikasi *dashboard* di HP.

## Ringkasan
- **IoT (Internet of Things)** adalah konsep menghubungkan benda mati (Things) ke internet agar bisa dipantau dan dikendalikan jarak jauh.
- **ESP32** adalah mikrokontroler populer karena sudah dibekali WiFi bawaan.
- **MQTT** adalah metode komunikasi (protokol) ringan bergaya grup chat (Publish & Subscribe) yang sangat cepat untuk alat IoT.
- Komunikasi IoT selalu melibatkan alat fisik, jaringan WiFi, Cloud Server, dan antarmuka pengguna (HP/Laptop).

Kamu sudah paham semua puzzlenya! Mari kita rangkai menjadi sebuah proyek besar di modul terakhir!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
