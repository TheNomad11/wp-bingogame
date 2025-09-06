// Shuffle words for display
var wordsShuffled = shuffleArray([...words]);

// Build the 4x4 board
bingoBoard.innerHTML = '';
bingoBoard.classList.add('bingo-grid');

wordsShuffled.forEach(function(word){
    var cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'bingo-cell';
    cell.textContent = word;

    // store index of this word in the correct listening order
    cell.dataset.correctIndex = words.indexOf(word);

    cell.addEventListener('click', function(){
        var idx = parseInt(this.dataset.correctIndex, 10);
        if (idx === currentIndex) handleCorrectClick(this);
        else handleWrongClick();
    });

    bingoBoard.appendChild(cell);
});
