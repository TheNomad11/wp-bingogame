document.addEventListener('DOMContentLoaded', function () {
    if (typeof bingoData === 'undefined') return;

    var words = Array.isArray(bingoData.words) ? bingoData.words : [];
    if (words.length !== 16) {
        document.getElementById('bingo-board').innerHTML = '<div>Bitte genau 16 Wörter übergeben.</div>';
        return;
    }

    var wordsShuffled = shuffleArray([...words]); // shuffle for display
    var currentIndex = 0;
    var score = 0;

    var bingoBoard = document.getElementById('bingo-board');
    var scoreDisplay = document.getElementById('bingo-score');
    bingoBoard.innerHTML = '';

    var bingoSound = bingoData.sound ? new Audio(bingoData.sound) : null;

    function updateScore(delta) {
        score += delta;
        if (scoreDisplay) scoreDisplay.textContent = 'Punkte: ' + score;
    }

    function handleCorrectClick(cell) {
        cell.classList.add('clicked');
        cell.style.pointerEvents = 'none';
        updateScore(1);
        if (bingoSound) bingoSound.play().catch(()=>{});
        currentIndex++;
        if (currentIndex === words.length) {
            setTimeout(() => alert('Super! Alle Wörter korrekt angeklickt!\nEndstand: ' + score + ' Punkte'), 100);
        }
    }

    function handleWrongClick() {
        updateScore(-1);
        alert('Falsches Wort!');
    }

    // Build board strictly from shuffled array
    wordsShuffled.forEach(function(word){
        var cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'bingo-cell';
        cell.textContent = word;

        // store original listening order index
        cell.dataset.correctIndex = words.indexOf(word);

        cell.addEventListener('click', function(){
            var idx = parseInt(this.dataset.correctIndex, 10);
            if (idx === currentIndex) handleCorrectClick(this);
            else handleWrongClick();
        });

        bingoBoard.appendChild(cell);
    });

    updateScore(0);

    function shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
