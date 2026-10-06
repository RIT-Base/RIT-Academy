---
title: "Jantung Game: Logika Game Loop & State"
order: 2
course: "game-dev"
emoji: "🔄"
---

Pernah kepikiran gimana game bisa merespon pencetan tombolmu secara instan sambil menggerakkan musuh dan menghitung skor di waktu yang bersamaan? Rahasianya ada di satu putaran tak berujung yang disebut **Game Loop**. Ibarat jantung yang terus berdetak, Game Loop menjaga dunia game tetap hidup.

## Kenapa Ini Penting?
Semua video game modern—dari game 2D sederhana hingga AAA 3D yang megah—mengandalkan konsep Game Loop. Kalau kamu paham konsep ini, kamu sudah memegang kunci utama cara kerja sebuah game engine!

## Cara Kerja Game Loop

Pada dasarnya, Game Loop memutar 3 tahap utama ini berulang-ulang, biasanya 60 kali dalam satu detik (60 FPS - *Frames Per Second*)!

1. **Input (Dengar):** Memeriksa apakah pemain menekan tombol keyboard, mouse, atau layar sentuh.
2. **Update (Pikir):** Menghitung logika game. Misalnya: mengubah posisi karakter, mengecek apakah musuh kena tembak, atau mengurangi HP.
3. **Render (Gambar):** Menggambar ulang seluruh layar dengan posisi terbaru dari semua objek.

### State Karakter
Selain Loop, game butuh *State* (Kondisi). Misalnya, karaktermu tidak mungkin bisa jalan dan jongkok di saat bersamaan, kan?

💡 **State Machine:**
Game menggunakan *State Machine* untuk mengatur kondisi. Contoh State karakter: `Idle` (diam), `Walk` (berjalan), `Jump` (melompat).

```python
# Simulasi sederhana logika Game Loop dan State
def update_game(input_pemain, state_karakter):
    if input_pemain == "lompat" and state_karakter == "Idle":
        return "Jump"
    elif input_pemain == "kanan":
        return "Walk"
    return "Idle"

print(update_game("lompat", "Idle")) # Output: Jump
```

## Ringkasan
- **Game Loop** adalah jantung game yang berjalan berulang-ulang tanpa henti.
- 3 tahapan utamanya: **Input**, **Update**, dan **Render**.
- **State** digunakan untuk mengetahui kondisi objek (seperti karakter sedang diam atau melompat).

Sekarang kita sudah punya dunia yang "hidup", langkah selanjutnya adalah membuat aturan fisika untuk dunia tersebut!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
