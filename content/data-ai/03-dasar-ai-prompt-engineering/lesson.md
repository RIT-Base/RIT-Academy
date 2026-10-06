---
title: "Membedah Cara Kerja AI & Prompt Engineering"
order: 3
course: "data-ai"
emoji: "🤖"
---

Kalian pasti sudah sering mengobrol dengan ChatGPT, Gemini, atau Claude. Mereka seakan hidup dan sangat pintar. Tapi tahukah kamu, sejatinya mereka (yang disebut **LLM** atau *Large Language Model*) ini tidak benar-benar "berpikir" seperti manusia? Mereka sebenarnya adalah mesin prediksi tebak kata yang sangat, sangat canggih.

## Kenapa Ini Penting?
Kalau kamu paham cara kerja mesin pencari teks ini di belakang layar, kamu akan berhenti mengetik perintah/pertanyaan yang bertele-tele. Kamu bisa mengatur respon mereka persis seperti yang kamu butuhkan. Teknik mengatur perintah ini disebut **Prompt Engineering**.

## Anatomi Large Language Model (LLM)

Saat kamu bertanya: *"Siapakah presiden..."*, LLM tidak langsung membuka buku pintar. Ia mencari dalam triliunan database kata di otaknya, dan menebak bahwa kata statistik terbanyak yang muncul setelah tiga kata itu adalah: *"pertama"*, lalu tebakan berikutnya *"Indonesia"*, dan seterusnya. Proses pecah-kata ini dikenal sebagai perhitungan **Token**.

Namun, karena AI sangat hobi "memprediksi" kata demi kata (agar jawabannya tidak putus), terkadang jika ia tidak tahu faktanya, ia akan merangkai kata fiktif yang terdengar sangat masuk akal! Ini disebut dengan **Halusinasi AI**.

## Rumus Prompt Engineering yang Presisi

Memerintah AI layaknya *"Bikinkan aku program absen sekolah"* itu salah kaprah dan akan menghasilkan kode sampah. AI membutuhkan konteks yang padat!

Gunakan formula sakti 4 elemen ini saat mendikte AI: **Role, Task, Context, Format.**

### 1. Role (Peran)
Berikan persona/sifat kepada sang AI sejak awal kalimat.
- *"Bertindaklah sebagai Senior Programmer Python dengan 10 tahun pengalaman."*

### 2. Task (Tugas Spesifik)
Apa gol tunggal yang harus ia selesaikan. Jangan merangkap tugas.
- *"Tulis kode program algoritma kehadiran sederhana."*

### 3. Context (Konteks Kondisi)
Batasan dan keadaan khusus yang sedang kamu hadapi.
- *"Program ini dibuat tanpa antarmuka GUI (hanya berjalan di command line terminal), dan ditargetkan untuk komputer Windows jadul."*

### 4. Format (Wujud Output)
Kunci jawaban agar rapi (jangan biarkan AI mengoceh panjang lebar!).
- *"Keluarkan kode finalnya TANPA disertai penjelasan teori. Langsung kodenya saja."*

💡 **Wawasan:** Coba gabungkan 4 elemen di atas jadi 1 paragraf prompt. Dijamin respon bot akan 100x lipat lebih presisi dan sesuai maumu!

## Ringkasan
- Model bahasa besar (**LLM**) menghasilkan jawaban melalui proses probabilitas (tebak kata beruntun yang dihitung per **Token**).
- Karena didorong untuk memprediksi kata-kata natural, AI bisa merangkai cerita salah yang terkesan sangat meyakinkan (disebut **Halusinasi**).
- **Prompt Engineering** adalah teknik menyusun kalimat instruksi agar AI mengeluarkan respon maksimal dan anti-sampah.
- Selalu patuhi formula anatomi prompt: **Role** (Peran), **Task** (Tugas), **Context** (Konteks), dan **Format** (Hasil akhir yang diinginkan).

Kamu sudah paham otak sang AI. Sekarang, waktunya memasang otak tersebut ke dalam program otomatisasi (Bot) yang bisa ngobrol otomatis!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
