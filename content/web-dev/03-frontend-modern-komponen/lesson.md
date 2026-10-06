---
title: "Frontend Modern & Arsitektur Komponen"
order: 3
course: "web-dev"
emoji: "🧩"
---

Bayangkan kamu sedang mendesain website Tokopedia. Ada halaman Home, halaman Kategori, dan halaman Hasil Pencarian. Di ketiga halaman itu, ada sebuah kotak persegi bernama "Kartu Produk". Apakah kamu akan mengetik ulang kode HTML `<div>` kartu produk tersebut ratusan kali di tiap halaman? Sangat buang waktu, bukan?

## Kenapa Ini Penting?
Website modern saat ini bukanlah kumpulan "Halaman" (Pages), melainkan kumpulan **"Komponen"**. Inilah alasan raksasa tech seperti Facebook menciptakan **React.js** (atau framework serupa seperti Vue, Svelte, dan Astro).

## Paradigma Balok Lego (Komponen)

Di Frontend modern, kita merakit website layaknya menyusun balok lego.
Alih-alih menulis HTML biasa, kita membuat *Komponen Reusable* (bisa dipakai ulang).

```jsx
// Contoh komponen 'KartuProduk'
function KartuProduk() {
  return (
    <div className="kartu">
      <h3>Nama Barang</h3>
      <p>Rp 50.000</p>
      <button>Beli</button>
    </div>
  )
}
```
Lalu, kamu tinggal "memanggilnya" berkali-kali: `<KartuProduk />`, `<KartuProduk />`. Keren kan?

### Kirim Data dengan Props (Properti)
Tentu saja, kita tidak mau nama barangnya sama semua! Kita bisa memberikan "pesanan khusus" ke komponen tersebut, yang disebut **Props**.

```jsx
function KartuProduk(props) {
  return (
    <div className="kartu">
      <h3>{props.nama}</h3>
      <p>Rp {props.harga}</p>
      <button>Beli</button>
    </div>
  )
}

// Memanggil lego dengan data berbeda:
// <KartuProduk nama="Baju Kaos" harga="50000" />
// <KartuProduk nama="Topi Keren" harga="20000" />
```

### Ingatan Komponen: State
Bagaimana komponen tahu jika barangnya sudah masuk keranjang? Kita butuh **State** (Memori ingatan). State adalah variabel super yang jika nilainya berubah, tampilan web akan langsung ter-update (ter-render) otomatis tanpa di-*refresh*!

💡 **Wawasan: Single Page Application (SPA)**
Karena framework React bekerja dengan merakit ulang balok lego komponen, perpindahan halaman tidak perlu *loading* ulang layaknya website lama. Ini disebut arsitektur *SPA*. Rasanya mulus seperti membuka aplikasi di HP!

## Ringkasan
- Framework UI modern (React, Vue) bekerja menggunakan arsitektur **Komponen** (bongkar-pasang seperti lego).
- **Props** digunakan untuk mengirim data spesifik ke dalam sebuah komponen.
- **State** digunakan untuk mengingat perubahan interaksi (seperti status diklik, jumlah di keranjang).
- Kelebihannya adalah dapat menciptakan **SPA** yang loading halamannya mulus dan cepat.

Tampilan Frontend (Wajah web) kita sudah canggih. Tapi di mana kita menyimpan data "Keranjang" itu secara permanen? Mari beralih ke Backend!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
