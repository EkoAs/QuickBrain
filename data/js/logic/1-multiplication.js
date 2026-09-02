// Mode 1: Multiplication Game Logic

// Game state
let score = 0;
let currentQuestion = {};
let timer = 10;
let timerInterval = null;
let gameActive = false;

// DOM Elements
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer-btn');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Generate random number between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate multiplication question
function generateQuestion() {
    const num1 = randomInt(1, 10);
    const num2 = randomInt(1, 10);
    const correctAnswer = num1 * num2;
    
    // Generate 3 wrong answers (jebakan)
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
        let wrong;
        const randomChoice = randomInt(1, 3);
        
        if (randomChoice === 1) {
            // Correct answer ± (1-5)
            wrong = correctAnswer + randomInt(-5, 5);
        } else if (randomChoice === 2) {
            // Correct answer × 2 atau ÷ 2
            wrong = randomInt(0, 1) === 0 ? correctAnswer * 2 : Math.floor(correctAnswer / 2);
        } else {
            // Random dalam range wajar
            wrong = randomInt(correctAnswer - 10, correctAnswer + 10);
        }
        
        // Pastikan tidak duplikat dan tidak sama dengan jawaban benar
        if (wrong !== correctAnswer && wrong > 0 && !wrongAnswers.includes(wrong)) {
            wrongAnswers.push(wrong);
        }
    }
    
    // Gabungkan semua jawaban dan shuffle
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    return {
        question: `${num1} × ${num2} = ?`,
        correctAnswer: correctAnswer,
        answers: allAnswers
    };
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display question and answers
function displayQuestion() {
    currentQuestion = generateQuestion();
    questionElement.textContent = currentQuestion.question;
    
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    
    resetTimer();
}

// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        
        // Warning effect saat waktu tinggal 3 detik
        if (timer <= 3) {
            timerElement.classList.add('timer-warning');
        } else {
            timerElement.classList.remove('timer-warning');
        }
        
        // Game over jika waktu habis
        if (timer <= 0) {
            stopTimer();
            endGame();
        }
    }, 1000);
}

// Reset timer
function resetTimer() {
    stopTimer();
    timer = 10;
    timerElement.textContent = timer;
    timerElement.classList.remove('timer-warning');
    if (gameActive) {
        startTimer();
    }
}

// Stop timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Check answer
function checkAnswer(selectedAnswer) {
    if (!gameActive) return;
    
    // Disable all buttons
    answerButtons.forEach(btn => btn.disabled = true);
    stopTimer();
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
        // Jawaban benar
        score++;
        scoreElement.textContent = score;
        playSound('correct');
        
        // Highlight correct answer
        answerButtons.forEach(btn => {
            if (parseInt(btn.textContent) === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        // Next question setelah delay
        setTimeout(() => {
            displayQuestion();
        }, 1000);
    } else {
        // Jawaban salah - game over
        playSound('wrong');
        
        // Highlight wrong and correct answers
        answerButtons.forEach(btn => {
            const btnAnswer = parseInt(btn.textContent);
            if (btnAnswer === selectedAnswer) {
                btn.classList.add('wrong');
            }
            if (btnAnswer === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        setTimeout(() => {
            endGame();
        }, 1500);
    }
}

// End game
function endGame() {
    gameActive = false;
    stopTimer();
    playSound('gameover');
    
    // Hide game area, show game over screen
    gameArea.style.display = 'none';
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

// Restart game
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    
    gameOverScreen.classList.add('hidden');
    gameArea.style.display = 'flex';
    
    gameActive = true;
    displayQuestion();
}

// Initialize game
function initGame() {
    gameActive = true;
    displayQuestion();
}

// Event listeners
answerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = parseInt(btn.textContent);
        checkAnswer(answer);
    });
});

restartBtn.addEventListener('click', restartGame);

// Start game when page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});
