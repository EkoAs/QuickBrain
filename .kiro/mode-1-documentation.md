# Dokumentasi Mode 1: Perkalian

## Overview
Mode 1 adalah game perkalian interaktif dengan sistem poin dan timer. User harus memilih jawaban yang benar dari 4 pilihan dalam waktu 10 detik.

## Cara Kerja Lengkap

### 1. Inisialisasi Game
- Saat halaman dimuat, fungsi `initGame()` dipanggil
- Game state diatur: `score = 0`, `gameActive = true`
- Soal pertama di-generate

### 2. Generate Soal (`generateQuestion()`)
```javascript
// Contoh: 3 × 4 = ?
num1 = random(1-10)  // misal: 3
num2 = random(1-10)  // misal: 4
correctAnswer = 3 × 4 = 12
```

### 3. Generate Jawaban Jebakan
Sistem membuat 3 jawaban salah dengan algoritma:

**Strategi Jebakan:**
1. **Strategi ±**: Jawaban benar ± (1-5)
   - Misal: 12 + 3 = 15 atau 12 - 2 = 10
   
2. **Strategi Kelipatan**: Jawaban benar × 2 atau ÷ 2
   - Misal: 12 × 2 = 24 atau 12 ÷ 2 = 6
   
3. **Strategi Random Range**: Random dalam range ±10 dari jawaban benar
   - Misal: random antara 2-22

**Validasi Jebakan:**
- Tidak boleh duplikat
- Tidak boleh sama dengan jawaban benar
- Harus positif (> 0)

### 4. Shuffle Jawaban
Semua 4 jawaban (1 benar + 3 salah) di-acak menggunakan Fisher-Yates algorithm:
```javascript
[12, 15, 24, 10] → shuffle → [24, 10, 12, 15]
```
Ini memastikan posisi jawaban benar tidak selalu sama.

### 5. Display di HTML
```
┌─────────────────────────────┐
│  Poin: 5      Waktu: 10     │  ← Header
├─────────────────────────────┤
│                             │
│      3 × 4 = ?              │  ← Soal
│                             │
├──────────┬──────────────────┤
│    24    │       10         │  ← Grid 2×2
├──────────┼──────────────────┤
│    12    │       15         │  ← Jawaban
└──────────┴──────────────────┘
```

### 6. Timer System
```javascript
timer = 10 // Start dari 10 detik
setiap 1 detik:
  timer--
  update display
  
  if timer <= 3:
    tambahkan efek warning (kedip merah)
  
  if timer <= 0:
    GAME OVER
```

### 7. User Memilih Jawaban

#### Jika BENAR:
```javascript
1. Disable semua button
2. Stop timer
3. Highlight jawaban benar (hijau)
4. Score += 1
5. Play sound 'correct'
6. Delay 1 detik
7. Generate soal baru
8. Reset timer ke 10
9. Ulangi dari langkah 2
```

#### Jika SALAH:
```javascript
1. Disable semua button
2. Stop timer
3. Highlight jawaban salah (merah)
4. Highlight jawaban benar (hijau)
5. Play sound 'wrong'
6. Delay 1.5 detik
7. GAME OVER
```

### 8. Game Over Screen
```
┌─────────────────────────────┐
│     Game Selesai!           │
│                             │
│     Poin Akhir:             │
│         15                  │  ← Score besar
│                             │
│   [Main Lagi]               │  ← Restart
│   [Kembali ke Menu]         │  ← Back to menu
└─────────────────────────────┘
```

## Fitur-Fitur

### ✅ Sistem Poin
- Start: 0
- Setiap jawaban benar: +1
- Ditampilkan real-time di header
- Tidak berkurang jika salah (langsung game over)

### ✅ Timer 10 Detik
- Countdown dari 10 ke 0
- Update setiap detik
- Warning effect (kedip) saat ≤ 3 detik
- Game over jika waktu habis

### ✅ 4 Pilihan Jawaban
- 1 benar, 3 salah (jebakan pintar)
- Posisi diacak setiap soal
- Grid 2×2 responsif

### ✅ Visual Feedback
- Animasi pulse untuk jawaban benar (hijau)
- Animasi shake untuk jawaban salah (merah)
- Highlight kedua jawaban sebelum game over

### ✅ Responsive Design
- Desktop: Poin di sisi kanan header
- Mobile: Poin di bagian atas header
- Layout menyesuaikan layar
- Touch-friendly buttons

## File Structure Mode 1

```
data/
├── view/all-mode/
│   └── 1-multiplication.html     # HTML structure
├── css/mode-css/
│   └── 1-multiplication.css      # Styling khusus
└── js/logic/
    └── 1-multiplication.js       # Game logic
```

## Teknologi & Algoritma

### Random Number Generation
```javascript
randomInt(1, 10) // Menggunakan Math.random()
```

### Shuffle Algorithm
```javascript
// Fisher-Yates Shuffle
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
```

### Timer
```javascript
setInterval(() => {
    timer--;
    // Update UI
}, 1000);
```

## State Management

```javascript
const gameState = {
    score: 0,              // Current score
    currentQuestion: {},   // Soal saat ini
    timer: 10,             // Countdown timer
    timerInterval: null,   // Timer interval ID
    gameActive: false      // Apakah game sedang berjalan
}
```

## Event Flow Diagram

```
Page Load
    ↓
initGame()
    ↓
generateQuestion() → Display → Start Timer
    ↓                              ↓
User Click Answer         Timer === 0?
    ↓                              ↓
Check Answer                   Game Over
    ↓          ↓
  Benar     Salah
    ↓          ↓
  Score++   Game Over
    ↓
Next Question
    ↓
(Loop kembali ke generateQuestion)
```

## Testing Checklist

- [x] Soal perkalian generate dengan benar (1-10)
- [x] 4 pilihan jawaban muncul (1 benar, 3 salah)
- [x] Posisi jawaban benar selalu berubah
- [x] Timer countdown dari 10 ke 0
- [x] Game over saat timer habis
- [x] Poin bertambah saat jawaban benar
- [x] Game over saat jawaban salah
- [x] Restart game berfungsi
- [x] Kembali ke menu berfungsi
- [x] Responsive di mobile dan desktop
- [x] Visual feedback (animasi) bekerja

## Cara Simulasi/Testing

1. Buka `index.html` di browser
2. Klik "Mulai Bermain"
3. Pilih "Mode 1: Perkalian"
4. Mainkan dan uji semua fitur:
   - Jawab benar → Score naik, soal baru
   - Jawab salah → Game over
   - Tunggu timer habis → Game over
   - Restart → Game mulai lagi dari 0
   - Kembali ke menu → Navigate ke menu

## Future Enhancements

- [ ] Sistem difficulty (easy/medium/hard)
- [ ] Sound effects dengan audio files
- [ ] Leaderboard/high score
- [ ] Achievement system
- [ ] Power-ups (freeze timer, 50:50)
- [ ] Combo system (bonus poin untuk streak)
