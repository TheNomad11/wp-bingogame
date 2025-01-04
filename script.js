const bingoBoard = document.getElementById('bingo-board');
const bingoSound = document.getElementById('bingo-sound');
const finishButton = document.getElementById('finish-button');
const scoreDisplay = document.getElementById('score-display');
const words = [
    "Parkplätze", "Zugfahrkarten", "Entwicklung", "Schmetterling",
    "Verantwortung", "Bewegung", "Geschwindigkeit", "Information",
    "Apfel", "Banane", "Orange", "Traube",
    "Erdbeere", "Kiwi", "Kokosnuss", "Wassermelone"
];

// Define the correct sequence in which words must be clicked (as read by the teacher)
const correctSequence = [
    "Entwicklung", "Parkplätze", "Banane", "Zugfahrkarten", 
    "Schmetterling", "Wassermelone", "Bewegung", "Erdbeere", 
    "Information", "Geschwindigkeit", "Traube", "Kokosnuss", 
    "Kiwi", "Apfel", "Orange"
];

let board = [];
let nextWordIndex = 0;  // Keeps track of the current word in the correct sequence
let score = 0; // Track player score

// Generate Bingo board
function generateBoard() {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.textContent = words[i];
        cell.addEventListener('click', () => handleClick(cell, words[i]));
        bingoBoard.appendChild(cell);
        board.push(cell);
    }
}

// Handle cell click
function handleClick(cell, word) {
    // Check if the clicked word matches the next word in the correct sequence
    if (word === correctSequence[nextWordIndex]) {
        cell.classList.add('clicked');
        score++; // Add a point for correct click
        bingoSound.play();
        nextWordIndex++; // Move to the next word in the sequence
        if (nextWordIndex === correctSequence.length) {
            alert(`Alle Wörter sind angeklickt! Dein Punktestand ist: ${score}`);
            resetGame();
        }
    } else {
        alert("Falsches Wort! Klicke das nächste richtige Wort.");
        score--; // Subtract a point for incorrect click
    }
}

// Reset the game
function resetGame() {
    board.forEach(cell => {
        cell.classList.remove('clicked');
    });
    nextWordIndex = 0;
    score = 0; // Reset score
}

// Display the score manually when the button is clicked
function finishGame() {
    alert(`Das Spiel wurde beendet. Dein Punktestand ist: ${score}`);
    scoreDisplay.textContent = `Punktestand: ${score}`;
    resetGame();
}

// Event listener for the manual finish button
finishButton.addEventListener('click', finishGame);

// Initialize the game
generateBoard();
