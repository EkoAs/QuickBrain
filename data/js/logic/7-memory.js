// Mode 7: Memory Grid Game Logic

// Game State
let level = 1;
let gridSize = 3; 
let activeTilesCount = 3; 
let activeTiles = []; 
let playerClicks = 0;
let isAcceptingInput = false;

// Timer State
let countdownTimer;
let timeLeft = 20;

// DOM Elements
const scoreElement = document.getElementById('score');
const statusText = document.getElementById('statusText');
const timerElement = document.getElementById('timer'); // Element Timer
const memoryGrid = document.getElementById('memoryGrid');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Initialize Game
function initGame() {
    level = 1;
    gridSize = 3; 
    activeTilesCount = 3; 
    
    scoreElement.textContent = level;
    gameOverScreen.classList.add('hidden');
    gameArea.style.display = 'block'; 
    
    // Reset Timer
    clearInterval(countdownTimer);
    if(timerElement) {
        timerElement.textContent = "20";
        timerElement.classList.remove('timer-warning');
    }
    
    startLevel();
}

// Start a new level
function startLevel() {
    isAcceptingInput = false;
    playerClicks = 0;
    activeTiles = [];
    memoryGrid.innerHTML = ''; 
    
    // Turn off timer while memorizing
    clearInterval(countdownTimer);
    if(timerElement) {
        timerElement.textContent = "20";
        timerElement.classList.remove('timer-warning');
    }
    
    memoryGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    memoryGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    const totalTiles = gridSize * gridSize;
    
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('memory-tile', 'disabled');
        tile.dataset.index = i;
        
        tile.addEventListener('click', () => handleTileClick(tile, i));
        memoryGrid.appendChild(tile);
    }
    
    while (activeTiles.length < activeTilesCount) {
        const randomId = Math.floor(Math.random() * totalTiles);
        if (!activeTiles.includes(randomId)) {
            activeTiles.push(randomId);
        }
    }
    
    statusText.textContent = "Memorize!";
    statusText.style.color = "#ffea00"; // Yellow warning
    
    setTimeout(() => {
        showPattern();
    }, 800);
}

// Show the tiles to remember
function showPattern() {
    const tiles = document.querySelectorAll('.memory-tile');
    
    activeTiles.forEach(index => {
        tiles[index].classList.add('highlight');
    });
    
    const displayTime = Math.max(600, 1500 - (level * 50)); 
    
    setTimeout(() => {
        hidePattern(tiles);
    }, displayTime);
}

// Hide the pattern and start the timer
function hidePattern(tiles) {
    tiles.forEach(tile => {
        tile.classList.remove('highlight');
        tile.classList.remove('disabled'); 
    });
    
    statusText.textContent = "Your Turn!";
    statusText.style.color = "#00e676"; // Green
    isAcceptingInput = true;

    // Start 20 second timer
    startTimer();
}

// Timer countdown logic
function startTimer() {
    clearInterval(countdownTimer);
    timeLeft = 20;
    
    countdownTimer = setInterval(() => {
        timeLeft--;
        if(timerElement) timerElement.textContent = timeLeft;

        // Give red warning if remaining time <= 5 seconds
        if (timeLeft <= 5 && timerElement) {
            timerElement.classList.add('timer-warning');
        }

        // If time runs out
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            gameOver(true); // true = game over due to timeout
        }
    }, 1000);
}

// Handle player clicks
function handleTileClick(tile, index) {
    if (!isAcceptingInput) return;
    if (tile.classList.contains('correct')) return; 
    
    if (activeTiles.includes(index)) {
        tile.classList.add('correct');
        playerClicks++;
        
        if (typeof playSound === 'function') playSound('correct');
        
        if (playerClicks === activeTilesCount) {
            levelComplete();
        }
    } else {
        tile.classList.add('wrong');
        gameOver(false); // false = game over due to wrong click
    }
}

// Proceed to next level
function levelComplete() {
    isAcceptingInput = false;
    clearInterval(countdownTimer); // Stop timer when winning
    
    statusText.textContent = "Good Job!";
    statusText.style.color = "#38bdf8";
    
    level++;
    scoreElement.textContent = level;
    
    activeTilesCount++; 
    
    if (level % 2 !== 0 && gridSize < 7) { 
        gridSize++;
    }
    
    setTimeout(() => {
        startLevel();
    }, 1200);
}

// End the game
function gameOver(isTimeOut = false) {
    isAcceptingInput = false;
    clearInterval(countdownTimer); // Stop timer
    
    // Change text based on loss reason
    if (isTimeOut) {
        statusText.textContent = "Time's Up!";
    } else {
        statusText.textContent = "Wrong Tile!";
    }
    statusText.style.color = "#ff003c"; // Red
    
    if (typeof playSound === 'function') playSound('gameover');
    
    const tiles = document.querySelectorAll('.memory-tile');
    activeTiles.forEach(index => {
        if (!tiles[index].classList.contains('correct')) {
            tiles[index].classList.add('highlight');
        }
    });
    
    setTimeout(() => {
        gameArea.style.display = 'none';
        gameOverScreen.classList.remove('hidden');
        finalScoreElement.textContent = level;
    }, 2000);
}

// Event Listeners
restartBtn.addEventListener('click', initGame);

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

// Mock playSound function just in case main.js is missing
if (typeof playSound !== 'function') {
    window.playSound = function(type) { };
}