document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.bingo-cell');
    const messageDiv = document.getElementById('bingo-message');
    const scoreDiv = document.getElementById('bingo-score-display');

    if (cells.length === 0) return;

    const bingoSound = (typeof bingoData !== 'undefined' && bingoData.sound) ? new Audio(bingoData.sound) : null;
    const indices = Array.from(cells).map(cell => parseInt(cell.dataset.index));
    const sortedIndices = [...indices].sort((a, b) => a - b);

    // currentPosition = the earliest word in the sequence not yet marked or missed.
    // Any word AT or AFTER this position is a valid correct click.
    // Clicking a word advances currentPosition past it (and past any skipped words before it).
    // Clicking a word BEFORE currentPosition is wrong (already passed).
    let currentPosition = 0;
    let points = 0;
    let bingosFound = 0;
    let gameOver = false;

    function checkBingo() {
        const cellStates = Array.from(cells).map(cell => cell.classList.contains('marked'));
        for (let i = 0; i < 9; i += 3) {
            if (cellStates[i] && cellStates[i+1] && cellStates[i+2]) return true;
        }
        for (let i = 0; i < 3; i++) {
            if (cellStates[i] && cellStates[i+3] && cellStates[i+6]) return true;
        }
        if (cellStates[0] && cellStates[4] && cellStates[8]) return true;
        if (cellStates[2] && cellStates[4] && cellStates[6]) return true;
        return false;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (gameOver) return;
            if (cell.classList.contains('marked')) return;

            const cellIndex = parseInt(cell.dataset.index);
            const positionInSequence = sortedIndices.indexOf(cellIndex);

            if (positionInSequence >= currentPosition) {
                // ✅ CORRECT: this word hasn't been passed yet.
                // Grey out any words that were skipped before this one.
                for (let i = currentPosition; i < positionInSequence; i++) {
                    const skippedIndex = sortedIndices[i];
                    cells.forEach(c => {
                        if (parseInt(c.dataset.index) === skippedIndex) {
                            c.classList.add('missed');
                        }
                    });
                }

                // Advance pointer to just after the clicked word
                currentPosition = positionInSequence + 1;

                cell.classList.add('marked');
                points += 10;
                if (scoreDiv) scoreDiv.innerText = `Points: ${points}`;

                if (checkBingo()) {
                    bingosFound++;
                    if (bingoSound) {
                        bingoSound.play().catch(e => console.log("Audio play blocked"));
                    }
                    messageDiv.innerText = `BINGO!`;
                    setTimeout(() => {
                        if (!gameOver) messageDiv.innerText = "";
                    }, 3000);
                }

                if (currentPosition >= sortedIndices.length) {
                    gameOver = true;
                    const markedCount = Array.from(cells).filter(c => c.classList.contains('marked')).length;
                    messageDiv.innerHTML = `GAME OVER!<br>Total Points: ${points}<br>Words found: ${markedCount}/${sortedIndices.length}<br>Bingos found: ${bingosFound}`;
                    cells.forEach(c => c.style.pointerEvents = 'none');
                }

            } else {
                // ❌ WRONG: this word was already passed (missed or should have been clicked earlier)
                points -= 5;
                if (scoreDiv) scoreDiv.innerText = `Points: ${points}`;
                cell.classList.add('wrong');
                setTimeout(() => { cell.classList.remove('wrong'); }, 500);
            }
        });
    });
});
