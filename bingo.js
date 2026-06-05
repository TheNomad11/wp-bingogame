document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.bingo-cell');
    const messageDiv = document.getElementById('bingo-message');
    const scoreDiv = document.getElementById('bingo-score-display');
    
    if (cells.length === 0) return;

    // Sound setup
    const bingoSound = (typeof bingoData !== 'undefined' && bingoData.sound) ? new Audio(bingoData.sound) : null;

    const indices = Array.from(cells).map(cell => parseInt(cell.dataset.index));
    const sortedIndices = [...indices].sort((a, b) => a - b);
    
    let currentStep = 0;
    let nextExpectedIndexValue = sortedIndices[0];
    let points = 0;
    let bingosFound = 0;

    function checkBingo() {
        const cellStates = Array.from(cells).map(cell => cell.classList.contains('marked'));
        let found = false;
        
        // Rows
        for (let i = 0; i < 9; i += 3) {
            if (cellStates[i] && cellStates[i+1] && cellStates[i+2]) found = true;
        }
        // Cols
        for (let i = 0; i < 3; i++) {
            if (cellStates[i] && cellStates[i+3] && cellStates[i+6]) found = true;
        }
        // Diagonals
        if (cellStates[0] && cellStates[4] && cellStates[8]) found = true;
        if (cellStates[2] && cellStates[4] && cellStates[6]) found = true;
        
        return found;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellIndex = parseInt(cell.dataset.index);

            if (cellIndex === nextExpectedIndexValue) {
                cell.classList.add('marked');
                points += 10; // Award points for correct word
                if (scoreDiv) scoreDiv.innerText = `Points: ${points}`;
                
                currentStep++;
                if (currentStep < sortedIndices.length) {
                    nextExpectedIndexValue = sortedIndices[currentStep];
                }

                // Check if this click created a Bingo
                if (checkBingo()) {
                    bingosFound++;
                    if (bingoSound) {
                        bingoSound.play().catch(e => console.log("Audio play blocked"));
                    }
                    messageDiv.innerText = `BINGO!`;
                    setTimeout(() => { if(currentStep < 9) messageDiv.innerText = ""; }, 3000);
                }

                // GAME END: All words found
                if (currentStep === 9) {
                    messageDiv.innerHTML = `GAME OVER!<br>Total Points: ${points}<br>Bingos found: ${bingosFound}`;
                    cells.forEach(c => c.style.pointerEvents = 'none');
                }
            } else {
                points -= 5; // Penalty for wrong word
                if (scoreDiv) scoreDiv.innerText = `Points: ${points}`;
                cell.classList.add('wrong');
                setTimeout(() => cell.classList.remove('wrong'), 500);
            }
        });
    });
});
