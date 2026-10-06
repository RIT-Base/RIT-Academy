---
title: "Alamat IP & Seni Subnetting"
order: 2
course: "jaringan"
emoji: "🌐"
---

Pernah melihat alamat berwujud sekumpulan angka misterius seperti `192.168.1.10` saat mengutak-atik router WiFi rumah? Itu adalah **Alamat IP (IP Address)**. Tanpanya, kurir data di internet tidak akan tahu komputer mana yang harus dikirimi balasan saat kamu mencari video lucu di YouTube.

## Kenapa Ini Penting?
Bayangkan kamu harus menata 100 komputer di laboratorium sekolah. Jika kamu tidak membagi (memecah) blok alamat komputernya dengan rapi, jaringan akan menjadi sangat lambat (karena paket salah alamat menabrak satu sama lain). Ilmu memecah blok IP inilah yang disebut "Seni Subnetting".

## Anatomi Alamat IP (IPv4)

IP Versi 4 memiliki struktur wujud 4 blok angka (tiap blok maksimal bernilai 255).
Contoh: `192.168.1.50`

Alamat ini sebenarnya punya makna tersembunyi yang terbelah dua layaknya sistem kode pos.
1. **Network ID (Nama Jalan / Nama Perumahan):** Mengidentifikasi ini jaringan grup siapa?
   (Contoh: `192.168.1` adalah perumahan Lab Komputer A).
2. **Host ID (Nomor Rumah):** Mengidentifikasi ini komputer nomor berapa di dalam perumahan tersebut.
   (Contoh: `.50` adalah komputer milik Budi).

Maka IP `192.168.1.50` = "Lab Komputer A, PC Nomor 50".

## Subnet Mask: Si Penggaris Pembelah Jalan

Bagaimana cara komputer tahu di angka berapa batas potongan antara "Nama Jalan" dengan "Nomor Rumah" itu dilakukan? Nah, kita butuh sepotong aturan yang disebut **Subnet Mask**.

Bentuk Subnet Mask paling standar di jaringan rumahan (Sering kamu temukan saat seting WiFi) adalah: `255.255.255.0`
Angka rahasia ini memberi perintah ke sistem:
- "Blok angka 255 berarti JANGAN diubah (Ini nama jalannya)."
- "Blok angka 0 berarti SILAKAN BEBAS DIISI (Ini nomor jatah komputernya)."

Jika jaringanmu punya aturan `255.255.255.0`, maka alamat jaringannya terbatas hanya dari rentang `192.168.1.1` mentok sampai `192.168.1.254` (Maksimal menampung total 254 buah PC/Smartphone).

### Notasi Ringkas (CIDR Slash / )
Menulis kata `255.255.255.0` terlalu panjang. Insinyur jaringan menyingkatnya dengan istilah Prefix CIDR, yaitu dengan tambahan `/24` di belakang alamat IP. 
Jadi kalau kamu melihat tulisan: `192.168.1.50 /24`, itu artinya IP tersebut memiliki batas jatah 254 rumah.

💡 **Seni Memecah / Subnetting Tingkat Lanjut:**
Bagaimana jika sekolahmu Punya 3 lab berbeda, masing-masing butuh 60 komputer, dan Kepala Sekolah bilang mereka tidak boleh terhubung demi keamanan bocoran ujian?
Alih-alih membeli 3 router beda, Insinyur jaringan akan mengubah garis potong subnet mask-nya (Misal dipotong menggunakan ukuran pinggang `/26`). Ini akan otomatis membelah 1 router besar tadi menjadi 4 blok jalan perumahan kecil yang kedap dan terpisah! Gila kan!

## Ringkasan
- Tiap komputer yang tersambung WiFi akan disuntik angka identitas bernama **IP Address**.
- Alamat IP terbagi menjadi dua roh: **Network ID** (Kelompok Jalan Jaringan) dan **Host ID** (Nomor Unik Perangkat PC).
- **Subnet Mask** (atau kode ringkasnya yang berekor **/Slash CIDR**) adalah penggaris yang dipakai untuk membagi ukuran jatah total IP yang ada.
- Teknik **Subnetting** sangat berguna untuk memecah belah satu jaringan besar menjadi blok-blok kecil guna efisiensi laju jalanan dan demi batas isolasi antar divisi kerja yang rahasia.

Pengalamatan jaringan sekarang sudah terang benderang! Mari kita berkenalan dengan alat fisik (Kotak Kelap Kelip) apa yang sebenarnya mengatur jalanan kabel perumahan ini!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
