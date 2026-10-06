---
title: "Fisika Game & Deteksi Tabrakan"
order: 3
course: "game-dev"
emoji: "⚡"
---

Bayangkan game Mario tanpa gravitasi—dia bakal lompat dan terbang terus ke angkasa! Untuk membuat game terasa nyata dan bisa dimainkan, kita harus memprogram hukum fisika buatan kita sendiri.

## Kenapa Ini Penting?
Tanpa fisika, game akan terasa kaku dan membosankan. Tanpa deteksi tabrakan (Collision Detection), karaktermu akan menembus tembok layaknya hantu. Ini adalah nyawa dari interaksi dalam game.

## Hukum Fisika Dunia Game

### 1. Kecepatan (Velocity) dan Gravitasi
Dalam dunia nyata, benda jatuh semakin cepat ke tanah. Di game, kita mensimulasikan ini dengan menambahkan nilai gravitasi ke kecepatan (Y-axis) setiap framenya.

```python
y_pos = 100
y_velocity = 0
gravity = 2

# Di dalam Game Loop (Update):
y_velocity = y_velocity + gravity # Kecepatan jatuh bertambah
y_pos = y_pos + y_velocity        # Posisi turun lebih cepat

print(f"Posisi Y sekarang: {y_pos}")
```

### 2. Deteksi Tabrakan (AABB)
Gimana komputer tahu kalau pelurumu mengenai musuh? Game menggunakan kotak kasat mata yang membungkus karakter, disebut **Bounding Box**.

Bentuk yang paling umum adalah **AABB** (Axis-Aligned Bounding Box). Logikanya simpel:
- Apakah sisi *Kanan* Kotak A melewati sisi *Kiri* Kotak B?
- Jika sisi-sisi saling menindih, berarti = **TABRAKAN!**

💡 **Hitbox & Hurtbox:**
Dalam game fighting, kotak untuk memukul disebut *Hitbox*, dan kotak area badan karakter yang bisa diserang disebut *Hurtbox*.

## Ringkasan
- Game membutuhkan **Gravitasi** dan **Velocity** agar pergerakan terasa dinamis.
- **Bounding Box (Kotak Tabrakan)** adalah cara sistem mengetahui objek saling bersentuhan.
- **AABB** adalah metode paling umum dan ringan untuk mendeteksi tabrakan 2D.

Fisika sudah ada, tabrakan sudah aman. Tapi kok gamenya kerasa terlalu gampang ya? Nah, di sinilah seni *Balancing* masuk!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
