---
title: "Simulasi Jaringan di Cisco Packet Tracer"
order: 5
course: "jaringan"
emoji: "🛰️"
---

Membaca topologi dan subnetting memang rumit jika hanya menggambar di atas kertas papan tulis. Di dunia industri, sebelum kita membeli mesin router raksasa perusahaan senilai ratusan juta Rupiah, Insinyur wajib meletakkan dan mendesain kerangkanya di sebuah ruang uji "Video Game". 

Perangkat lunak sakti tersebut bernama **Cisco Packet Tracer**.

## Kenapa Ini Penting?
Packet Tracer tidak hanya menggambar garis imajiner. Jika di simulasi ini kamu salah menginput aturan *Subnet Mask* `/24`, lampu hijau kabelnya akan menjadi lampu merah berkedip! Bahkan simulasi program di dalam game ini persis mencerminkan layar hitam CLI (*Command Line*) sistem operasi nyata dari Cisco Router sungguhan di dunia asli.

## Cara Asik Merancang Bangun Arsitektur Lab

Misalkan Kepala Sekolah memintamu: "Tolong rancang 2 buah ruangan, Lab Multimedia dan Lab Akuntansi agar mereka bisa terhubung namun letak ruangannya jauh terpisah di Gedung beda!"

### 1. Menyeret (Drag & Drop) Perangkat
Buka *Packet Tracer*, seret alat ini ke layar tengah kanvas virtualmu:
- 10 buah ikon wujud `End Device (PC / Laptop)`. Bagi 2, kiri 5, kanan 5.
- 2 buah alat sentral kotak `Switch` (Untuk masing-masing perumahan gedung).
- Dan tentu saja 1 buah mesin kotak penengah ajaib `Router` untuk diletakkan di puncak tahta di atas atap Gedung.

### 2. Menyambung Kabel yang Benar!
- Gunakan alat *Kabel Lurus (Straight)* dari port Ethernet punggung kumpulan PC ditarik colok berjamaah ke arah mulutan port punggung `Switch`. Kenapa? Karena alat PC dan alat Switch kastanya jauh BERBEDA wujud.
- Lakukan hal yang sama persis: Ujung kabel `Switch` Gedung 1 ditarik ke lubang port `Router` pintu 0. Ujung kabel `Switch` Gedung 2 ditarik ke port Router pintu 1. 

### 3. Eksekusi Suntik Vaksin (Konfigurasi Pengalamatan IP)
Kini kabelnya tertancap. TAPI KOK KONEKSINYA MASIH MERAH LAMPU MATI?!
Tenang, itu karena PC mu seperti zombie tanpa ruh Alamat IP.
- Klik ikon klik ganda PC 1 ➔ masuk ke menu layaknya windows Desktop IP Configuration ➔ ketik isi manual nomor jalannya: misal `192.168.10.2` dengan Subnet Maks `/24` (`255.255.255.0`).
- Lakukan pengalamatan nomor manual (192.168.10.X dan beda area 192.168.20.X) ke semua mesin PC!

💡 **Uji Terbang Si PDU (Ping Animasi Pelan Terbang Ajaib)**
Sudah selesai koding IP? Sekarang ambil ikon alat sakti pengirim Amplop Surat (bernama objek **PDU**) di sisi samping layar. Klik Amplop di PC Lab Multimedia, dan seret bidik mendarat jatuh timpa ke PC Lab Akuntansi yang ada di Gedung sebelah. 
Mainkan tombol *Play Simulation*. Lihatlah betapa epik animasinya: Amplop surat itu akan terbang bergerak sangat perlahan naik kabel melalui Router dan menukik sukses terkirim dan membalas Ping ke sisi seberang PC temanmu jika konfigurasi otak Routernya sempurna! Murni magis!

## Ringkasan
- **Cisco Packet Tracer** adalah aplikasi ajaib Simulator Jaringan 100% akurat mirip wujud aslinya tanpa risiko alat jutaan Rupiah terbakar konslet listrik aslinya di kehidupan nyata.
- Di dalam arena kanvas ini, kita sangat krusial dilatih membedakan jenis sambungan fisik kabel yang tepat (kapan colok pakai *Straight* kapan colok butuh *Crossover*).
- Menghubungkan dua grup lab/jaringan bangunan yang *Sangat Berbeda Identitas Segmentasi Area Network ID-nya* (Gedung 1 vs Gedung 2) tidak mungkin berhasil jika hanya menggunakan alat Switch biasa, di sinilah otak peran sebuah pusat terminal **Router** mutlak hukum kehadirannya diletakkan di persimpangan tengah antar-gedung.
- Fitur visualisasi **Simulasi PDU** memungkinkan sang pengembang siswa untuk mengintai pergerakan terbang kardus data selapis demi selapis, seakan dia bisa menghentikan detik waktu pergerakan paket internet.

Selamat! Gelarmu kini sudah paripurna lengkap. Kamu bukan cuma kuli ketik coding semata, wawasan mu telah seluas samudra merambah ranah Keamanan *Cyber*, Automatisasi Perakit Robot Server *DevOps* dan Insinyur rancang bangun Denah Topologi jalanan Jaringan internet *Networking*!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
