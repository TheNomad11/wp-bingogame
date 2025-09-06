// assets/js/bingo.js

const bingoBoard = document.getElementById('bingo-board');
const bingoSound = new Audio(bingoData.sound);
const words = bingoData.words;
const size = 3; // 3x3 grid

let board = [];
let nextCellIndex = {};
for (let r = 0; r < size; r++) nextCellIndex[r] = 0;

// Define rows dynamically
const rows = [];
for (let r = 0; r < size; r++) {
    rows.push([]);
    for (let c = 0; c < size; c++) {
        rows[r].push(r * size + c);
    }
}

const completedRows = new Set();
let score = 0;

function generateBoard() {
    // Shuffle words for display
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledWords.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.textContent = shuffledWords[i];
        cell.addEventListener('click', () => handleClick(cell, i));
        bingoBoard.appendChild(cell);
        board.push(cell);
    }
    highlightNextCells();
}

function highlightNextCells() {
    rows.forEach((row, rowIndex) => {
        row.forEach(cellIndex => board[cellIndex].classList.remove('next'));
        if (!completedRows.has(rowIndex)) {
            const nextIndex = rows[rowIndex][nextCellIndex[rowIndex]];
            board[nextIndex].classList.add('next');
        }
    });
}

function handleClick(cell, index) {
    const rowIndex = rows.findIndex(row => row.includes(index));
    if (rowIndex >= 0 && index === rows[rowIndex][nextCellIndex[rowIndex]]) {
        cell.classList.add('clicked');
        nextCellIndex[rowIndex]++;
        score++;
        updateScore();

        if (nextCellIndex[rowIndex] === size) {
            bingoSound.play();
            alert(`Reihe ${rowIndex + 1} ist fertig!`);
            completedRows.add(rowIndex);
        }
        checkWin();
    } else {
        score--;
        updateScore();
        alert('Falsches Feld! Folge der richtigen Reihenfolge.');
    }
    highlightNextCells();
}

function checkWin() {
    if (completedRows.size === rows.length) {
        alert(`Alle Reihen sind fertig! Gesamtpunkte: ${score}`);
        resetGame();
    }
}

function resetGame() {
    board.forEach(cell => cell.classList.remove('clicked', 'next'));
    completedRows.clear();
    for (let r = 0; r < size; r++) nextCellIndex[r] = 0;
    score = 0;
    updateScore();
    highlightNextCells();
}

function updateScore() {
    const scoreDiv = document.getElementById('bingo-score');
    if(scoreDiv) scoreDiv.textContent = `Punkte: ${score}`;
}

// Initialize the game
generateBoard();
