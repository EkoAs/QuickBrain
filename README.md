# 🎮 QuickBrain - Math Game

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://your-username.github.io/QuickBrain/)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=for-the-badge&logo=github)](https://your-username.github.io/QuickBrain/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

A fast-paced, interactive math training game featuring 7 unique game modes designed to sharpen your arithmetic skills. Built with pure HTML, CSS, and JavaScript.

![QuickBrain Banner](https://via.placeholder.com/1200x400/0a0a0a/ff4d6d?text=QuickBrain+Math+Game)

## 🌟 Features

- **7 Unique Game Modes** - Each mode tests different math skills
- **Beautiful UI** - Dark cherry blossom theme with glassmorphism effects
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Timer-Based Challenges** - Race against the clock
- **Progressive Difficulty** - Memory mode gets harder as you advance
- **Sound Effects** - Audio feedback for correct/wrong answers
- **Show Correct Answer** - Learn from mistakes when game ends

## 🎯 Game Modes

### 1. 🧮 Multiplication
Solve multiplication problems quickly. Perfect for mastering times tables.
- **Timer:** 10 seconds per question
- **Objective:** Find the correct product

### 2. ➕ Addition
Test your addition speed with numbers ranging from 1 to 30.
- **Timer:** 10 seconds per question
- **Objective:** Find the correct sum

### 3. ➖ Subtraction
Calculate differences between numbers (5-50 range).
- **Timer:** 10 seconds per question
- **Objective:** Find the correct difference

### 4. ➗ Division
Practice division with clean whole number results.
- **Timer:** 10 seconds per question
- **Objective:** Find the correct quotient

### 5. 🎯 Target Pair
Given a target result (e.g., `? + ? = 8`), find the two numbers that make the equation true.
- **Timer:** 15 seconds per question
- **Objective:** Select 2 correct numbers from 6 options
- **Unique:** Tests pattern recognition and quick thinking

### 6. ❓ Middle Value
Fill in the missing number in mixed operation equations (e.g., `5 + ? = 12`).
- **Timer:** 10 seconds per question
- **Objective:** Find the missing middle value
- **Operations:** +, -, ×, ÷

### 7. 🧠 Memory Grid
Watch the pattern, remember the positions, and click tiles in the correct order.
- **Timer:** 20 seconds to recall
- **Objective:** Reproduce the shown pattern
- **Progressive:** Grid size increases with each level (2×2 → 3×3 → 4×4...)
- **Space Theme:** Beautiful cosmic background with shooting stars

## 🚀 Quick Start

### Play Online
Visit the live demo: **[QuickBrain Math Game](https://your-username.github.io/QuickBrain/)**

### Run Locally
1. Clone the repository:
```bash
git clone https://github.com/your-username/QuickBrain.git
```

2. Navigate to the project folder:
```bash
cd QuickBrain
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

That's it! No build process or dependencies required.

## 📁 Project Structure

```
QuickBrain/
├── index.html                 # Landing page
├── data/
│   ├── view/
│   │   ├── Welcome.html       # Game modes guide
│   │   ├── menu-utama.html    # Main menu
│   │   └── all-mode/          # Individual game mode pages
│   │       ├── 1-multiplication.html
│   │       ├── 2-addition.html
│   │       ├── 3-subtraction.html
│   │       ├── 4-division.html
│   │       ├── 5-target.html
│   │       ├── 6-middle-value.html
│   │       └── 7-memory.html
│   ├── css/
│   │   ├── main.css           # Shared styles
│   │   ├── responsive.css     # Responsive utilities
│   │   └── mode-css/          # Mode-specific styles
│   │       ├── 1-multiplication.css
│   │       ├── 2-addition.css
│   │       ├── 3-subtraction.css
│   │       ├── 4-division.css
│   │       ├── 5-target.css
│   │       ├── 6-middle-value.css
│   │       └── 7-memory.css
│   └── js/
│       ├── main.js            # Shared utilities (sound effects)
│       └── logic/             # Game logic for each mode
│           ├── 1-multiplication.js
│           ├── 2-addition.js
│           ├── 3-subtraction.js
│           ├── 4-division.js
│           ├── 5-target.js
│           ├── 6-middle-value.js
│           └── 7-memory.js
└── README.md
```

## 🎨 Design

### Theme
- **Primary Colors:** Dark cherry blossom gradient (black → crimson → dark red)
- **Accent Color:** Bright red (#ff003c, #ff4d6d)
- **Style:** Glassmorphism with backdrop blur effects
- **Background:** Animated floating math symbols

### Typography
- **Font Family:** Segoe UI, system fonts
- **Headers:** Gradient text effects
- **Body:** High contrast white text on dark backgrounds

### Animations
- Fade-in entrance animations
- Floating background symbols
- Button hover effects with scale transforms
- Timer warning (red pulsing at 3 seconds)
- Shooting stars (Mode 7)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling (Grid, Flexbox, Animations, Backdrop Filter)
- **JavaScript (ES6+)** - Game logic and interactivity
- **No frameworks or libraries** - Pure vanilla JavaScript

## 🎮 How to Play

1. **Start**: Click "Start Playing" on the landing page
2. **Learn**: Read the game modes guide
3. **Select**: Choose one of 7 game modes from the main menu
4. **Play**: Solve problems before the timer runs out
5. **Score**: Each correct answer adds 1 point
6. **Game Over**: One wrong answer or time-out ends the game
7. **Restart**: Click "Play Again" to try for a higher score

## 💡 Tips & Tricks

- **Mode 1-4, 6:** One wrong answer ends the game immediately
- **Mode 5:** You need to select exactly 2 numbers
- **Mode 7:** Pay attention to the sequence, not just the positions
- **Timer Warning:** Red flash means you have ≤3 seconds left
- **Mobile:** Works great on phones in portrait mode

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contribution
- Add new game modes
- Implement leaderboard system
- Add difficulty levels
- Create more themes
- Add achievements/badges
- Multiplayer mode

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic math training games
- Design influenced by modern glassmorphism trends
- Special thanks to all contributors

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- **GitHub:** [@your-username](https://github.com/your-username)
- **Project Link:** [https://github.com/your-username/QuickBrain](https://github.com/your-username/QuickBrain)

---

<div align="center">

**Made with ❤️ and lots of ☕**

[⬆ Back to Top](#-quickbrain---math-game)

</div>
