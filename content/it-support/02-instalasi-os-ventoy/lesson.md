---
title: "Manajemen OS, Partisi & Bootable Ventoy"
order: 2
course: "it-support"
emoji: "💾"
---

Komputer yang baru selesai dirakit hanyalah kumpulan besi dingin. Ia tidak bisa membuka browser, apalagi main game. Untuk memberikannya "nyawa", kita butuh menginstal **Sistem Operasi (OS)** seperti Windows, Linux, atau macOS.

## Kenapa Ini Penting?
Skill wajib nomor satu bagi IT Support adalah bisa menginstal ulang OS (Inul). Kenapa? Karena seringkali komputer terkena virus parah atau OS-nya *corrupt* (rusak), dan jalan satu-satunya adalah instalasi ulang bersih (*Clean Install*).

## Proses Instalasi OS Modern

### 1. BIOS dan UEFI
Saat komputer baru menyala, sebelum Windows muncul, ada layar hitam sekilas. Itu adalah BIOS (versi jadul) atau **UEFI** (versi modern). Tugas UEFI adalah mengecek apakah *hardware* sehat, lalu mencari di harddisk mana OS itu berada (proses *Booting*).

### 2. Format Partisi
Ibaratkan Harddisk (Atau SSD) sebagai gudang besar kosong.
- **Partisi** = Menyekat gudang menjadi kamar-kamar (misal Local Disk C: untuk OS, dan D: untuk Data).
- **Sistem Tabel:** Dulu pakai **MBR** (Master Boot Record) yang dibatasi maksimal 4 partisi. Sekarang wajib pakai **GPT** (GUID Partition Table) yang lebih aman dan tanpa batas.
- **Format File:** Gudang itu harus punya rak dengan aturan jelas. Windows menggunakan format **NTFS**. Flashdisk biasa pakai **FAT32** (tapi file tak boleh lebih dari 4GB) atau **exFAT**. Linux menggunakan **EXT4**.

### 3. Senjata Sakti: Ventoy
Dulu, kalau mau instal OS, kita butuh kepingan DVD. Lalu beralih ke Flashdisk khusus (pakai aplikasi *Rufus*), tapi 1 flashdisk cuma muat 1 OS (misal Windows 10 saja). 

Sekarang ada alat dewa bernama **Ventoy**!
Kamu cukup format flashdiskmu dengan aplikasi Ventoy, lalu tinggal *copy-paste* file ISO (file mentahan instalasi) beraneka ragam OS langsung ke flashdisk itu, seperti Windows 10, Windows 11, dan Ubuntu Linux berjejer rapi. Saat colok ke PC, Ventoy akan menampilkan menu pilihan keren!

💡 **Wawasan: Jangan Hapus Data Penting!**
Saat menginstal OS, selalu waspada ketika berada di layar partisi! Pastikan kamu **hanya** menghapus dan memformat partisi sistem lama (C:), BUKAN partisi Data (D:).

## Ringkasan
- **UEFI** adalah sistem firmware modern penerus BIOS untuk proses awal komputer menyala (*Booting*).
- Gunakan standar tabel **GPT** untuk harddisk baru.
- Windows berjalan di format **NTFS**.
- **Ventoy** adalah solusi cerdas untuk membuat 1 Flashdisk ajaib yang berisi berbagai pilihan Sistem Operasi siap instal!

Dengan flashdisk Ventoy di tangan, kamu sudah selangkah menjadi pahlawan IT sesungguhnya.

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
