---
title: "Mindset White-Hat & Fondasi Linux"
order: 1
course: "cyber-security"
emoji: "🕵️"
---

Sering nonton film hacker di mana sang tokoh utama duduk di ruangan gelap, ngetik kenceng di terminal hitam-hijau, lalu tiba-tiba bilang: "I'm in." Kelihatan keren, ya? Tapi di dunia nyata, hacking bukan soal sihir ngetik cepat, melainkan tentang **rasa ingin tahu yang luar biasa** terhadap bagaimana sebuah sistem bekerja.

## Kenapa Ini Penting?
Sebelum belajar menyerang sebuah benteng, kamu harus paham dulu cara benteng itu dibangun dan hukum yang melindunginya. Menggunakan *skill* hacking tanpa izin adalah kejahatan serius. Di sini kita belajar menjadi *White-Hat Hacker* (Hacker Baik) yang dibayar untuk melindungi sistem, bukan merusaknya.

## Etika Hacker Putih (White-Hat)

Di dunia *Cybersecurity*, hacker dibagi berdasarkan "warna topi"-nya:
- **Black-Hat:** Jahat. Meretas tanpa izin untuk mencuri data atau memeras (Ransomware).
- **White-Hat (Pentester/Security Analyst):** Baik. Meretas perusahaan yang *telah menyewanya* secara legal untuk mencari titik lemah agar bisa diperbaiki sebelum diserang Black-Hat.
- **Grey-Hat:** Abu-abu. Iseng meretas sistem orang lalu melaporkannya (kadang minta imbalan). Statusnya tetap ilegal.

**Aturan Emas:** Jangan PERNAH melakukan eksploitasi, scanning, atau penyerangan ke website/server yang tidak kamu miliki atau tanpa **Izin Tertulis (Rules of Engagement)**.

## Fondasi Wajib: Linux Terminal

Hacker tidak menggunakan mouse. Mereka hidup di *Command Line Interface (CLI)* / Terminal. Mengapa? Karena 90% server di dunia ini menggunakan sistem operasi **Linux** versi layar hitam (Headless). 

### Perintah Bertahan Hidup di Linux:
1. `pwd` (Print Working Directory): "Sekarang aku lagi ada di folder mana ya?"
2. `ls` (List): "Ada file dan folder apa aja di sini?"
3. `cd` (Change Directory): "Aku mau masuk ke folder Rahasia." ➔ `cd Rahasia`
4. `cat` (Concatenate): "Tampilkan isi teks dari file sandi.txt!" ➔ `cat sandi.txt`
5. `grep` (Global Regular Expression Print): "Tolong cari kata 'password' di dalam file teks yang super panjang!" ➔ `cat log.txt | grep password`

### Hak Akses (Izin File)
Linux itu sangat ketat. Walaupun kamu menemukan file rahasia, belum tentu kamu diizinkan membacanya.
- `chmod` (Change Mode): Mengubah izin siapa yang boleh membaca (Read), menulis (Write), atau mengeksekusi (Execute) file tersebut.
- `chown` (Change Owner): Mengubah status "Siapa pemilik sah file ini". Hacker sering mengincar akses "Root" (Super Admin) agar bisa mengambil alih total seluruh sistem.

## Ringkasan
- Hacker **White-Hat** adalah orang baik yang dibayar untuk mencari celah keamanan *secara legal*.
- Melakukan penetrasi atau uji coba peretasan tanpa Izin Resmi adalah tindakan Ilegal/Kriminal.
- Terminal **Linux** adalah senjata utama para pakar keamanan siber.
- Kuasai navigasi Linux (`ls`, `cd`, `cat`, `grep`) sebelum mulai membedah sistem lebih dalam.

Sudah paham etikanya? Sekarang siapkan detektif di dalam dirimu, mari kita belajar seni menyembunyikan pesan di materi Kriptografi!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
