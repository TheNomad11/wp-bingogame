document.addEventListener("DOMContentLoaded", function () {
    if (typeof BingoData === "undefined") return;

    const bingoBoard = document.getElementById('bingo-board');
    const bingoSoundEl = document.getElementById('bingo-sound');
    const scoreDisplay = document.getElementById('score-display');

    // Use localized data
    const words = bingoData.words.length === 16 ? bingoData.words : [
    "Parkplätze", "Zugfahrkarten", "Entwicklung", "Schmetterling",
    "Verantwortung", "Bewegung", "Geschwindigkeit", "Information",
    "Apfel", "Banane", "Orange", "Traube",
    "Erdbeere", "Kiwi", "Kokosnuss", "Wassermelone"
];
   
    const audioUrl = BingoData.audioUrl || '';

    if (audioUrl && bingoSoundEl) {
        bingoSoundEl.src = audioUrl;
    }

    let board = [];
    let nextCellIndex = { 0: 0, 1: 0, 2: 0, 3: 0 };
    const rows = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ];
    const completedRows = new Set();
    let score = 0;

    function updateScore(change) {
        score += change;
        if (scoreDisplay) scoreDisplay.textContent = "Punkte: " + score;
    }

    function generateBoard() {
        // clear board if rerun
        bingoBoard.innerHTML = '';
        board = [];

        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = words[i] || "";
            cell.addEventListener('click', () => handleClick(cell, i));
            bingoBoard.appendChild(cell);
            board.push(cell);
        }
        highlightNextCells();
    }

    function highlightNextCells() {
        rows.forEach((row, rowIndex) => {
            row.forEach(cellIndex => {
                board[cellIndex].classList.remove('next');
            });
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
            updateScore(1);

            if (nextCellIndex[rowIndex] === 4) {
                if (bingoSoundEl && typeof bingoSoundEl.play === 'function') {
                    bingoSoundEl.play().catch(function(){ /* autoplay restrictions may block - played on user interaction */ });
                }
                alert(`Reihe ${rowIndex + 1} ist fertig!`);
                completedRows.add(rowIndex);
            }

            checkWin();
        } else {
            alert("Falsches Feld!");
            updateScore(-1);
        }

        highlightNextCells();
    }

    function checkWin() {
        if (completedRows.size === rows.length) {
            alert("Alle Reihen sind fertig! Bingo!
Endstand: " + score + " Punkte");
        }
    }

    generateBoard();
});
