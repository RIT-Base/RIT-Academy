---
title: "Otomasi Tugas & Bot Komunikasi"
order: 4
course: "data-ai"
emoji: "⚡"
---

Apakah kamu capek mengingatkan teman-teman di grup kelasm untuk mengumpulkan tugas PR setiap malam? Bagaimana kalau kamu memprogram "Robot Asisten" yang hidup di Discord atau Telegram, dan secara otomatis cerewet setiap pukul 19:00? Selamat datang di ranah Automasi (Automation)!

## Kenapa Ini Penting?
Salah satu keunggulan terbesar ilmu programming adalah kemampuannya mengambil alih tugas rutin yang membosankan dari tangan manusia. Menggabungkan kode program dengan ekosistem Chat App besar (Telegram/Discord) melahirkan asisten virtual tak kenal lelah.

## Anatomi Pembuatan Bot

Pembuatan robot obrolan (Bot) sebenarnya sangat mirip dengan cara kerja Web Server. Ia terus berjalan di latar belakang, mendengarkan obrolan orang (Membaca Data Masuk), dan bereaksi (Mengirim Data Balasan).

### 1. Kunci API Bot
Pertama-tama, kamu harus mendaftarkan identitas robotmu di platform tujuan.
- Untuk Telegram, bicara ke "BotFather" guna mendapatkan Token API panjang.
- Untuk Discord, buat aplikasi di Portal Developer Discord.
Token ini (contoh: `12345:AAHxxx_XXX`) adalah nyawa bot tersebut. HARAP RAHASIAKAN TOKEN INI layaknya kamu merahasiakan password emailmu (Taruh di file `.env`)!

### 2. Logika Sederhana Pendengar (Listener)

Kita menggunakan library Python khusus (misal `discord.py` atau `python-telegram-bot`) untuk mempermudah codingan.
Alur logikanya adalah **Event Driven** (Berbasis Kejadian):

```python
# CONTOH LOGIKA DISCORD BOT SEDERHANA

# 1. Kejadian (Event) ketika Bot berhasil hidup dan terkoneksi ke Server
@client.event
async def on_ready():
    print('Bot Asisten Kelas 10 sudah online dan siap bekerja!')

# 2. Kejadian (Event) setiap kali ada tulisan baru muncul di grup chat
@client.event
async def on_message(message):
    
    # Abaikan jika yang ngomong adalah bot ini sendiri
    if message.author == client.user:
        return
        
    # Cek kata kunci: Jika ada yang mengeluh 'tugas', bot akan bereaksi!
    if 'tugas' in message.content.lower():
        await message.channel.send('Woi, jangan ngeluh! Ingat PR Matematika besok pagi!')
```

### 3. Menggabungkan dengan Otak AI
Kamu juga bisa mengawinkan *Fetch API* LLM (dari modul sebelumnya) ke dalam Bot ini! 
Jadi, ketika ada yang me-*mention* botmu, alih-alih merespon pesan kaku buatan if/else, botmu bisa melempar pesan itu ke sistem AI (seperti OpenAI API / Gemini API), dan memberikan balasan pintar layaknya manusia!

## Ringkasan
- Bot obrolan (Chat Bot) sangat digemari untuk otomasi tugas karena langsung terintegrasi di platform yang banyak dipakai orang (Discord/Telegram).
- Diperlukan **Kunci Token API** rahasia yang terdaftar pada platform untuk mengoperasikan Bot. Jaga token ini agar tidak bocor ke internet!
- Program Bot bekerja dengan logika **Event-Driven** (akan bereaksi jika terjadi *event/kejadian* tertentu, seperti masuknya sebuah pesan baru di ruang chat).

Luar biasa! Otomasi jalan, data siap dimainkan. Saatnya proyek terakhir: kita ikat semua ilmu data menjadi sebuah "Papan Pemantauan" mutakhir!

Sudah paham? Kerjakan task di kartu checkpoint di bawah 👇
