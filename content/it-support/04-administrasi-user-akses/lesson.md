---
title: "Administrasi Pengguna & Izin Akses"
order: 4
course: "it-support"
emoji: "👥"
---

Bayangkan jika semua guru dan murid di sekolahmu punya kunci Master yang bisa membuka Ruang Kepala Sekolah, Ruang Guru, Ruang BK, dan Lab Komputer sekaligus. Kacau, kan? Itulah mengapa di komputer ada yang namanya **Sistem Hak Akses**.

## Kenapa Ini Penting?
Tanpa pemisahan hak akses, 1 komputer yang dipakai bergantian sangat rentan rusak. Satu orang yang sembarangan instal aplikasi bajakan (virus) bisa merusak data orang lain di PC yang sama. Sebagai IT, tugasmu adalah menjaga 'Kunci Ruangan' tersebut.

## Tingkatan User (Pengguna)

Sistem Operasi (seperti Windows dan Linux) memiliki hierarki kasta untuk penggunanya:

### 1. Administrator (Root / Super User)
Tingkatan tertinggi. Memiliki kunci master.
- **Bisa:** Instal aplikasi, ubah pengaturan jaringan, hapus OS, format Harddisk, membuat/menghapus user lain.
- *Bahaya:* Jika akun ini yang terkena virus, virusnya langsung menyebar ke seluruh sistem karena virusnya menunggangi hak akses Administrator!

### 2. Standard User
Pengguna biasa harian (ini harusnya akunmu buat ngetik tugas atau browsing).
- **Bisa:** Buka aplikasi, save dokumen ke folder *My Documents* milik dia sendiri.
- **TIDAK BISA:** Menginstal aplikasi besar, tidak bisa masuk ke folder user lain.
- *Aman:* Jika user ini kena virus/Ransomware, kerusakannya seringkali (walau tak selalu) hanya terbatas pada file miliknya saja.

## Konsep Permission (Hak Akses Folder)
Selain kasta, setiap file/folder juga punya label kunci keamanan yang disebut *Permission*.
1. **Read (Baca):** User cuma bisa melihat/membuka file, tapi tidak bisa mengubah/menghapus. (Cocok untuk folder Pengumuman Sekolah).
2. **Write (Tulis):** User bisa mengedit isinya.
3. **Execute (Jalankan):** User diizinkan menjalankan file berformat `.exe` (aplikasi) tersebut.

💡 **Wawasan: Prinsip Least Privilege**
Di dunia keamanan IT (Cybersecurity), ada hukum emas: "Berikan user hak akses *paling minim* yang dia butuhkan untuk bekerja." Kalau kerjanya cuma ngetik Word, buatkan akun Standard User, jangan jadikan dia Administrator!

## Ringkasan
- **Administrator / Root** adalah pemegang kendali penuh yang bisa mengubah sistem inti komputer.
- **Standard User** memiliki akses terbatas untuk melindungi sistem dari kerusakan (disengaja maupun virus).
- **Permission (Hak Akses)** mengatur izin spesifik per file: *Read* (Baca), *Write* (Tulis/Ubah), dan *Execute* (Jalankan).
- Terapkan **Principle of Least Privilege**: Jangan berikan hak Admin kalau tidak diperlukan!

Sudah paham cara mengunci ruangannya? Lanjut ke materi terakhir: Bagaimana kalau bangunannya terbakar (Gagal Sistem/Ransomware)? Kita bahas soal Backup!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
