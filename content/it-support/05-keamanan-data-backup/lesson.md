---
title: "Perlindungan Data & Aturan Backup 3-2-1"
order: 5
course: "it-support"
emoji: "🛡️"
---

Bayangkan kamu sudah mengerjakan skripsi (atau game buatanmu) selama 6 bulan, lalu besoknya laptopmu hilang dicuri orang atau harddiskmu tiba-tiba berasap rusak. Jika kamu tidak punya salinan data (Backup), tamatlah riwayatmu! 

## Kenapa Ini Penting?
Di dunia IT, pertanyaan soal hilangnya data bukanlah **"Apakah"** harddisk itu akan rusak/terkena virus, melainkan **"Kapan"**. Menjadi IT Support artinya kamu adalah tameng terakhir keselamatan data pengguna.

## Mengapa Data Hilang?

1. **Kerusakan Fisik (Hardware Failure):** SSD atau Harddisk punya batas umur. Jika jatuh, terbakar, atau korslet listrik, data bisa lenyap fisik.
2. **Human Error:** Gak sengaja kepencet "Delete Permanen" atau salah format partisi.
3. **Malware / Ransomware:** Ini yang paling menakutkan saat ini. Ransomware akan masuk ke komputermu, mengunci (enkripsi) seluruh filemu, lalu memerasmu (meminta tebusan uang/bitcoin) untuk membukanya.

## Aturan Emas Keselamatan: Backup 3-2-1

Ini adalah hukum suci dalam keamanan data yang dipakai dari kelas rumahan sampai level server bank dunia!

- **3 (Tiga):** Simpan **3 Salinan** dari data yang penting (1 data asli + 2 data cadangan).
- **2 (Dua):** Simpan 2 cadangan tersebut di **2 Jenis Media yang Berbeda** (Misal: 1 di SSD eksternal, 1 di Flashdisk/NAS). Alasannya: kalau satu merk/jenis alat itu error massal, yang lainnya aman.
- **1 (Satu):** Letakkan minimal **1 Salinan di Lokasi Fisik yang Berbeda** (Offsite / Cloud).
  - *Kenapa lokasi fisik harus beda?* Bayangkan kamu rajin backup tiap hari ke harddisk eksternal, tapi harddisk itu kamu taruh di dalam tas yang sama dengan laptopmu. Saat tasmu dicuri, hilanglah semua kerja kerasmu dan cadangannya sekaligus! 
  - *Solusi 1:* Simpan data di Google Drive / Cloud (Ini lokasi fisik di luar negeri!).

💡 **Wawasan: Pemulihan (Recovery)**
Jangan cuma rajin mem-backup. Kamu harus sesekali mencoba *Me-Restore* (Mengembalikan) data backup tersebut. Banyak kejadian lucunya orang bertahun-tahun backup, tapi pas kejadian aslinya, ternyata file backupnya korup dan tak bisa dibuka!

## Ringkasan
- Data bisa hilang karena kerusakan komponen, *Human Error*, dan bahaya *Ransomware*.
- **Ransomware** mengunci file dan menyandera data untuk uang tebusan.
- Aturan emas pelindung data adalah **Backup 3-2-1**:
  - Punya **3** salinan data.
  - Disimpan pada **2** jenis media berbeda.
  - Minimal **1** disimpan di lokasi *offsite* (seperti Cloud/Google Drive) agar tahan bencana fisik lokal.
- Lakukan pengetesan *Restore* berkala.

Selamat! Dengan tamatnya Path ini, kamu telah menguasai anatomi, instalasi, troubleshooting, hingga mengamankan data ibarat seorang IT Professional! 

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
