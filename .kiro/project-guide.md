# Panduan Project Math Game

## Deskripsi Project
Aplikasi game matematika berbasis web dengan 7 mode permainan. Setiap mode melatih kemampuan matematika dengan cara yang berbeda.

## Struktur File Project

```
/
├── index.html                          # Halaman selamat datang
├── data/
│   ├── view/
│   │   ├── menu.html            # Menu utama - daftar mode dalam kotak
│   │   └── all-mode/
│   │       ├── 1-multiplication.html   # Mode 1: Perkalian
│   │       ├── 2-addition.html        # Mode 2: Penjumlahan
│   │       ├── 3-subtraction.html     # Mode 3: Pengurangan
│   │       ├── 4-division.html        # Mode 4: Pembagian
│   │       ├── 5-target.html          # Mode 5: Target
│   │       ├── 6-middle-value.html    # Mode 6: Nilai Tengah
│   │       └── 7-memory.html          # Mode 7: Memori
│   ├── css/
│   │   ├── main.css                   # Style utama (menu, welcome)
        |   responsive.css
│   │   └── mode-css/
│   │       ├── 1-multiplication.css   # Style khusus mode 1
│   │       ├── 2-addition.css         # Style khusus mode 2
│   │       ├── 3-subtraction.css      # Style khusus mode 3
│   │       ├── 4-division.css         # Style khusus mode 4
│   │       ├── 5-target.css           # Style khusus mode 5
│   │       ├── 6-middle-value.css     # Style khusus mode 6
│   │       └── 7-memory.css           # Style khusus mode 7
│   └── js/
│       ├── main.js                    # Fungsi shared (sound, transition)
│       └── logic/
│           ├── 1-multiplication.js    # Logic mode 1
│           ├── 2-addition.js          # Logic mode 2
│           ├── 3-subtraction.js       # Logic mode 3
│           ├── 4-division.js          # Logic mode 4
│           ├── 5-target.js            # Logic mode 5
│           ├── 6-middle-value.js      # Logic mode 6
│           └── 7-memory.js            # Logic mode 7
```

## Alur Aplikasi

1. **index.html** → User melihat halaman selamat datang
2. **menu-utama.html** → User memilih mode (ditampilkan dalam kotak-kotak)
3. **Mode Game** → User bermain sesuai mode yang dipilih
4. **Game Over** → Tampilkan hasil dan opsi kembali ke menu

## Cara Kerja Mode 1 (Multiplication)

### Sistem Game
- **Angka**: Menggunakan angka 1-10 untuk soal perkalian
- **Format**: User memilih jawaban dari 4 kotak yang tersedia
  - 1 jawaban benar
  - 3 jawaban jebakan (salah)
- **Proses**:
  1. Soal perkalian ditampilkan (misal: 3 × 4 = ?)
  2. 4 pilihan jawaban muncul dalam kotak
  3. User klik salah satu kotak
  4. Jika **BENAR** → Poin +1, soal baru muncul
  5. Jika **SALAH** → Game selesai, tampilkan total poin

### Fitur Poin
- Poin mulai dari 0
- Setiap jawaban benar: poin +1
- Poin ditampilkan di bagian atas atau sisi (responsive terhadap perangkat)
- Format: "Poin: X" atau "Score: X"

### Fitur Timer
- Waktu maksimal per soal: **10 detik**
- Timer countdown dari 10 → 0
- Jika waktu habis sebelum user menjawab → Game Over
- Timer reset ke 10 detik setiap soal baru
- Tampilan: Visual countdown di layar

### Algoritma Jawaban Jebakan
1. Hitung jawaban benar (a × b)
2. Generate 3 jawaban salah yang masuk akal:
   - Jawaban benar ± (1-5)
   - Jawaban benar × 2
   - Jawaban random dalam range yang wajar
3. Acak posisi 4 jawaban (shuffle) agar jawaban benar tidak selalu di posisi sama

## Responsif Design
- **Desktop**: Poin di sisi kanan atau atas
- **Mobile/Tablet**: Poin di bagian atas
- Layout otomatis menyesuaikan ukuran layar

## Teknologi
- HTML5
- CSS3 (dengan media queries untuk responsive)
- Vanilla JavaScript (ES6+)
- Tidak menggunakan framework

## Konvensi Penamaan File
- Lowercase dengan hyphen: `menu-utama.html`
- Numbered prefix untuk mode: `1-multiplication.js`
- Bahasa Inggris untuk nama file
- Bahasa Indonesia untuk konten UI (opsional)
