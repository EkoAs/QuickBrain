# Math Game Project Guide

## Project Overview
A web-based math game application with 7 different game modes. Each mode trains mathematical skills in different ways. Currently, Mode 1 (Multiplication) is fully implemented.

## Project Structure

```
/
├── index.html                          # Welcome/landing page
├── data/
│   ├── view/
│   │   ├── menu.html            # Main menu - displays all game modes
│   │   └── all-mode/
│   │       ├── 1-multiplication.html   # Mode 1: Multiplication (IMPLEMENTED)
│   │       ├── 2-addition.html        # Mode 2: Addition (placeholder)
│   │       ├── 3-subtraction.html     # Mode 3: Subtraction (placeholder)
│   │       ├── 4-division.html        # Mode 4: Division (placeholder)
│   │       ├── 5-target.html          # Mode 5: Target (placeholder)
│   │       ├── 6-middle-value.html    # Mode 6: Middle Value (placeholder)
│   │       └── 7-memory.html          # Mode 7: Memory (placeholder)
│   ├── css/
│   │   ├── main.css                   # Shared styles (menu, welcome)
            responsive.css
│   │   └── mode-css/
│   │       └── 1-multiplication.css   # Mode 1 specific styles
│   └── js/
│       ├── main.js                    # Shared functions (sound, transitions)
│       └── logic/
│           └── 1-multiplication.js    # Mode 1 game logic
```

## Navigation Flow

```
index.html (Welcome Page)
    ↓
menu.html (Mode Selection)
    ↓
1-multiplication.html (Game Mode)
    ↓
Game Over Screen → [Restart | Back to Menu]
```

## Mode 1 (Multiplication) - Game Logic

### Core Game Mechanics

**Numbers Range**: 1-10 for both operands
**Answer Format**: 4 choices (1 correct, 3 decoys)
**Timer**: 10 seconds countdown per question
**Scoring**: +1 point per correct answer

### Game Flow

```
1. Initialize Game
   ↓
2. Generate Question (num1 × num2)
   ↓
3. Generate 4 Answers:
   - 1 correct answer
   - 3 wrong answers (smart decoys)
   ↓
4. Shuffle answer positions (Fisher-Yates)
   ↓
5. Start 10-second timer
   ↓
6. User selects answer OR timer reaches 0
   ↓
7a. IF CORRECT:
    - Score += 1
    - Show green animation
    - Generate new question (loop to step 2)
   ↓
7b. IF WRONG or TIMEOUT:
    - Show red animation
    - Display Game Over screen
    - Show final score
```

### Answer Generation Algorithm

**Correct Answer**: `num1 × num2`

**Decoy Generation Strategies** (3 wrong answers):
1. **Strategy ±**: correctAnswer ± random(1-5)
2. **Strategy Multiple**: correctAnswer × 2 OR correctAnswer ÷ 2
3. **Strategy Range**: random(correctAnswer - 10, correctAnswer + 10)

**Validation Rules**:
- Must not equal correct answer
- Must be positive (> 0)
- Must not duplicate other decoys

**Shuffle**: Use Fisher-Yates algorithm to randomize positions

```javascript
// Fisher-Yates Shuffle
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
```

### State Management

**Game State Variables**:
```javascript
{
    score: 0,                    // Current score
    currentQuestion: {
        question: "3 × 4 = ?",   // Display text
        correctAnswer: 12,       // Correct answer
        answers: [12, 15, 8, 24] // All 4 shuffled answers
    },
    timer: 10,                   // Countdown timer
    timerInterval: null,         // Timer interval ID
    gameActive: true             // Is game running
}
```

### Timer System

```
Timer starts at 10 seconds
    ↓
Countdown every 1 second
    ↓
If timer <= 3: Add warning effect (red blink)
    ↓
If timer <= 0: Game Over
    ↓
On correct answer: Reset to 10 seconds
```

### Event Handling

**User Click Answer**:
1. Disable all buttons
2. Stop timer
3. Check if answer is correct
4. If correct:
   - Increment score
   - Highlight green
   - Wait 1 second
   - Load next question
5. If wrong:
   - Highlight wrong (red) and correct (green)
   - Wait 1.5 seconds
   - Show Game Over

