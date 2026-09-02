# Quick Start - Math Game

## 🚀 Cara Menjalankan

1. Buka file `index.html` di browser
2. Klik "Mulai Bermain"
3. Pilih "Mode 1: Perkalian"
4. Mainkan!

## 📁 Dokumentasi Lengkap

- **project-guide.md** - Panduan lengkap struktur project
- **mode-1-documentation.md** - Detail cara kerja Mode 1

## ✨ Fitur Mode 1 yang Sudah Berfungsi

✅ Soal perkalian angka 1-10  
✅ 4 pilihan jawaban (1 benar, 3 jebakan)  
✅ Timer 10 detik countdown  
✅ Sistem poin  
✅ Game over saat salah/waktu habis  
✅ Responsive design (mobile & desktop)  
✅ Visual feedback (animasi hijau/merah)  

## 🎮 Cara Bermain

1. Lihat soal perkalian (contoh: 3 × 4 = ?)
2. Pilih jawaban dari 4 kotak
3. Jika **BENAR**: Poin +1, soal baru muncul
4. Jika **SALAH**: Game over, tampil total poin
5. Timer 10 detik per soal - jangan sampai habis!

## 📱 Struktur File Implementasi

```
index.html                              # Welcome page
data/view/menu-utama.html               # Menu pilih mode
data/view/all-mode/1-multiplication.html # Game Mode 1
data/css/main.css                       # Style shared
data/css/mode-css/1-multiplication.css  # Style Mode 1
data/js/main.js                         # Fungsi shared
data/js/logic/1-multiplication.js       # Logic Mode 1
```

## 🛠️ Mode Lain (Belum Diimplementasi)

Mode 2-7 masih placeholder. Mode 1 adalah template yang bisa dikembangkan untuk mode lainnya.
