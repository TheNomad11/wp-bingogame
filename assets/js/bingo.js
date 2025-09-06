// assets/js/bingo.js
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Basic safety checks
    if (typeof bingoData === 'undefined') {
      console.warn('Bingo plugin: bingoData not defined (shortcode not used or localization failed).');
      return;
    }

    var words = Array.isArray(bingoData.words) ? bingoData.words : [];
    var soundUrl = bingoData.sound || '';

    var bingoBoard = document.getElementById('bingo-board');
    var scoreDisplay = document.getElementById('bingo-score');

    if (!bingoBoard) {
      console.error('Bingo plugin: #bingo-board element not found.');
      return;
    }

    // Need exactly 16 words for 4x4 board
    if (words.length !== 16) {
      bingoBoard.innerHTML = '<div class="bingo-error">Bitte übergebe genau 16 Wörter im Shortcode, z. B.: [bingo_listening words=\"A,B,C,...,P\"]</div>';
      console.error('Bingo plugin: wrong word count. Expected 16, got', words.length, words);
      return;
    }

    // prepare audio
    var bingoSound = null;
    if (soundUrl) {
      bingoSound = new Audio(soundUrl);
      // allow play on first user interaction (browsers may block autoplay)
      bingoSound.preload = 'auto';
    }

    // build board
    bingoBoard.innerHTML = '';
    bingoBoard.classList.add('bingo-grid');

    var currentIndex = 0;
    var score = 0;

    function updateScore(delta) {
      score += delta;
      if (scoreDisplay) scoreDisplay.textContent = 'Punkte: ' + score;
    }

    function handleCorrectClick(cell) {
      cell.classList.add('clicked');
      cell.setAttribute('aria-pressed', 'true');
      cell.style.pointerEvents = 'none';
      updateScore(1);
      // play sound if available
      if (bingoSound && typeof bingoSound.play === 'function') {
        bingoSound.play().catch(function () { /* play blocked until user gesture in some browsers */ });
      }
      currentIndex++;
      if (currentIndex === words.length) {
        setTimeout(function () {
          alert('Super! Alle Wörter korrekt angeklickt!\nEndstand: ' + score + ' Punkte');
        }, 100);
      }
    }

    function handleWrongClick() {
      updateScore(-1);
      alert('Falsches Wort!');
    }

    words.forEach(function (word, i) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'bingo-cell';
      cell.textContent = word;
      cell.setAttribute('data-index', i);
      cell.setAttribute('aria-label', 'Bingo Feld ' + (i + 1) + ': ' + word);
      cell.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        if (idx === currentIndex) {
          handleCorrectClick(this);
        } else {
          handleWrongClick();
        }
      });
      bingoBoard.appendChild(cell);
    });

    // init score
    updateScore(0);
  });
})();
