// Memory game mode logic placeholder
// Mode 7: Memory Grid Game Logic

// Game State
let level = 1;
let gridSize = 3; // Starts with 3x3 grid
let activeTilesCount = 3; // Number of tiles to remember
let activeTiles = []; // Store correct tile indexes
let playerClicks = 0;
let isAcceptingInput = false;

// DOM Elements
const scoreElement = document.getElementById('score');
const statusText = document.getElementById('statusText');
const memoryGrid = document.getElementById('memoryGrid');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Initialize Game
function initGame() {
    level = 1;
    gridSize = 3; // Reset to 3x3
    activeTilesCount = 3; // Reset tiles to memorize
    
    scoreElement.textContent = level;
    gameOverScreen.classList.add('hidden');
    gameArea.style.display = 'flex';
    
    startLevel();
}

// Start a new level
function startLevel() {
    isAcceptingInput = false;
    playerClicks = 0;
    activeTiles = [];
    memoryGrid.innerHTML = ''; // Clear previous grid
    
    // Dynamically set grid columns and rows based on current gridSize
    memoryGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    memoryGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    const totalTiles = gridSize * gridSize;
    
    // Create tile elements
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.classList.add('memory-tile', 'disabled');
        tile.dataset.index = i;
        
        // Add click listener
        tile.addEventListener('click', () => handleTileClick(tile, i));
        
        memoryGrid.appendChild(tile);
    }
    
    // Randomly select tiles to memorize
    while (activeTiles.length < activeTilesCount) {
        const randomId = Math.floor(Math.random() * totalTiles);
        if (!activeTiles.includes(randomId)) {
            activeTiles.push(randomId);
        }
    }
    
    statusText.textContent = "Memorize!";
    statusText.style.color = "#ff9800";
    
    // Small delay before showing the pattern
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
    
    // Hide pattern after a delay (Gets slightly faster at higher levels)
    const displayTime = Math.max(600, 1500 - (level * 50)); 
    
    setTimeout(() => {
        hidePattern(tiles);
    }, displayTime);
}

// Hide the pattern and let player guess
function hidePattern(tiles) {
    tiles.forEach(tile => {
        tile.classList.remove('highlight');
        tile.classList.remove('disabled'); // Enable clicks
    });
    
    statusText.textContent = "Your Turn!";
    statusText.style.color = "#4CAF50";
    isAcceptingInput = true;
}

// Handle player clicks
function handleTileClick(tile, index) {
    if (!isAcceptingInput) return;
    if (tile.classList.contains('correct')) return; // Ignore if already clicked correctly
    
    if (activeTiles.includes(index)) {
        // Correct guess
        tile.classList.add('correct');
        playerClicks++;
        
        if (typeof playSound === 'function') playSound('correct');
        
        // Check if level is complete
        if (playerClicks === activeTilesCount) {
            levelComplete();
        }
    } else {
        // Wrong guess - Game Over
        tile.classList.add('wrong');
        gameOver();
    }
}

// Proceed to next level
function levelComplete() {
    isAcceptingInput = false;
    statusText.textContent = "Good Job!";
    statusText.style.color = "#2196F3";
    
    level++;
    scoreElement.textContent = level;
    
    // Logic to expand grid and increase difficulty
    activeTilesCount++; // Always add 1 more tile to memorize
    
    // Increase grid size every 2 levels (up to a max of 7x7 so it doesn't get too small)
    if (level % 2 !== 0 && gridSize < 7) { 
        gridSize++;
    }
    
    // Delay before next level starts
    setTimeout(() => {
        startLevel();
    }, 1200);
}

// End the game
function gameOver() {
    isAcceptingInput = false;
    statusText.textContent = "Game Over!";
    statusText.style.color = "#f44336";
    
    if (typeof playSound === 'function') playSound('gameover');
    
    // Reveal the tiles the player missed
    const tiles = document.querySelectorAll('.memory-tile');
    activeTiles.forEach(index => {
        if (!tiles[index].classList.contains('correct')) {
            tiles[index].classList.add('highlight');
        }
    });
    
    // Show game over screen after a delay
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