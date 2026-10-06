---
title: "Menemukan Masalah & Menulis User Story"
order: 1
course: "produk-analis"
emoji: "💡"
---

Pernah melihat sebuah aplikasi yang fiturnya bejibun, banyak tombolnya, terlihat rumit super mahal, TAPI tidak ada orang yang mau memakainya? Mengapa hal konyol itu terjadi? Itu karena Programmer aplikasi tersebut kedinginan ngoding di goa tanpa bertanya: *"Apakah masyarakat BENAR-BENAR BUTUH aplikasi aneh buatanku ini?"*

Di sinilah sang pawang, dewa jembatan penghubung kompas proyek **Product Manager (PM) / Analis Produk** memimpin peradaban di depan. 

## Kenapa Ini Penting?
Sehebat apapun kode Programmer, secantik apapun palet warna UI/UX Designer, semuanya akan jadi tong sampah berdebu jika produknya diciptakan tidak berangkat dari solusi *Kebutuhan Manusia (Penyelesaian Masalah Asli)*. PM bertugas sebagai pilar arsitek yang merumuskan rancang bangun: **"Apa visi sebenarnya dari fitur aplikasi yang akan kita buat hari ini?"**

## Membedah Gejala Penyakit (Masalah vs Solusi)

Tugas suci seorang Product Manager bukanlah menciptakan fitur. Tugas pertamanya adalah **Jatuh Cinta Pada Masalahnya, Bukan Pada Solusinya**.
- **Kebutuhan Palsu (Solusi Instan Klien):** "Saya ingin aplikasi web sekolah kita punya fitur filter 3D animasi melayang pakai *Augmented Reality (AR)*." (Hah? Buat apa sekolah butuh fitur itu?)
- **Akar Masalah Aslinya:** "Ternyata, para murid kesusahan mencari gedung letak posisi Toilet dan Kantin di hari pertama MPLS saking besarnya komplek bangunan kita."
Maka Solusi Benarnya adalah: *"Kita hanya butuh pembuatan fitur Peta 2D sekolah berwarna simpel dan jelas di halaman depan web, bukan animasi 3D!"*

## Menerjemahkan Solusi menjadi Kalimat (User Story)

Setelah tahu fitur apa yang benar-benar dibutuhkan, PM tidak boleh langsung menyuruh Programmer asal bikin *"Eh tolong bikinkan Peta di Web ya"*. Programmer akan kebingungan! Peta jenis apa?

PM harus menuliskannya menggunakan mantra sihir format standar industri global yang dinamakan **User Story**. 
Rumusnya selalu baku terdiri atas tiga bongkahan kalimat ajaib (Siapa - Apa - Mengapa):
> **Sebagai seorang** [Pemeran / User Persona], 
> **Saya ingin bisa** [Aksi fitur yang diminta], 
> **Agar saya dapat** [Alasan / Manfaat asli dari fitur tersebut]

**Contoh Mantra User Story yang Bagus:**
*"Sebagai seorang **Siswa Baru Kelas 10**, saya ingin **dapat melihat fitur Peta Interaktif Denah Sekolah di halaman Beranda**, agar **saya tidak kebingungan membuang waktu tersesat mencari letak Toilet atau Kantin pada minggu pertama orientasi MPLS**."*

Nah, jika Programmer dan Desainer membaca kalimat ini, mereka akan mengangguk tercerahkan. Mereka tahu *Untuk siapa* (Kelas 10), *Aksinya apa* (Peta denah), dan *Tujuannya* (Agar gak kesasar nyari toilet).

💡 **Wawasan: Kriteria Kelulusan Mutlak (Acceptance Criteria)**
Tentu saja, cerita *User Story* di atas harus diberi batas "Garis Finish / Lulus Syarat". Batas garis suci inilah yang kelak akan dipakai oleh divisi *QA Tester* di ujung bulan untuk mengetes kinerja si Programmer.
*Contoh Acceptance Criteria:*
- Peta denah harus muncul langsung tampil penuh dalam waktu muat loading kurang dari 2 detik.
- Terdapat ikon 'Bintang' khusus penanda letak spesifik Toilet Pria/Wanita dan Ruang Guru.

## Ringkasan
- Arsitek jembatan jendral penentu arah produk (berfokus menjawab pertanyaan *"Aplikasi apa yang sebaiknya kita kerjakan dan mengapa kita bikin ini?"*) dipimpin oleh tim **Product Manager (PM) / Analis Produk**.
- Mindset mutlak seorang PM adalah harus lebih dulu berempati menggali inti penderitaan **Akar Masalah** aslinya si User, daripada tergesa-gesa nafsu buta membangun solusi kemewahan fitur (*Jatuh cintalah pada masalahnya*).
- Formulasi bahasa instruksi yang dijembatani dari analisa pemikiran PM untuk dilempar jadi patokan para Programmer agar tidak salah sasaran disebut penulisan **User Story**.
- Susunan kerangka magis *User Story* wajib memiliki anatomi triad: **Sebagai seorang [Peran], Saya ingin [Aksi], Agar [Manfaat Keuntungan]**.

Penyakitnya sudah dirumuskan menjadi sebuah tujuan jelas *User Story*. Langkah selanjutnya: Bagaimana menyusun gambaran skema urutan langkah kaki perjalanan klik tombol aplikasinya sebelum diwarnai Desainer Figma? Mari tuangkan ilham ke dalam Diagram *Flowchart* di materi selanjutnya!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
