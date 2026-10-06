---
title: "Proyek Mini & Langkah Lanjut"
order: 9
course: "python-dasar"
emoji: "🏆"
---

Wow, luar biasa! 🎉 Kamu telah mencapai ujung tombak course Pemrograman Dasar Python di RIT Academy. Kamu telah menempuh perjalanan dari sekadar menata blok-blok algoritma, mencetak "Halo", menguasai logika if-else, menjalankan perulangan, hingga menggunakan alat profesional seperti Fungsi dan List (Array).

Kamu secara resmi telah menanamkan otak **Computational Thinking**!

## Mini Proyek Akhir: Tebak Angka Rahasia!

Mari gabungkan semua senjata (Variabel + Input + Logika Kondisi + Loop) ke dalam sebuah kode mini-game interaktif utuh. Silakan pelajari baris per baris bagaimana sebuah alur program mini terbentuk.

```python
# Game Tebak Angka
angka_rahasia = 7
nyawa = 3

print("🔥 Selamat Datang di Game Tebak Angka 🔥")
print("Tebak angka antara 1 sampai 10!")

# Kita pakai Loop untuk terus mengulang permainan selama nyawa pemain belum habis
while nyawa > 0:
    print("Sisa nyawa:", nyawa)
    tebakan = input("Masukkan tebakanmu: ")
    tebakan = int(tebakan) # Jangan lupa, string harus dikonversi jadi integer
    
    # Percabangan if-else untuk mengecek tebakan
    if tebakan == angka_rahasia:
        print("🎉 TEPAT SEKALI! Kamu menaklukkan game ini!")
        break # Perintah khusus untuk menjebol/menghentikan paksa loop while
    elif tebakan > angka_rahasia:
        print("Tebakanmu terlalu besar.")
        nyawa = nyawa - 1 # Kurangi nyawa perlahan
    else:
        print("Tebakanmu terlalu kecil.")
        nyawa = nyawa - 1

# Cek hasil akhir, jika loop terhenti karena nyawa terkuras (nyawa = 0)
if nyawa == 0:
    print("💀 GAME OVER! Angka rahasianya adalah", angka_rahasia)
```
Tentu saja di program sesungguhnya (menggunakan modul *Random* milik Python), angka_rahasia tidak akan ditulis gamblang `7` agar programnya seru dimainkan!

---

## Katalog Rekomendasi 🚀: Kemana Peta Jalan Selanjutnya?

RIT Academy Course (seperti Web Dasar, Python Dasar) ini dirancang sebagai landasan (Launchpad). Jika kamu merasa "Ternyata ngoding itu logis dan nagih ya!", inilah beberapa peta jalan yang bisa menuntun hobi atau karirmu ke depannya:

### 1. 🌐 Jalur Web Developer (Frontend & Backend)
Kamu ingin karyamu diakses jutaan orang di internet lewat link URL?
- **Mulailah dari:** Course "Web Dasar" di RIT Academy (Pelajari fondasi HTML dan CSS layout).
- **Langkah berikutnya:** Belajar bahasa JavaScript untuk menggerakkan tampilan. 
- **Referensi luar:** Cek pedoman jalan terbaik sedunia di [roadmap.sh/frontend](https://roadmap.sh/frontend) dan channel YouTube **Web Programming Unpas (WPU)**.

### 2. 🎮 Jalur Game Developer
Naluri menciptakan interaksi visual, musuh, poin, dan animasi memanggilmu? Logika Python yang baru kamu kuasai akan terpakai dengan sangat mulus di jalur ini!
- **Alat utama:** Coba unduh dan pelajari **Godot Engine** (gratis & ringan). Godot memiliki bahasa penggerak *"GDScript"* yang nyaris 90% identik dengan sintaks Python!
- **Pilihan 2D di Python:** Kamu juga bisa mempelajari framework library **Pygame** di Python murni.

### 3. 🤖 Jalur Data Science & Artificial Intelligence (AI)
Ini adalah dunia sihir abad ke-21. Kamu tertarik bagaimana ChatGPT bekerja atau menganalisa tren grafik angka saham?
- **Python adalah rajanya:** Python mendominasi bidang ini sepenuhnya secara global.
- **Langkah berikutnya:** Mulai kenalan dengan library **Pandas** (untuk mengolah tabel data) dan **Matplotlib** (untuk menggambar grafik cantik dari angka).
- **Kaggle:** Buat akun di [Kaggle.com](https://kaggle.com) untuk belajar kursus data gratis dan menantang dirimu.

Apapun yang kamu pilih, ingatlah:
> "Error dan Bug (kerusakan kode) itu BUKAN tanda kegagalan. Error adalah teman terbaik seorang programmer yang jujur memberi tahu di bagian mana kamu bisa belajar hal baru."

Terus eksplorasi, hancurkan kode dengan rasa penasaran, dan *Happy Coding*! 👇
