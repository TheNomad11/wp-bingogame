document.addEventListener("DOMContentLoaded", function () {
    if (typeof BingoData === "undefined") return;

    const bingoBoard = document.getElementById('bingo-board');
    const bingoSound = document.getElementById('bingo-sound');
    const scoreDisplay = document.getElementById('score-display');

    const words = BingoData.words;

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
        scoreDisplay.textContent = "Punkte: " + score;
    }

    function generateBoard() {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = words[i] || "Leer";
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
                bingoSound.play();
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
            alert("Alle Reihen sind fertig! Bingo!\nEndstand: " + score + " Punkte");
        }
    }

    generateBoard();
});
