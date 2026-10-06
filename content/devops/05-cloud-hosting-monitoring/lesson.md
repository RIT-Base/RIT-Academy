---
title: "Cloud Hosting, Domain & Monitoring Server"
order: 5
course: "devops"
emoji: "☁️"
---

Aplikasimu sudah canggih: berjalan mulus di Docker dan bisa update otomatis lewat CI/CD GitHub Actions. Tapi di mana tepatnya letak "Server" tempat pabrik tersebut bekerja memuaskan pelanggan dunia maya? Jawabannya ada di atas awan, alias **Cloud**.

## Kenapa Ini Penting?
Dulu, perusahaan harus beli *hardware* raksasa mahal (PC Server beneran) dan menaruhnya di ruang ber-AC yang dingin. Kalau ada masalah listrik, websitenya mati. Era sekarang, kita hanya perlu "Menyewa" sepotong server virtual dari penyedia Cloud. Ini kunci membangun bisnis digital berbiaya murah.

## Berkenalan dengan Sang Tuan Tanah Cloud

**Penyedia Cloud (Cloud Providers)** raksasa seperti AWS (Amazon), Google Cloud (GCP), atau yang versi ramah kantong seperti DigitalOcean, menyewakan sebuah mesin Linux kosong bernama **VPS (Virtual Private Server)**.

Kelebihan VPS:
- Kamu bebas memasang konfigurasi sistem apapun (memiliki akses Root).
- Tagihannya bisa dibayar harian atau bulanan (Sistem *Pay-as-you-go*). 
- Jika pengunjung website sedang sepi, cukup sewa spesifikasi RAM 1 GB seharga langganan pulsa sebulan. Jika pengunjung tiba-tiba membludak, dalam satu klik, servermu "Tumbuh" menjadi spesifikasi RAM 16 GB tanpa perlu membeli dan mencolok kabel baru! 

## Identitas Digital: Alamat Domain

Server VPSmu aslinya hanya memiliki wujud angka (Alamat IP), misalnya `167.89.90.1`.
Sangat tidak ramah manusia, bukan? Oleh karena itu, kamu harus membeli atau menyewa **Domain Name** (contoh: `namakamu.com`).

**Sistem DNS (Domain Name System)** adalah buku telepon ajaib internet. Jika ada pengunjung yang mengetikkan `namakamu.com` di browser, DNS akan memandu browser itu menuju alamat asli `167.89.90.1`. 

💡 **Wajib SSL (Gembok Hijau):** 
Setelah alamat cantik `namakamu.com` tersambung, kamu HARUS memastikan komunikasi antara pembeli dan websitemu dienkripsi agar tak disadap maling (Buka ulang modul Kriptografi!). Sistem ini mengubah protokol `http` (tidak aman) menjadi `https` (aman). Ini dicapai dengan memasang "Sertifikat SSL" di web server Nginx. Tools gratis terpopuler: *Let's Encrypt*.

## Monitoring: Mendeteksi Api Sebelum Kebakaran
DevOps tidak hanya tukang *deploy* instalasi, ia adalah sang pemantau malam.
Jika aplikasimu mendadak error di jam 2 pagi, kamu tidak boleh menunggu hingga dikomplain jutaan pengguna pagi harinya! 
Gunakan aplikasi *Monitoring Log* dan Peringatan seperti **Datadog, Prometheus, atau Grafana**. Sistem pemantauan cerdas akan mengirim pesan darurat (Alarm via Telegram/Slack) jika menemukan gejala memori RAM melebihi batas atau ada lonjakan angka gagal login mendadak. 

## Ringkasan
- Penyedia Cloud modern menyediakan server sewa serbaguna bernama **VPS (Virtual Private Server)**. Keuntungannya adalah dapat bertumbuh (*Scale-up*) secara fleksibel tanpa beli fisik baru.
- Angka Alamat IP dikonversi menjadi teks kata yang ramah manusia (seperti nama web `.com`) oleh sistem buku telepon ajaib bernama **DNS**.
- Mengamankan komunikasi trafik website harus menggunakan **SSL** (mengubah HTTP menjadi jalur HTTPS ber-gembok hijau).
- Implementasi DevOps yang sejati harus ditutup dengan sistem **Monitoring Server** yang sigap membunyikan sinyal tanda bahaya error sedini mungkin.

Akhirnya! Semua kepingan arsitektur software dan infrastruktur sudah kamu genggam utuh. Di modul berikutnya, kita akan sedikit masuk menyelam membedah jalur perpipaan jaringan kabel internet yang sebenarnya: Modul Jaringan Komputer!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
