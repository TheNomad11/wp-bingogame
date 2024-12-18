jQuery(document).ready(function($) {
    // Function to initialize each Bingo game
    function initBingoGame(containerId, words) {
        const container = document.getElementById(containerId);
        const bingoCard = container.querySelector('.bingo-card');
        const popup = container.querySelector('.popup');
        const closePopup = container.querySelector('.close-popup');
        const popupMessage = container.querySelector('.popup-message');
        const bingoSound = container.querySelector('.bingo-sound');

        let completedRows = new Set();
        let completedColumns = new Set();

        // Shuffle the words
        shuffleArray(words);

        // Create bingo card
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = words[i];
            cell.dataset.row = Math.floor(i / 4);
            cell.dataset.col = i % 4;
            cell.addEventListener('click', () => toggleCell(cell));
            bingoCard.appendChild(cell);
        }

        function toggleCell(cell) {
            cell.classList.toggle('selected');
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            checkRow(row);
            checkColumn(col);
            checkAllCompleted();
        }

        function checkRow(rowIndex) {
            if (completedRows.has(rowIndex)) return;

            const cells = bingoCard.querySelectorAll(`.bingo-cell[data-row="${rowIndex}"]`);
            const isRowComplete = Array.from(cells).every(cell => cell.classList.contains('selected'));

            if (isRowComplete) {
                completedRows.add(rowIndex);
                showPopup(`Reihe ${rowIndex + 1} abgeschlossen!`);
            }
        }

        function checkColumn(colIndex) {
            if (completedColumns.has(colIndex)) return;

            const cells = bingoCard.querySelectorAll(`.bingo-cell[data-col="${colIndex}"]`);
            const isColumnComplete = Array.from(cells).every(cell => cell.classList.contains('selected'));

            if (isColumnComplete) {
                completedColumns.add(colIndex);
                showPopup(`Spalte ${colIndex + 1} abgeschlossen!`);
            }
        }

        function checkAllCompleted() {
            if (completedRows.size === 4 && completedColumns.size === 4) {
                setTimeout(() => showPopup("Glückwunsch! Alle Reihen und Spalten abgeschlossen!"), 1500);
            }
        }

        function showPopup(message) {
            popupMessage.textContent = message;
            popup.style.display = 'flex';
            
            // Play sound effect
            bingoSound.currentTime = 0;
            bingoSound.play().catch(e => console.log("Audio play failed:", e));
        }

        $(closePopup).on('click', function() {
            popup.style.display = 'none';
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Initialize all Bingo games on the page
    if (typeof bingoGames !== 'undefined') {
        bingoGames.forEach(function(game) {
            initBingoGame(game.id, game.words);
        });
    }
});
