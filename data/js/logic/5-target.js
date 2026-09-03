// Target game mode logic placeholder
// Mode 5: Target (Find 2 numbers) Game Logic

// Game state
let score = 0;
let currentQuestion = {};
let timer = 15; // Extra time because it's harder
let timerInterval = null;
let gameActive = false;
let selectedButtons = []; // Array to store up to 2 clicked buttons

// DOM Elements
const correctAnswerMessage = document.getElementById('correctAnswerMessage');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.target-btn');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Generate random number between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate TARGET question (Numbers 1-10)
function generateQuestion() {
    const operators = ['+', '-', '×', '÷'];
    const operator = operators[randomInt(0, 3)];
    
    let num1, num2, targetResult;
    
    if (operator === '+') {
        num1 = randomInt(1, 10);
        num2 = randomInt(1, 10);
        targetResult = num1 + num2;
    } else if (operator === '-') {
        num1 = randomInt(1, 10);
        num2 = randomInt(1, 10);
        if (num1 < num2) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        targetResult = num1 - num2;
    } else if (operator === '×') {
        num1 = randomInt(1, 10);
        num2 = randomInt(1, 10);
        targetResult = num1 * num2;
    } else if (operator === '÷') {
        // Strict predefined pairs to ensure clean division and numbers within 1-10
        const validDivisions = [
            [10,5], [10,2], [10,1], [9,3], [9,1], [8,4], [8,2], [8,1],
            [7,1], [6,3], [6,2], [6,1], [5,1], [4,2], [4,1], [3,1], [2,2], [2,1], [1,1]
        ];
        const pair = validDivisions[randomInt(0, validDivisions.length - 1)];
        num1 = pair[0];
        num2 = pair[1];
        targetResult = num1 / num2;
    }
    
    // Create an array with the 2 correct answers
    const answers = [num1, num2];
    
    // Fill the remaining 4 slots with random numbers (1-10)
    while (answers.length < 6) {
        answers.push(randomInt(1, 10));
    }
    
    // Shuffle the 6 numbers
    shuffleArray(answers);
    
    return {
        question: `? ${operator} ? = ${targetResult}`,
        operator: operator,
        targetResult: targetResult,
        answers: answers,
        correctPair: [num1, num2] // NEW: Save the correct pair for game over screen
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
    selectedButtons = []; // Reset selections
    
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.classList.remove('correct', 'wrong', 'selected');
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
        
        if (timer <= 0) {
            stopTimer();
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    stopTimer();
    timer = 15; // Set back to 15 seconds
    timerElement.textContent = timer;
    timerElement.classList.remove('timer-warning');
    if (gameActive) {
        startTimer();
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Handle button selection
function handleSelection(clickedBtn) {
    if (!gameActive || clickedBtn.disabled) return;
    
    // Deselect if already clicked
    if (clickedBtn.classList.contains('selected')) {
        clickedBtn.classList.remove('selected');
        selectedButtons = selectedButtons.filter(btn => btn !== clickedBtn);
        return;
    }
    
    // Allow selection only if less than 2 buttons are selected
    if (selectedButtons.length < 2) {
        clickedBtn.classList.add('selected');
        selectedButtons.push(clickedBtn);
    }
    
    // If 2 buttons are selected, verify the answer immediately
    if (selectedButtons.length === 2) {
        verifyAnswer();
    }
}

// Verify the combination of the 2 selected numbers
function verifyAnswer() {
    // Disable all buttons to prevent clicking while evaluating
    answerButtons.forEach(btn => btn.disabled = true);
    stopTimer();
    
    let val1 = parseInt(selectedButtons[0].textContent);
    let val2 = parseInt(selectedButtons[1].textContent);
    let isCorrect = false;
    const op = currentQuestion.operator;
    const target = currentQuestion.targetResult;
    
    // Check both combinations (val1 op val2) OR (val2 op val1)
    if (op === '+') {
        isCorrect = (val1 + val2 === target);
    } else if (op === '-') {
        isCorrect = (val1 - val2 === target || val2 - val1 === target);
    } else if (op === '×') {
        isCorrect = (val1 * val2 === target);
    } else if (op === '÷') {
        isCorrect = (val1 / val2 === target || val2 / val1 === target);
    }
    
    if (isCorrect) {
        // Correct answer
        score++;
        scoreElement.textContent = score;
        if (typeof playSound === 'function') playSound('correct');
        
        selectedButtons[0].classList.replace('selected', 'correct');
        selectedButtons[1].classList.replace('selected', 'correct');
        
        setTimeout(() => {
            displayQuestion();
        }, 1000);
    } else {
        // Wrong answer
        if (typeof playSound === 'function') playSound('wrong');
        
        selectedButtons[0].classList.replace('selected', 'wrong');
        selectedButtons[1].classList.replace('selected', 'wrong');
        
        setTimeout(() => {
            endGame();
        }, 1500);
    }
}

function endGame() {
    gameActive = false;
    stopTimer();
    if (typeof playSound === 'function') playSound('gameover');
    
    // NEW: Display the correct pair for Mode 5
    if (currentQuestion && correctAnswerMessage) {
        const num1 = currentQuestion.correctPair[0];
        const num2 = currentQuestion.correctPair[1];
        const op = currentQuestion.operator;
        const target = currentQuestion.targetResult;
        
        correctAnswerMessage.textContent = `Correct Answer: ${num1} ${op} ${num2} = ${target}`;
    }
    
    gameArea.style.display = 'none';
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

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

function initGame() {
    gameActive = true;
    displayQuestion();
}

// Event listeners for the 6 target buttons
answerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        handleSelection(btn);
    });
});

restartBtn.addEventListener('click', restartGame);

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

if (typeof playSound !== 'function') {
    window.playSound = function(type) {};
}