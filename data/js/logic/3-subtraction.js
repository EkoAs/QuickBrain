// Subtraction game mode logic placeholder
// Mode 3: Subtraction Game Logic

// Game state
let score = 0;
let currentQuestion = {};
let timer = 10;
let timerInterval = null;
let gameActive = false;

// DOM Elements
const correctAnswerMessage = document.getElementById('correctAnswerMessage');
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

// Generate SUBTRACTION question
function generateQuestion() {
    let num1 = randomInt(5, 50); // Range 5 to 50
    let num2 = randomInt(1, 50); 
    
    // PREVENT NEGATIVE RESULTS: If num1 is smaller than num2, swap them
    if (num1 < num2) {
        let temp = num1;
        num1 = num2;
        num2 = temp;
    }
    
    const correctAnswer = num1 - num2;
    
    // Generate 3 wrong answers (decoys)
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
        let wrong;
        const randomChoice = randomInt(1, 3);
        
        if (randomChoice === 1) {
            // Strategy 1: Slightly off (± 1 to 5)
            wrong = correctAnswer + (randomInt(0, 1) === 0 ? randomInt(1, 5) : randomInt(-5, -1));
        } else if (randomChoice === 2) {
            // Strategy 2: Tens error (common borrowing mistake in subtraction)
            // Example: 42 - 17 = 25, decoy could be 35 or 15
            wrong = correctAnswer + (randomInt(0, 1) === 0 ? 10 : -10);
        } else {
            // Strategy 3: Random around the correct answer
            wrong = randomInt(correctAnswer - 10, correctAnswer + 10);
        }
        
        // Ensure no duplicates, not equal to correct answer, and at least 0
        if (wrong !== correctAnswer && wrong >= 0 && !wrongAnswers.includes(wrong)) {
            wrongAnswers.push(wrong);
        }
    }
    
    // Combine all answers and shuffle
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    return {
        question: `${num1} - ${num2} = ?`,
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
        
        // Warning effect when time is 3 seconds or less
        if (timer <= 3) {
            timerElement.classList.add('timer-warning');
        } else {
            timerElement.classList.remove('timer-warning');
        }
        
        // Game over if time runs out
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
        // Correct answer
        score++;
        scoreElement.textContent = score;
        if (typeof playSound === 'function') playSound('correct');
        
        // Highlight correct answer
        answerButtons.forEach(btn => {
            if (parseInt(btn.textContent) === currentQuestion.correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        // Next question after delay
        setTimeout(() => {
            displayQuestion();
        }, 1000);
    } else {
        // Wrong answer - game over
        if (typeof playSound === 'function') playSound('wrong');
        
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
    if (typeof playSound === 'function') playSound('gameover');
    
    // NEW: Display the correct answer for the last question
    if (currentQuestion && currentQuestion.question && correctAnswerMessage) {
        // Replace '?' with the actual correct answer
        const solvedEquation = currentQuestion.question.replace('?', currentQuestion.correctAnswer);
        correctAnswerMessage.textContent = `Correct Answer: ${solvedEquation}`;
    }
    
    // Hide game area, show game over screen
    gameArea.style.display = 'none';
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

// Restart game
function restartGame() {
    score = 0;
    scoreElement.textContent = score;
    
    // NEW: Clear the message when restarting
    if (correctAnswerMessage) {
        correctAnswerMessage.textContent = "";
    }
    
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

// Mock function placeholder for playSound
if (typeof playSound !== 'function') {
    window.playSound = function(type) {
        // console.log("Sound played: " + type);
    };
}