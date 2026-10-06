---
title: "Git Lanjutan: Kolaborasi Tanpa Rusuh"
order: 1
course: "devops"
emoji: "🌿"
---

Dulu kita sudah kenalan dengan dasar Git (`commit` & `push`). Tapi itu kan ngoding sendirian. Coba bayangkan jika di sebuah perusahaan ada 5 programmer mengedit file `index.html` yang sama di waktu yang bersamaan. Hasilnya pasti kodenya berantakan tumpang tindih! Di sinilah DevOps harus menertibkannya.

## Kenapa Ini Penting?
Dalam tim profesional, *Developer* tidak diizinkan mengubah kode utama (Main Code) secara langsung. Menguasai alur kerja *Branching* (Cabang) dan *Pull Request* adalah syarat mutlak bekerja di industri teknologi (Standard Industri Git Flow).

## Fitur Penyelamat Tim: Branching (Percabangan)

Jangan pernah koding eksperimen / bikin fitur baru di atas garis waktu utama (disebut cabang `main` atau `master`).
Solusinya? Kamu harus meng-*Copy* kode tersebut ke ruang kerja paralel milikmu sendiri!

1. **Membuat Cabang Baru:** 
   `git checkout -b fitur-login-baru`
   Sekarang kamu berada di semesta alternatif bernama "fitur-login-baru". Apapun yang kamu rusak di sini tidak akan berpengaruh ke kode temanmu di cabang `main`.
2. **Commit Karyamu:** 
   Kamu sudah puas dengan hasil kodinganmu? `git commit -m "menambah sistem login JWT"`
3. **Mengirim Permintaan Gabung (Pull Request / PR):**
   Kamu *push* cabangmu ke GitHub, lalu menekan tombol hijau **"Pull Request"**. Ini artinya: *"Halo tim, tugasku sudah selesai nih, tolong direview dong sebelum digabungkan ke kode utama!"*

## Tragedi di Tengah Jalan: Merge Conflict!

Lalu bagaimana jika saat kamu asyik koding fitur Login, rekanmu (Si Budi) ternyata telah lebih dulu menggabungkan kode miliknya ke `main`, dan kodenya Budi kebetulan menghapus baris fungsi yang juga sedang kamu pakai?

Akan timbul tulisan horor berwarna merah: **MERGE CONFLICT!**

Ini wajar. Git pada dasarnya kebingungan: *"Ada 2 versi kode berbeda untuk baris 10, versi siapa yang mau dipakai?"*. 
Solusinya sederhana: Git akan memberimu tanda `<<<<<<< HEAD` dan `>>>>>>>`. 
Kamu dan Si Budi harus duduk bersama, membuka file tersebut, lalu *secara manual* memilih dan menghapus baris kode mana yang akan dipertahankan. Selesai!

💡 **Wawasan: Aturan Commit Profesional**
Jangan buat pesan *commit* yang isinya: `"asdasdasd"` atau `"update file"`. Buatlah *Conventional Commits*, misal: `feat: menambah halaman profil user` atau `fix: memperbaiki error tombol merah saat diklik`.

## Ringkasan
- Dalam kolaborasi tim, JANGAN pernah mengedit kode langsung di cabang utama (`main`). 
- Selalu gunakan **Branch (Cabang)** (`git checkout -b`) agar pekerjaanmu terisolasi dan aman.
- Ajukan **Pull Request (PR)** di GitHub untuk meminta tim me-review kodemu sebelum kode itu disatukan (di-*merge*).
- Jika Git bingung menyatukan kode yang bertabrakan, ia akan memunculkan **Merge Conflict** yang mengharuskanmu merapikannya secara manual.

Kamu sudah jago berkolaborasi dalam tim. Nah, sesudah kode itu tergabung utuh di GitHub, bagaimana cara memindahkannya ke komputer Server asli yang tak punya monitor? Lanjut!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
