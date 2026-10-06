---
title: "Perangkat Jaringan: Kabel, Switch & Router"
order: 3
course: "jaringan"
emoji: "🔌"
---

IP Address itu ibarat konsep "Nomor Rumah", sementara data paket yang lalu-lalang di baliknya ibarat paket kiriman. Nah, pertanyaan mendasarnya: Siapa yang membangun "Jalan Aspal" dan siapa pihak kantor pos yang menjadi pusat pendistribusi paket kirimannya? Jawabannya ada pada Perangkat Keras Fisik Jaringan (Network Devices).

## Kenapa Ini Penting?
Sebagai spesialis IT, jika koneksi internet di kantor mati, kamu dituntut untuk tidak hanya memantau layar hitam Terminal, namun wajib mengecek bentuk kotak kelap-kelip sakti pembagi jaringan tersebut. Salah menancap alat saja akan membuat internet se-Gedung runtuh macet. 

## Alat Utama di Dalam Ruangan Server Jaringan

Mari berkenalan dengan empat dewa peracik alat-alat "Jalanan" internet.

### 1. Kabel UTP / LAN (Jalan Aspalnya)
Di belakang komputer PC pasti ada colokan yang mirip kabel colokan telepon rumah namun bentuknya lebih besar (Port RJ-45). Ini adalah gerbang masuk jaringan fisik yang disebut kabel **UTP / Ethernet LAN**. 
Ada susunan warna kabel kecil di dalamnya:
- **Kabel Straight (Lurus):** Jika kamu ingin mencolokkan/menyambungkan 2 wujud perangkat yang *berbeda jenis* (Contoh: Menarik colokan PC ke Switch).
- **Kabel Cross (Menyilang):** Jika kamu menyambungkan 2 buah benda *sejenis/kembar* (Contoh: Laptop disambung langsung kabel lurus ke mulut laptop lainnya).

### 2. Switch (Penghubung Satu Perumahan)
Bentuknya kotak besi panjang, di mana badannya berjejeran mulut-mulut colokan yang sangat banyak (24 Port). Tancapkan puluhan kabel PC di seisi kantor, lalu gabungkan colokannya terpusat menancap ke lubang-lubang punggung sang **Switch**. Keajaibannya? PC A bisa mengirim film 10GB lewat kabel ke arah PC B (karena tersambung pada Switch yg sama)!

*Note:* Dulunya alat kuno ini bernama "Hub", sebuah alat lemot bodoh yang asik berteriak kirim ke semua lubang. Tapi Switch pintar, Switch secara ajaib hapal lubang nomor berapa tujuan PC yang sebenarnya dituju.

### 3. Router (Penghubung ke Luar Kota / Internet!)
Jika Switch cuma bertugas mempertemukan grup warga 1 rukun tetangga, maka tugas **Router** sangatlah vital: Ia menjadi "Gerbang Tol Batas Kota" yang mengekstrak jatah internet dunia liar luar ke dalam lingkungan rumahmu. 
Fungsi esensial Router adalah menjadi tukang sortir: *Menjembatani dan menghubungkan aliran dari dua network ID alamat yang Berbeda!*

### 4. Access Point / WiFi (Pemancar Udara)
Access Point adalah kotak sakti berduri yang merubah sinyal arus listrik tegang kawat tadi menjadi "Gelombang Sihir WiFi", sehingga HP mu yang tiada lubang kabelnya bisa menikmati limpahan akses data yang ditarik kabel router itu!

💡 **Wawasan: Modem vs Router?**
Alat putih yang sering ditaruh kang teknisi Indihome di rumahmu sebenarnya bukanlah benda tunggal. Itu adalah *Hardware Gado-Gado*. Benda itu menyatukan 4 wujud perangkat utuh menjadi 1 (Modem penerjemah kabel fiber kaca luar + Router batas keluar masuk kota + Switch lubang kabel kamar belakang + Access Point Pemancar antena WiFi HP mu). Hebat kan?

## Ringkasan
- Menghubungkan dua benda dengan fungsi sejawat (laptop ke laptop) wajibnya memakai susunan kabel **Crossover**. Alat yang ragam bedanya jauh (PC ke Switch) susun pakai kabel LAN tipe lurus **Straight**.
- Jika kamu cuma ingin memusatkan colokan kabel puluhan PC seisi satu ruang lingkup tim kantor lokal/perumahan, silakan borong colok ke kotak **Switch**.
- Jika kamu ingin menyambungkan blok jaringan PC kantormu itu ke arah jalan raya internet pusat dunia luar (Beda alamat blok), wajib menggunakan "Gerbang Kota" yaitu **Router**.
- **Access Point (WiFi)** membebaskanmu dari belenggu ikatan kabel dengan menyebarkan laju daya sinyal tersebut ke frekuensi sebaran udara.

Alat coloknya beres semua terpasang, tapiiii... Jaringannya putus! Cara ngelacak kabel errornya bagaimana? Belajar cara detektifnya di Troubleshooting!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
