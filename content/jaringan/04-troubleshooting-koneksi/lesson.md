---
title: "Troubleshooting Jaringan: Melacak Jalur Putus"
order: 4
course: "jaringan"
emoji: "🔍"
---

Skenario Horror Kiamat IT Pagi Hari:
"Pak, laptop saya muter muter loading gak bisa masuk buka Google padahal lambang WiFinya hijau full nyala!!" 

Apa yang harus dilakukan jika kamu jadi Network Admin-nya? Mengecek kabel seluruh kantor satu per satu? Wah bisa berbulan-bulan itu! Sebagai teknisi profesional, pisau lipat pertamamu adalah layar Command Prompt/Terminal.

## Kenapa Ini Penting?
Hanya dengan mengetik segelintir jurus sakti baris teks kata kunci perintah diagnosa di Windows / Linux Terminal, kamu bisa dengan presisi memetakan asal usul letak kabel titik kerusakan yang bermasalah walau dari jarak puluhan kilometer! 

## 4 Pedang Pusaka Terminal Jaringan

Jangan langsung membongkar alat! Mari mainkan alur logika peretasan ala deduksi ala Sherlock Holmes menggunakan terminal CLI:

### 1. `ipconfig` (Windows) / `ifconfig` atau `ip a` (Linux)
Langkah Perdana: *"Cek identitas KTP jaringanku sendiri dulu. Benarkah perangkatku ini kebagian jatah IP atau justru belum tersuntik angka dari sang router WiFi?"*
Ketikkan perintah ini. Jika yang muncul jatah angka alamatnya awalan horor ngaco `169.254.x.x` (Disebut APIPA), artinya sambungan laptop ke alat WiFi router kamu telah GAGAL mendapatkan jatah nomor antrian IP. Ini tanda putus jalur kabel (Atau router macet).

### 2. Ping (Pendetak Denyut Nadi)
Perintah sakti terpopuler. `ping 8.8.8.8` (Alamat server dunia milik Google).
Tugas perintah ini sangat primitif: Ia akan melempar 4 buah bata karet sinyal gema ke arah target lalu mencatat adakah pantulannya balik ke kamu?
- Kalau ada balasan tulisan angka millisecond (`ms`), selamat, kabel internet duniamu hidup!
- Kalau muncul horor `Request Timed Out (RTO)`, itu pertanda lemparannya mental lenyap (koneksi mati terputus atau gembok keamanan firewall musuh terlalu galak memblokir tangkisan balik kita).

### 3. Tracert (Windows) / Traceroute (Linux)
Jika Pingmu gagal, ping hanyalah sinyal "IYA atau TIDAK". Ping tidak mengasih tau *di belahan benua/ruangan router nomor berapa sinyal itu lenyap jatuhnya?*
Gunakan perintah `tracert 8.8.8.8`.
Ia akan mencetak secara persis rekam jejak lompatan kardus kita.
"Lompatan Hop Router 1 (Ruang Kelas) sukses... Lompatan Hop Router 2 (Satelit Tiang Provider ISP Internet Indi**me Kota Bandung) sukses... eh Hop Router 3 Jakarta mati!"
Tada! Detektif bekerja! Berarti internet kantormu aman, yang putus malah kabel pusat provider nasionalnya di Jakarta!

### 4. Nslookup (Menelepon Buku Alamat Sistem)
Coba bayangkan `ping 8.8.8.8` sukses. Tapi saat kamu buka web via browser `google.com` gagal (Page Cannot be Displayed). Berarti apa yang rusak?
Itu artinya, server buku alamat dunia (**DNS Server**)-nya yang buta abjad! Kamu tersambung internet angka, tapi laptopmu kesulitan mentranslate bahasa angka tadi menjadi abjad nama manusia. Gunakan jurus `nslookup google.com` untuk menyembuhkan dan mentes apakah rute buku abjad DNSnya sehat murni.

💡 **Wawasan: Aturan Sakti Pola Urutan Mendiagnosa Error Internet!**
Jangan loncat sana-sini, ini urutan prosedur SOP paten global:
1) Pertama Ping dulu titik diri sendiri (localhost: 127.0.0.1) untuk ngetes alat chip HP mu utuh gak?
2) Lanjut Ping alat Router Getbang Pintu depan WiFi kamarmu (Default Gateway: 192.168.1.1).
3) Jika Router rumah nyahut, baru tembak peluru ping keluar dunia asli (Ping Google: 8.8.8.8).

## Ringkasan
- Menemukan sumber penyakit kabel rusak tak perlu dengan membuka wujud alat fisiknya duluan, ketikan deteksi *CLI Ping* sudah cukup jitu.
- Perintah identitas **ipconfig** melacak kebenaran angka silsilah perolehan IP diri komputernya.
- Perintah gema pantulan **Ping** adalah penguji validitas konektivitas putus/hidup nya jalur.
- Perintah lacak detektif **Tracert/Traceroute** bisa mengidentifikasi persis lokasi Router ke-berapa yang terpelanting putus.
- Jika yang di-ping angka sukses, tapi ping abjad nama gagal web browser blank, salahkan error terpusat pada sang translasi **Buku DNS (Nslookup)**.

Teorinya selesai, sekarang bagaimana cara kamu bisa berlatih mencabut colok kabel jaringan dan men-setup raksasa Router 100 Juta tanpa khawatir jika harus beli alatnya? Solusinya adalah merakitnya di 'Video Game Simulator' resmi dari pabrikan!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
