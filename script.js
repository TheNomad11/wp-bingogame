document.addEventListener('DOMContentLoaded', function () {
    const bingoBoard = document.getElementById('bingo-board');
    const bingoSound = document.getElementById('bingo-sound');
    const rowColumnSound = document.getElementById('row-column-sound');
    const finishButton = document.getElementById('finish-button');
    const scoreDisplay = document.getElementById('score-display');

    const words = [
        "Parkplätze", "Zugfahrkarten", "Entwicklung", "Schmetterling",
        "Verantwortung", "Bewegung", "Geschwindigkeit", "Information",
        "Apfel", "Banane", "Orange", "Traube",
        "Erdbeere", "Kiwi", "Kokosnuss", "Wassermelone"
    ];

    let board = [];
    let nextCellIndex = { 0: 0, 1: 0, 2: 0, 3: 0 }; // Correct order tracking
    const rows = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ];
    const completedRows = new Set();
    let score = 0; // Track player score

    // Generate Bingo board
    function generateBoard() {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = words[i];
            cell.addEventListener('click', () => handleClick(cell, i));
            bingoBoard.appendChild(cell);
            board.push(cell);
        }
        highlightNextCells();
    }

    // Highlight the next required cells
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

    // Handle cell click
    function handleClick(cell, index) {
        const rowIndex = rows.findIndex(row => row.includes(index));

        if (rowIndex >= 0 && index === rows[rowIndex][nextCellIndex[rowIndex]]) {
            cell.classList.add('clicked');
            nextCellIndex[rowIndex]++;
            score++; // Add a point for correct click

            if (nextCellIndex[rowIndex] === 4) {
                rowColumnSound.play();
                alert(`Reihe ${rowIndex + 1} ist fertig!`);
                completedRows.add(rowIndex);
            }

            checkWin();
        } else {
            alert("Falsches Feld! Folge der richtigen Reihenfolge.");
            score--; // Subtract a point for incorrect click
        }

        highlightNextCells();
    }

    // Check if the game is complete
    function checkWin() {
        if (completedRows.size === rows.length) {
            alert(`Alle Reihen sind fertig! Bingo! Dein Punktestand ist: ${score}`);
            resetGame();
        }
    }

    // Reset the game
    function resetGame() {
        board.forEach(cell => {
            cell.classList.remove('clicked', 'next');
        });
        completedRows.clear();
        nextCellIndex = { 0: 0, 1: 0, 2: 0, 3: 0 };
        score = 0; // Reset score
        highlightNextCells();
    }

    // Initialize the game
    generateBoard();

    // Handle finish button click
    finishButton.addEventListener('click', () => {
        alert(`Spiel beendet. Dein Punktestand ist: ${score}`);
        resetGame();
    });

    // Update score display
    function updateScore() {
        scoreDisplay.textContent = `Punktestand: ${score}`;
    }
});
