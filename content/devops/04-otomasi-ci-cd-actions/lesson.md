---
title: "Otomasi CI/CD dengan GitHub Actions"
order: 4
course: "devops"
emoji: "🔄"
---

Bayangkan jika setiap hari timmu memperbarui kode (Update Aplikasi). Seorang *Programmer* harus masuk secara manual ke Server lewat SSH, mematikan Docker, mem-*build* (mencetak) ulang kodenya, lalu menghidupkannya lagi. Jika ini terjadi 10 kali sehari, sang Programmer pasti stres dan kelelahan! Di sinilah pentingnya **Robot Pabrik Perakit Otomatis**.

## Kenapa Ini Penting?
Tanpa jalur perakitan otomatis (Pipeline), setiap perbaruan (update) aplikasi membawa risiko *human error* yang besar (salah mengetik perintah). Filosofi utama budaya DevOps adalah: **"Otomatisasi semua hal yang membosankan"**.

## Apa itu CI / CD?

Ini bukan singkatan yang rumit. CI/CD adalah 2 proses yang digabung jadi satu.
- **CI (Continuous Integration):** Setiap kali tim mengirim kode baru ke GitHub, ada *Robot Penilai* (Tester) yang otomatis mengecek apakah kodenya bermasalah atau error. Kalau error, kodenya otomatis ditolak menyatu dengan *main branch*!
- **CD (Continuous Deployment):** Kalau kode baru tadi lolos tes, *Robot Kurir* langsung mengirim kode matangnya ke Server asli, mematikan Docker lama, dan menyalakan Docker baru secara otomatis, detik itu juga!

## Mengenal Sang Robot Pabrik: GitHub Actions

Dulu, untuk membangun robot pipa perakitan ini, kita butuh program terpisah seperti *Jenkins*. Sekarang, pabrik itu sudah disediakan terintegrasi dengan gratis oleh Microsoft di dalam **GitHub Actions**!

Cara menyuruh Robot GitHub Actions:
1. Buat folder bernama `.github/workflows/` di dalam projek kodemu.
2. Buat file berekstensi `.yml` atau `.yaml`.
3. Tulis langkah (Step-by-step) robotiknya.

```yaml
# Contoh File Robot CI/CD Sederhana (.yml)
name: Robot Deploy Otomatis

# "Kapan robot ini harus bekerja?" 
# Jawab: Setiap kali ada yang melakukan git push ke cabang main!
on:
  push:
    branches: [ "main" ]

jobs:
  tugas_utama:
    runs-on: ubuntu-latest # Siapkan komputer Linux kosongan untuk robot bekerja
    
    steps:
      - name: Ambil kode terbaru dari GitHub ke komputer robot
        uses: actions/checkout@v3

      - name: Instal bahan dan Uji Kode (Test)
        run: npm install && npm test
        
      - name: Jika lolos test, otomatis Kirim (Deploy) ke Server Asli lewat SSH
        run: ./script_deploy_ke_server_asli_otomatis.sh
```

💡 **Wawasan: Jangan Tulis Password di YAML!**
Perhatikan bahwa robot ini harus masuk diam-diam ke server aslimu untuk mengubah aplikasinya. Oleh karena itu robot butuh Kunci Rahasia / Password. JANGAN PERNAH MENULIS password di dalam teks YAML. Gunakan fitur *GitHub Secrets* untuk menyembunyikannya (Sistem akan membacanya sebagai variabel `${{ secrets.SERVER_PASSWORD }}`).

## Ringkasan
- **Continuous Integration (CI)** bertugas menguji dan menyeleksi kelayakan kode yang baru saja di-*push* ke repositori oleh Developer (sebelum digabungkan sepenuhnya).
- **Continuous Deployment (CD)** bertugas membawa kode matang ke Server Publik dan menayangkannya (Deploy) sepenuhnya otomatis.
- Proses penyusunan pabrik otomatis ini disebut **Pipeline**, di mana salah satu layanan gratis paling andal untuk merancangnya adalah **GitHub Actions**.
- Skrip robot di GitHub Actions ditulis dalam file format **YAML**. Ingatlah untuk selalu menjaga kata sandi koneksi server dengan aman melalui **Secrets**.

Otomasi perakitan aplikasi usai. Terakhir, kita periksa bagaimana cara mengemas semua ini di mesin publik dan memberikannya alamat cantik `.com`. Mari melompat ke Modul 5!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
