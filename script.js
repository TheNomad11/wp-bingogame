document.addEventListener('DOMContentLoaded', function() {
    var bingoBoard = document.getElementById('bingo-board');
    var bingoSound = document.getElementById('bingo-sound');
    var words = [
        "Parkplätze", "Zugfahrkarten", "Entwicklung", "Schmetterling",
        "Verantwortung", "Bewegung", "Geschwindigkeit", "Information",
        "Apfel", "Banane", "Orange", "Traube",
        "Erdbeere", "Kiwi", "Kokosnuss", "Wassermelone"
    ];

    var board = [];
    var nextCellIndex = { 0: 0, 1: 0, 2: 0, 3: 0 }; // Correct order tracking
    var rows = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ];
    var completedRows = new Set();
    var score = 0; // Track player score

    // Generate Bingo board
    function generateBoard() {
        for (var i = 0; i < 16; i++) {
            var cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = words[i];
            cell.addEventListener('click', function(i) {
                return function() {
                    handleClick(cell, i);
                };
            }(i)); // Immediately Invoked Function Expression (IIFE)
            bingoBoard.appendChild(cell);
            board.push(cell);
        }
        highlightNextCells();
    }

    // Highlight the next required cells
    function highlightNextCells() {
        rows.forEach(function(row, rowIndex) {
            row.forEach(function(cellIndex) {
                board[cellIndex].classList.remove('next');
            });

            if (!completedRows.has(rowIndex)) {
                var nextIndex = rows[rowIndex][nextCellIndex[rowIndex]];
                board[nextIndex].classList.add('next');
            }
        });
    }

    // Handle cell click
    function handleClick(cell, index) {
        var rowIndex = rows.findIndex(function(row) {
            return row.indexOf(index) !== -1;
        });

        if (rowIndex >= 0 && index === rows[rowIndex][nextCellIndex[rowIndex]]) {
            cell.classList.add('clicked');
            nextCellIndex[rowIndex]++;
            score++; // Add a point for correct click

            if (nextCellIndex[rowIndex] === 4) {
                bingoSound.play();
                alert('Reihe ' + (rowIndex + 1) + ' ist fertig!');
                completedRows.add(rowIndex);
            }

            checkWin();
        } else {
            alert('Falsches Feld! Folge der richtigen Reihenfolge.');
            score--; // Subtract a point for incorrect click
        }

        highlightNextCells();
    }

    // Check if the game is complete
    function checkWin() {
        if (completedRows.size === rows.length) {
            alert('Alle Reihen sind fertig! Bingo! Dein Punktestand ist: ' + score);
            resetGame();
        }
    }

    // Reset the game
    function resetGame() {
        board.forEach(function(cell) {
            cell.classList.remove('clicked', 'next');
        });
        completedRows.clear();
        nextCellIndex = { 0: 0, 1: 0, 2: 0, 3: 0 };
        score = 0; // Reset score
        highlightNextCells();
    }

    // Initialize the game
    generateBoard();
});