**Timer Expires**:
1. Stop timer
2. Trigger Game Over

**Restart Button**:
1. Reset score to 0
2. Hide Game Over screen
3. Show game area
4. Generate new question

### Key Functions

**Core Functions**:
- `initGame()` - Initialize game state and first question
- `generateQuestion()` - Create math problem with correct + decoy answers
- `displayQuestion()` - Render question and answers to DOM
- `shuffleArray()` - Randomize answer positions
- `startTimer()` - Begin countdown
- `resetTimer()` - Reset to 10 seconds
- `checkAnswer()` - Validate user selection
- `endGame()` - Show Game Over screen
- `restartGame()` - Reset and start new game

**Shared Functions** (in main.js):
- `playSound(type)` - Play audio feedback (placeholder)
- `transitionTo(url)` - Smooth page navigation
- `fadeIn(element)` - Fade in animation
- `fadeOut(element)` - Fade out animation

### DOM Elements

```javascript
// Score and Timer
scoreElement       = document.getElementById('score')
timerElement       = document.getElementById('timer')

// Question and Answers
questionElement    = document.getElementById('question')
answerButtons      = document.querySelectorAll('.answer-btn')

// Screens
gameArea           = document.getElementById('gameArea')
gameOverScreen     = document.getElementById('gameOver')
finalScoreElement  = document.getElementById('finalScore')
restartBtn         = document.getElementById('restartBtn')
```

## UI/UX Features

### Visual Feedback
- **Correct Answer**: Green gradient + pulse animation
- **Wrong Answer**: Red gradient + shake animation
- **Timer Warning**: Red blink when ≤ 3 seconds

### Responsive Design
- **Desktop**: Score and timer side by side in header
- **Mobile**: Score and timer stacked vertically
- Grid layout adjusts to screen size
- Touch-friendly button sizes

### CSS Animations

```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

@keyframes timerBlink {
    0%, 100% { color: white; }
    50% { color: #ff0000; }
}
```

## Technology Stack

- **HTML5**: Structure
- **CSS3**: Styling with gradients, animations, flexbox, grid
- **Vanilla JavaScript (ES6+)**: Logic, no frameworks
- **Media Queries**: Responsive design

## File Naming Convention

- Lowercase with hyphens: `menu-utama.html`
- Numbered prefixes for modes: `1-multiplication.js`
- English for file names
- Indonesian for UI content (optional)

## Implementation Status

✅ **Completed**:
- Welcome page with navigation
- Main menu with 7 mode boxes (Mode 1 active, 2-7 disabled)
- Mode 1 fully functional:
  - Question generation (1-10 range)
  - 4 answer choices with smart decoys
  - Shuffled answer positions
  - 10-second timer with warning
  - Score tracking
  - Visual feedback animations
  - Game over screen
  - Restart functionality
  - Responsive design

⏳ **Pending**:
- Modes 2-7 (use Mode 1 as template)
- Sound effects (audio files)
- High score/leaderboard
- Difficulty levels

## Quick Start for AI Agents

To implement other modes (2-7):
1. Copy `1-multiplication.html/css/js` files
2. Rename to target mode number
3. Modify `generateQuestion()` function for different operations:
   - Mode 2: Addition (`num1 + num2`)
   - Mode 3: Subtraction (`num1 - num2`)
   - Mode 4: Division (ensure integer results)
   - Mode 5: Target (custom logic)
   - Mode 6: Middle Value (median finding)
   - Mode 7: Memory (sequence recall)
4. Adjust decoy generation strategy per mode
5. Update CSS theme colors if desired
6. Enable mode in `menu-utama.html`

## Testing Checklist

- [ ] Questions generate correctly (valid range)
- [ ] 4 answers display (1 correct, 3 wrong)
- [ ] Answer positions randomized each question
- [ ] Timer counts down from 10 to 0
- [ ] Timer expiry triggers game over
- [ ] Correct answer: score increments, new question loads
- [ ] Wrong answer: game over with final score
- [ ] Restart button resets game
- [ ] Back to menu navigation works
- [ ] Responsive on mobile and desktop
- [ ] Animations play correctly
