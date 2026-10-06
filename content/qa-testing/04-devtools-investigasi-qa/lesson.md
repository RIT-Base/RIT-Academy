---
title: "Investigasi Error dengan Browser DevTools"
order: 4
course: "qa-testing"
emoji: "🔍"
---

Mengeklik aplikasi seperti orang awam dan melihat layar nge-*freeze* (macet) itu bagus. Tapi QA Tester yang dibayar mahal tidak hanya bilang "Ini aplikasinya macet." QA level Dewa akan bilang: *"Aplikasi macet karena API Login membalas dengan status 500 Internal Server Error akibat salah format JSON di balasan Backend!"*

Dari mana sang QA bisa tahu isi perut (Backend) aplikasi padahal ia cuma mencoba *test* dari luar Browser? Jawabannya ada pada jurus rahasia bernama **Chrome Developer Tools (DevTools)**.

## Kenapa Ini Penting?
Tanpa alat *X-Ray* untuk mengintip tembus pandang ini, kamu dan *Programmer*-mu hanya akan saling tebak-tebakan buta soal penyebab error. *DevTools* menelanjangi semua proses komunikasi internet dan eror logika ngoding yang disembunyikan oleh browser.

## 3 Mata Batin Sang Tester (F12)

Coba buka browser Google Chrome-mu, lalu tekan tombol **F12** (Atau klik kanan layar ➔ *Inspect*).
Layar samping canggih akan terbuka! Ini adalah gudang senjata kita. Ada 3 Menu (*Tab*) yang wajib kamu kuasai sebagai QA Tester web:

### 1. Tab "Elements" (Sang Pembongkar Wajah)
Saat kamu merasa bahwa kotak tombol ini ukurannya terlalu kecil sehingga susah dipencet jempol, jangan asal tebak. Gunakan fitur *Inspect Element* (ikon kursor panah). Arahkan mouse ke tombol itu. 
Di situ kamu akan bisa MENGUBAH nilai CSS (Warna, Lebar, Spasi) sementara secara instan tanpa perlu merusak kode sumber. Ini berguna untuk merekam bukti ke klien: *"Lihat nih, kalau ukurannya saya naikin 10px, tombolnya jauh lebih pas!"*

### 2. Tab "Console" (Kotak Curhat Mesin JavaScript)
Seringkali saat kamu pencet tombol, di layar HP gak terjadi reaksi apapun, tak ada pop up sama sekali (Terdiam kaku). 
Buka tab `Console`! 
Jika kode aslinya salah tulis (Typo oleh programmer, misalnya fungsi `KirimSatu()` ditulis `KirimZatu()`), maka tab ini akan penuh dengan darah (Teks Error Merah besar) bertuliskan: **"Uncaught ReferenceError: KirimZatu is not defined"**.
Laporan tulisan darah merah ini WAJIB kamu fotokan ke *Bug Report*! Programmer akan sujud memuja kehebatan laporan investigasimu.

### 3. Tab "Network" (Jalur Intai Penyadapan Jasa Kurir API)
Ini ranah Investigasi Detektif FBI level tertinggi.
Buka tab `Network`, pastikan layarmu mulai merekam bulatan merah, lalu lakukan pencet tombol Login palsu.
Kamu akan melihat daftar "Kardus Paket Pesan" (API) yang meluncur terbang dari browsermu menuju server Gudang Backend jauh!
Klik paket data tersebut! Kamu akan melihat:
- **Headers:** Kode pengirimannya apakah lolos (200 OK) atau ditolak satpam (401 Unauthorized), atau Gudangnya lagi terbakar (500 Server Error). (Ingat lagi Modul Web Dev Backend!)
- **Payload:** Apa wujud persis password JSON yang diam-diam dibawa terbang kurir ini?
- **Timing:** Astaga! Paket datanya lama banget baru sampai ke tujuan (waktu antarnya 5000 ms / 5 Detik). Pantas saja aplikasinya ngelag!

💡 **Wawasan: Trik Jaringan Lemot (Network Throttling)**
Di Tab Network ini, kamu bisa pura-pura mencekik kecepatan sinyal HP-mu menjadi level jaringan `Slow 3G`. Ini sangat luar biasa berharga untuk menguji: *"Apa yang terjadi pada desain layarku kalau target pasarku buka aplikasi di daerah sinyal hutan di desa pedalaman tanpa 4G?"*

## Ringkasan
- Tool magis **Developer Tools (DevTools / Inspect Element F12)** di Chrome/Edge/Firefox adalah mata ketiganya para QA Tester untuk melihat dan mengurai logika isi perut web secara tembus pandang tanpa akses *source code* (sumber kodingan).
- **Tab Elements** sangat diandalkan untuk uji coba perubahan kosmetik ukuran/warna UI secara *live preview*.
- Segala kelakuan cacat typo kode logika *JavaScript* programmer yang terhenti tiba-tiba tanpa reaksi akan langsung terekam memuntahkan jejak teks saksi darah merah di menu **Tab Console**.
- Menu **Tab Network** ibarat alat penyadap FBI untuk memantau kemacetan lajur waktu (*Timing Lag*) pengiriman, Status HTTP sandi pengiriman (seperti *200* atau *500*), serta paket bawaan *Payload* dari perantaraan komunikasi API Backend.

Uji coba penelusuran manual satu-persatu ala FBI selesai sudah. Capek kan kalau besok fiturnya harus kamu uji coba keliling klik lagi dari awal? Gimana kalau kita sewa "Robot Hantu" buat tolong tukang ngekliknya? Meluncurlah ke kelas Test Otomasi di modul terakhir!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
