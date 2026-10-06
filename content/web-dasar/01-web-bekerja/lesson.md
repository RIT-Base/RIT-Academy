---
title: "Bagaimana Web Bekerja"
order: 1
course: "web-dasar"
---

Setiap kali kamu buka website apapun itu mulai dari website baca berita, nonton video, atau
ngerjain tugas; sebenarnya ada proses yang cukup seru terjadi di balik layar,
dalam hitungan sepersekian detik. Sebelum mulai belajar nulis kode HTML,
penting buat kamu paham dulu **apa itu web sebenarnya dan gimana cara kerjanya**,
supaya semua yang kamu bangun nanti nggak cuma "ikut-ikutan tutorial" tapi kamu beneran mengerti.

## Browser, Request, dan Server

Bayangkan kamu mengetik `www.academy.tcc15.my.id` di address bar (tempat kamu ngetik nama website) lalu menekan Enter. Yang kamu pakai untuk membuka halaman mulai dari Chrome, Firefox, Edge, atau apa pun aplikasinya, itu namanya **browser**. Begitu kamu menekan Enter, browser
mengirim semacam "surat permintaan" ke komputer lain di internet yang
menyimpan website tersebut. Permintaan ini disebut **request**. Komputer yang
menyimpan dan melayani website itu disebut **server**. Server tugasnya menunggu
request datang, lalu membalas dengan **response** berupa halaman web yang
kamu lihat di layar.

Jadi alurnya sederhana: **Browser → Request → Server → Response**. Server
tidak selalu berupa mesin besar di ruangan ber-AC seperti yang sering
digambarkan di film atau buku. Server bisa juga berupa laptop biasa yang dikonfigurasi untuk melayanirequest, seperti yang akan kamu coba nanti disini.

## HTTP: Bahasa yang Dipakai Browser dan Server

Supaya browser dan server bisa saling mengirim pesan, mereka memakai aturan bersama yang
disebut **HTTP** (*HyperText Transfer Protocol*). HTTP mengatur format request
dan response supaya kedua pihak saling mengerti. Saat
kamu lihat `https://` di depan sebuah alamat website, huruf "S" di ujungnya
berarti komunikasi itu terenkripsi alias lebih aman. Sekarang, komunikasi antar jaringan biasanya menggunakan HTTPS agar pesan kamu aman dan tidak dapat dilihat oleh orang lain.

## URL: Alamat di Dunia Web

Alamat website yang kamu ketik tadi disebut **URL** (*Uniform Resource
Locator*). URL punya beberapa bagian penting: protokol (`https://`), nama
domain (`academy.tcc15.my.id`), dan kadang ada path tambahan seperti
`/materi/web-dasar` yang menunjuk ke halaman spesifik di dalam website itu.
Setiap bagian ini membantu browser tahu persis server mana yang harus
dihubungi, dan halaman mana yang diminta dari server tersebut.

Coba edit kode di bawah ini dan ganti isi `<h1>` :

```html
<!-- Ini contoh halaman HTML paling sederhana -->
<h1>Halo dari TCC Academy!</h1>
<p>Ini paragraf pertamamu. Coba ganti isinya dan lihat perubahannya</p>
```

## Kenapa Kita Harus Tahu?

Nanti waktu kamu belajar HTML, sebenarnya kamu sedang belajar **menulis isi
dari response** yang dikirim dari server ke browser. Waktu belajar bahasa
pemrograman nantinya (di modul-modul lanjutan), kamu akan belajar **membuat
server yang menyusun response tersebut**. Jadi dua hal ini saling
berhubungan dan harus dipahami dulu. Yap, sekarang kamu sudah tahu gambaran besarnya sebelum masuk
ke detail teknis.

Sebagai latihan terakhir, coba lengkapi contoh kartu profil sederhana di
bawah ini dengan menambahkan sebuah paragraf `<p>` berisi deskripsi singkat
tentang dirimu:

```html
<h1>Profil Anggota TCC</h1>
<!-- Tambahkan <p> berisi deskripsi singkat tentang dirimu di bawah ini -->
```

Setelah paham konsep di atas, coba jawab task di kartu checkpoint di bawah ini.
