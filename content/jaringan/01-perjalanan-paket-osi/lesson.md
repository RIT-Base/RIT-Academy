---
title: "Perjalanan Paket Data: Model OSI 7 Layer"
order: 1
course: "jaringan"
emoji: "📦"
---

Pernah kepikiran gimana caranya pesan WhatsApp "Hai" yang kamu ketik di kamarmu, bisa sampai ke HP temanmu di belahan benua lain hanya dalam waktu setengah detik? Di balik kemudahan itu, ada sebuah proses estafet super rumit yang dipotong-potong menjadi 7 tahapan. Ahli jaringan menyebutnya sebagai **Model OSI (Open Systems Interconnection)**.

## Kenapa Ini Penting?
Model OSI ini seperti buku manual montir mobil. Kalau ada masalah jaringan internet mati total, teknisi IT tidak akan menebak acak. Mereka akan mengecek kerusakannya secara sistematis lapisan demi lapisan, mulai dari "Apakah kabelnya putus (Layer bawah)?" sampai "Apakah aplikasinya error (Layer atas)?".

## Estafet 7 Lapisan OSI (OSI Layers)

Bayangkan proses pengiriman pesan ini seperti perusahaan logistik paket yang canggih (Dari atas ke bawah):

7. **Application (Layar Aplikasi):** Aplikasi WA di HP-mu. Tempat di mana pesan "Hai" diketik pertama kali.
6. **Presentation (Layar Terjemah/Enkripsi):** Pesan "Hai" tadi tidak mungkin dikirim mentah karena bahaya jika disadap. Pesan ini diterjemahkan (*Translate*) dan di-*Encrypt* menjadi deretan angka acak.
5. **Session (Layar Komunikasi):** Aplikasi WhatsApp lalu "menelepon" dan "menjaga sambungan" (Sesi) khusus langsung dengan Server Meta/WA di Amerika Serikat.
4. **Transport (Layar Transportasi - Kurir):** Pesan yang panjang tadi akan DIPOTONG-POTONG menjadi "Kardus Kecil" (Paket Segmen Data).
   - Di sini, *kurir* punya 2 sistem pengantaran utama: **TCP** dan **UDP**. *(Akan kita bahas di bawah!)*
3. **Network (Layar Alamat Jalan):** Setiap 'kardus kecil' tadi ditempeli stiker nama pengirim dan nama penerima berupa **Alamat IP (IP Address)**. Di lapisan inilah "Router" (tukang sortir jalan) memandu kardusnya mencari jalur kabel tercepat.
2. **Data Link (Layar Kurir Lokal):** Mengecek apakah ada kesalahan saat loncat dari satu perempatan tiang listrik WiFi ke tiang lainnya berdasar kode fisik alat (**MAC Address**).
1. **Physical (Layar Fisik):** Seluruh pesan kardus tadi dihancurkan menjadi cahaya listrik (*Sinyal Biner 0 dan 1*) murni, lalu ditembakkan melalui gelombang Radio WiFi atau ditransfer lewat Kabel Serat Optik bawah laut! 

Setelah cahaya itu sampai di HP temanmu di Amerika, sistem akan merekonstruksi lapisannya dari tahap 1 NAIK ke tahap 7, dan layar HP temanmu akan menampilkan tulisan "Hai"! Ajaib!

💡 **Wawasan: Kurir TCP vs UDP (Layer 4 Transport)**
1. **Kurir TCP (Transmission Control Protocol):** Sangat andal tapi lambat. Jika ada satu 'kardus' yang tertinggal di laut, kurir ini akan memaksa ngirim ulang. **(Cocok untuk Chat Teks dan File Download. Pesan teks tidak boleh kurang satu huruf pun!)**
2. **Kurir UDP (User Datagram Protocol):** Kurir ugal-ugalan tapi super ngebut. Dia terus melempar kardus paket tanpa peduli apakah diterima atau hilang. **(Cocok untuk Live Streaming Video atau Game Online kompetitif. Kamu rela patah resolusi video sejenak, daripada video tersebut mendadak berhenti total untuk menunggu pemulihan data).**

## Ringkasan
- Data di internet tidak dikirim utuh dalam 1 glundungan besar, melainkan dipotong menjadi **Paket** kecil-kecil yang melalui **7 Lapis Model OSI**.
- Lapisan terbawah (Fisik) berurusan dengan wujud sinyal gelombang dan listrik kabel. Lapisan tengah bertugas memastikan jalur alamat (**Alamat IP**) via Router. Lapisan atas berkaitan dengan Aplikasi software di HP.
- Pengantaran paket punya 2 sistem: **TCP** sangat teliti (meminta paket dikirim ulang jika ada yg hilang, cocok buat teks/download), sementara **UDP** asal cepat namun rentan kehilangan sebagian data (cocok buat live video/game).

Sudah paham cara data terkirim melintasi lautan? Selanjutnya, mari kita bedah nomor cantik pelat alamat pengiriman yang digunakan kurir internet: Alamat IP!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
