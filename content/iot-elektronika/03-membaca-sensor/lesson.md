---
title: "Membaca Dunia Nyata dengan Sensor"
order: 3
course: "iot-elektronika"
emoji: "🌡️"
---

Mikrokontroler pada dasarnya buta dan tuli. Ia tidak tahu apakah ruangan gelap, suhu sedang panas, atau ada pencuri yang lewat. Ia membutuhkan "Mata" dan "Telinga". Di sinilah peran **Sensor** masuk!

## Kenapa Ini Penting?
Elektronika pintar selalu berdasarkan reaksi. Tanpa sensor, sistemmu tidak akan pernah tahu kapan harus bereaksi. Memahami cara alat membaca lingkungan adalah langkah terpenting dalam membuat sistem yang mandiri (otomatis).

## Jenis Sinyal: Digital vs Analog

Dunia kita ini tidak sekadar "Hitam" dan "Putih". 

1. **Sensor Digital:** Mengirim jawaban tegas: YA atau TIDAK (1 atau 0).
   - *Contoh:* Tombol ditekan (YA/TIDAK)? Sensor gerak (Ada orang / Tidak ada orang)?
2. **Sensor Analog:** Mengirim nilai berjenjang (gradasi).
   - *Contoh:* Seberapa terang cahayanya (nilai 0 sampai 1023)? Seberapa panas suhunya (20°C, 25°C, 30°C)? 

### Komponen Sensor Populer:
- **LDR (Light Dependent Resistor):** Sensor cahaya. Makin terang, nilainya berubah. Dipakai buat lampu jalan otomatis.
- **Ultrasonik (Sensor Jarak):** Punya 2 mata mirip kacamata Wall-E. Dia menembakkan suara dan menghitung waktu pantulannya. Dipakai di sensor parkir mobil.
- **DHT11:** Sensor untuk mengukur Suhu dan Kelembapan ruangan.

### Menggabungkan Logika IF (Jika... Maka...)
Setelah sensor membaca data, kita perintahkan mikrokontroler menggunakan logika `If` (Jika) ke Output (Aktuator).

```python
# Simulasi Logika Sensor Jarak Parkir
jarak_tembok = 15 # dalam centimeter

if jarak_tembok < 20:
    print("ALARM BUNYI: TIT TIT TIT!")
else:
    print("Aman, mundur terus...")
```

💡 **Wawasan: Output Fisik (Aktuator)**
Selain Lampu LED, output (Aktuator) yang sering dipakai adalah Buzzer (menghasilkan bunyi bip/alarm), Motor Servo (menggerakkan palang pintu parkir), atau Relay (saklar besar untuk menyalakan pompa air sungguhan!).

## Ringkasan
- **Sensor** bertugas menerjemahkan kondisi fisik (suhu, cahaya, jarak) menjadi data listrik.
- Sinyal **Digital** hanya merespon Ya/Tidak. Sinyal **Analog** membaca rentang nilai yang bervariasi.
- Otak (Mikrokontroler) menggunakan logika **IF (Jika)** untuk memproses data sensor dan memicu tindakan di Aktuator (contoh: Alarm).

Keren! Kamu sudah bikin alat yang "hidup" dan bisa bereaksi. Langkah terakhir: Sambungkan ke Internet biar jadi IoT!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
