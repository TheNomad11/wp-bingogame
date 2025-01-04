// Change the div ID to have a custom class
?>
<div class="bingo-game-container">
    <h1>Bingo Spiel</h1>
    <p>Höre gut zu und klicke die Wörter in der Reihenfolge, in der der Lehrer sie liest!</p>
    <div id="bingo-board"></div>
    <audio id="bingo-sound" src="<?php echo DOKU_URL . 'lib/plugins/bingo_game/bingo-sound.mp3'; ?>" preload="auto"></audio>
    <audio id="row-column-sound" src="<?php echo DOKU_URL . 'lib/plugins/bingo_game/bingo-sound.mp3'; ?>" preload="auto"></audio>

    <button id="finish-button">Spiel Beenden</button>
    <p id="score-display"></p>

    <script>
        // JavaScript here...
    </script>
</div>
