---
title: "Dunia Mobile App & Bahasa Dart"
order: 1
course: "mobile"
emoji: "📱"
---

Pernah berkhayal bikin aplikasi keren kayak Gojek atau Instagram yang bisa di-install langsung di HP teman-temanmu? Membuat aplikasi Mobile itu berbeda rasanya dengan membuat web. Layarnya kecil, tapi bisa bergetar, tahu lokasi GPS, dan punya akses kamera!

## Kenapa Ini Penting?
Hampir 70% pengguna internet di dunia saat ini berselancar menggunakan smartphone. Jika kamu menguasai cara membuat aplikasi HP (Mobile Dev), kamu menguasai kunci pasar digital masa depan.

## Native vs Cross-Platform

Dulu, kalau mau bikin aplikasi HP, kamu harus ngoding 2 kali lipat:
- **Native Android:** Ngoding pakai bahasa *Kotlin/Java*.
- **Native iOS (iPhone):** Ngoding ulang dari nol pakai bahasa *Swift*.
Sangat melelahkan bukan?

Sekarang ada sihir bernama **Cross-Platform**. Salah satu yang paling merajai saat ini adalah **Flutter** (buatan Google). Kamu cukup ngoding SEKALI, lalu tinggal klik *Build*, kodenya otomatis berubah jadi aplikasi Android `.apk` dan iOS sekaligus!

### Senjata Rahasia Flutter: Bahasa Dart
Flutter tidak memakai Python atau JavaScript, melainkan bahasa bernama **Dart**. Dart ini ibarat anak hasil perkawinan antara Java dan JavaScript: Sangat rapi (wajib menyebutkan tipe data) namun fleksibel.

Dart adalah bahasa berorientasi objek (**OOP** / Object-Oriented Programming).
Di OOP, segala sesuatu adalah *Objek* yang dicetak dari sebuah *Class* (Cetakan).

```dart
// Contoh Class (Cetakan) Kucing di Dart
class Kucing {
  String nama;
  String warna;

  Kucing(this.nama, this.warna); // Konstruktor (Cara membuat)

  void mengeong() {
    print("$nama si kucing $warna berkata: Meong!");
  }
}

void main() {
  // Membuat objek dari cetakan Kucing
  Kucing kucingku = Kucing("Bubu", "Oren");
  kucingku.mengeong(); 
}
```

## Ringkasan
- Pemrograman **Native** mengharuskan ngoding terpisah untuk Android dan iOS, sedangkan **Cross-Platform** (seperti Flutter) cukup 1 kali koding untuk semua.
- Flutter menggunakan bahasa pemrograman **Dart** (buatan Google).
- Dart sangat menjunjung tinggi konsep **OOP (Object-Oriented Programming)**, di mana segalanya berpusat pada *Class* dan *Object*.

Sudah kenal bahasanya? Ayo kita langsung rakit halaman pertamamu menggunakan "Widget"!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
