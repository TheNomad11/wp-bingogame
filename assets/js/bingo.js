// assets/js/bingo.js
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof bingoData === 'undefined') {
      console.warn('Bingo plugin: bingoData not defined.');
      return;
    }

    var words = Array.isArray(bingoData.words) ? bingoData.words : [];
    var wordsShuffled = shuffleArray([...words]); // shuffle for display
    var soundUrl = bingoData.sound || '';

    var bingoBoard = document.getElementById('bingo-board');
    var scoreDisplay = document.getElementById('bingo-score');
    var currentIndex = 0;
    var score = 0;

    if (!bingoBoard) return;

    // Check 16 words
    if (words.length !== 16) {
      bingoBoard.innerHTML = '<div class="bingo-error">Bitte übergebe genau 16 Wörter im Shortcode.</div>';
      return;
    }

    // Audio
    var bingoSound = null;
    if (soundUrl) {
      bingoSound = new Audio(soundUrl);
      bingoSound.preload = 'auto';
    }

    // Score update
    function updateScore(delta) {
      score += delta;
      if (scoreDisplay) scoreDisplay.textContent = 'Punkte: ' + score;
    }

    // Correct click
    function handleCorrectClick(cell) {
      cell.classList.add('clicked');
      cell.setAttribute('aria-pressed', 'true');
      cell.style.pointerEvents = 'none';
      updateScore(1);
      if (bingoSound) bingoSound.play().catch(()=>{});
      currentIndex++;
      if (currentIndex === words.length) {
        setTimeout(function(){
          alert('Super! Alle Wörter korrekt angeklickt!\nEndstand: ' + score + ' Punkte');
        }, 100);
      }
    }

    // Wrong click
    function handleWrongClick() {
      updateScore(-1);
      alert('Falsches Wort!');
    }

    // Build board
    bingoBoard.innerHTML = '';
    bingoBoard.classList.add('bingo-grid');

    wordsShuffled.forEach(function(word){
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'bingo-cell';
      cell.textContent = word;
      cell.dataset.correctIndex = words.indexOf(word);

      cell.addEventListener('click', function(){
        var idx = parseInt(this.dataset.correctIndex, 10);
        if (idx === currentIndex) handleCorrectClick(this);
        else handleWrongClick();
      });

      bingoBoard.appendChild(cell);
    });

    updateScore(0);

    // Fisher–Yates shuffle
    function shuffleArray(array){
      for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

  });
})();
