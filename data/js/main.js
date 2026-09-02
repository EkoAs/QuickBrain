// Main JavaScript - Shared functionality (sound effects dan transitions)

// Fungsi untuk sound effects (placeholder - bisa ditambahkan audio files nanti)
function playSound(type) {
    // type: 'correct', 'wrong', 'click', 'gameover'
    console.log(`Playing sound: ${type}`);
    
    // Implementasi future: Audio API
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.play();
}

// Fungsi untuk smooth transition antar halaman
function transitionTo(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Fade animations
function fadeIn(element) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const timer = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 30);
}

function fadeOut(element) {
    let opacity = 1;
    const timer = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = opacity;
        opacity -= 0.1;
    }, 30);
}

// Initialize smooth transitions pada page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
