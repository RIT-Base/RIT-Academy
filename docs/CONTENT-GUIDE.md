# Panduan Konten TCC Academy

Dokumen ini untuk **Sensei** yang menambah/mengedit materi — tidak perlu
menyentuh kode platform sama sekali. Semua materi = dua file per modul:
`lesson.md` (isi bacaan) dan `tasks.json` (soal checkpoint).

## 1. Struktur folder

```
content/
├── index.json              ← daftar course & urutan modul (lihat §4)
├── paths/index.json         ← daftar learning path (lihat §5)
├── _templates/modul/        ← CONTOH lengkap, salin dari sini
│   ├── lesson.md
│   └── tasks.json
├── web-dasar/
│   └── 01-web-bekerja/
│       ├── lesson.md
│       └── tasks.json
├── level0/                  ← siapkan modul baru di sini
└── python-dasar/            ← siapkan modul baru di sini
```

Untuk menambah modul baru:

1. Salin folder `content/_templates/modul/` ke `content/<course>/<slug-modul>/`.
2. Edit `lesson.md` dan `tasks.json` sesuai isi (lihat §2 & §3).
3. Tambahkan entri modul itu ke `content/index.json` (lihat §4) supaya
   muncul di halaman Belajar.
4. Folder/file yang namanya diawali `_` (seperti `_templates`) **diabaikan**
   oleh platform — aman dipakai untuk simpanan/contoh.

Tidak perlu proses build apa pun — cukup simpan file, refresh browser.

## 2. Format `lesson.md`

```markdown
---
title: "Judul Modul"
order: 1
course: "web-dasar"
---

Isi materi dalam Markdown biasa (marked.js). Bisa pakai heading (`##`),
list, **tebal**, *miring*, tautan, dsb.

​```html
<h1>Contoh kode HTML yang bisa dicoba siswa</h1>
​```

​```python
print("Contoh kode Python yang bisa dijalankan siswa")
​```
```

Aturan penting:

- **Front matter** (bagian di antara `---`) wajib punya `title`, `order`,
  `course`. Tulis apa adanya, tanpa syntax YAML rumit (tidak ada list/nested).
- Blok kode berpagar (fenced code block) berbahasa **html** atau **python**
  otomatis berubah jadi **mini lab interaktif** langsung di dalam materi —
  siswa bisa Run kodenya di situ juga.
- **Urutan blok kode penting**: dihitung 1, 2, 3, ... dari atas ke bawah
  (hanya blok `html`/`python`, blok bahasa lain seperti contoh syntax di
  dokumen ini tidak dihitung). Nomor ini dipakai task lewat `"block": <n>`
  di `tasks.json` (lihat §3).
- Tulis materi singkat, jelas, bahasa santai — ingat audiensnya anggota
  baru yang baru belajar sampai HTML.

## 3. Format `tasks.json`

```json
{
  "editor": "html",
  "starter": "<h1>Judul</h1>",
  "hint": "Petunjuk umum kalau siswa stuck.",
  "tasks": [
    {
      "id": "t1",
      "type": "html-contains",
      "params": { "selector": "h1", "text": "Judul" },
      "hint": "Petunjuk khusus task ini."
    }
  ]
}
```

Field root:

| Field | Wajib? | Keterangan |
|---|---|---|
| `editor` | ya | `"html"` atau `"python"` — tipe editor di kartu checkpoint |
| `starter` | ya | Kode awal yang muncul di editor checkpoint |
| `hint` | tidak | Petunjuk umum, tampil di atas daftar task |
| `tasks` | ya | Array task, minimal 1 |

**Setiap task dinilai dari kode di editor checkpoint** (mulai dari isi
`starter`, atau perubahan siswa terhadapnya) — **kecuali** task punya field
opsional `"block": <n>`, yang membuat task itu dinilai dari blok kode
interaktif ke-`n` di `lesson.md` (lihat §2). Berguna kalau kamu mau siswa
mengerjakan langsung di dalam materi, bukan di kartu checkpoint terpisah.

### Tipe task yang tersedia

| `type` | `params` | Lolos kalau |
|---|---|---|
| `html-contains` | `{ "selector": "h1", "text": "opsional" }` | Elemen sesuai `selector` ada di HTML (dicek pakai `querySelector`), dan kalau `text` diisi, teks elemen itu mengandung string tsb |
| `python-output` | `{ "contains": "..." }` **atau** `{ "exact": "..." }` | Output program (stdout, whitespace ujung dipangkas) mengandung/menyamai string yang diminta |
| `python-test` | `{ "fn": "nama_fungsi(2,3)", "equals": "5" }` | Kode dijalankan, lalu ekspresi `fn` dievaluasi dan `str()`-nya sama dengan `equals` |
| `quiz` | `{ "question": "...", "options": ["...","...","..."], "answer": 1 }` | Siswa memilih opsi dengan index `answer` (0-based) |

Setiap task wajib punya `id` (unik dalam modul itu) dan `type`. Field `hint`
per-task opsional, ditampilkan kalau task itu gagal.

**Semua task di satu modul harus lolos** supaya modul dianggap selesai dan
tombol "Lanjut ke Modul Berikutnya" muncul.

## 4. `content/index.json`

Daftar course + urutan modulnya, dipakai halaman Beranda & Belajar:

```json
{
  "courses": [
    {
      "slug": "web-dasar",
      "title": "Web Dasar",
      "description": "...",
      "icon": "🌐",
      "modules": [
        { "slug": "01-web-bekerja", "title": "Bagaimana Web Bekerja", "order": 1 }
      ]
    }
  ]
}
```

`slug` course & modul harus sama persis dengan nama foldernya di
`content/<course>/<modul>/`. `order` menentukan urutan tampil sekaligus
urutan "unlock" modul berikutnya (lihat cara kerja progress di README.md).

## 5. `content/paths/index.json`

Daftar learning path (roadmap per bidang IT), satu file berisi semua path:

```json
{
  "paths": [
    {
      "slug": "web-dev",
      "title": "Web Development",
      "icon": "🌐",
      "summary": "...",
      "stages": [
        { "title": "Nama tahap", "description": "Penjelasan tahap ini." }
      ]
    }
  ]
}
```

Path dengan roadmap belum lengkap cukup diisi satu stage `"Segera hadir"`
seperti contoh yang sudah ada — nanti tinggal ditambah tahapannya.

## 6. Yang TIDAK perlu Sensei lakukan

- Tidak perlu sentuh file di `assets/` (itu kode platform).
- Tidak perlu bikin halaman HTML baru untuk tiap modul — semua modul otomatis
  tampil lewat `materi.html?course=...&modul=...`.
- Tidak perlu mikirin styling — tampilan sudah mengikuti komponen yang ada.
