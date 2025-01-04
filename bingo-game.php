<?php
/**
 * Plugin Name: Bingo Game
 * Plugin URI: https://example.com
 * Description: A fun Bingo game to play on your WordPress site. Great for listening exercises.
 * Version: 1.0
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL2
 */

// Ensure no direct access to the file
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Register and enqueue the plugin's styles and scripts
function bingo_game_enqueue_scripts() {
    wp_enqueue_style( 'bingo-game-style', plugin_dir_url( __FILE__ ) . 'style.css' );
    wp_enqueue_script( 'bingo-game-script', plugin_dir_url( __FILE__ ) . 'script.js', array(), false, true );
    wp_enqueue_script( 'bingo-game-sound', 'https://www.soundjay.com/button/sounds/button-3.mp3', array(), false, true );
}
add_action( 'wp_enqueue_scripts', 'bingo_game_enqueue_scripts' );

// Create the Bingo Game Shortcode
function bingo_game_shortcode( $atts ) {
    // Default words and order
    $default_words = [
        "Parkplätze", "Zugfahrkarten", "Entwicklung", "Schmetterling",
        "Verantwortung", "Bewegung", "Geschwindigkeit", "Information",
        "Apfel", "Banane", "Orange", "Traube",
        "Erdbeere", "Kiwi", "Kokosnuss", "Wassermelone"
    ];

    // Get attributes from the shortcode
    $atts = shortcode_atts( array(
        'words' => implode( ',', $default_words ),
        'correct_order' => 'Entwicklung,Parkplätze,Banane,Zugfahrkarten,Schmetterling,Wassermelone,Bewegung,Erdbeere,Information,Geschwindigkeit,Traube,Kokosnuss,Kiwi,Apfel,Orange'
    ), $atts, 'bingo_game' );

    // Process words and correct order
    $words = explode( ',', $atts['words'] );
    $correct_order = explode( ',', $atts['correct_order'] );

    ob_start();
    ?>
    <h1>Bingo Spiel</h1>
    <p>Höre gut zu und klicke die Wörter in der Reihenfolge, in der der Lehrer sie liest!</p>
    <div id="bingo-board"></div>
    <audio id="bingo-sound" src="https://www.soundjay.com/button/sounds/button-3.mp3" preload="auto"></audio>

    <!-- Manual finish button -->
    <button id="finish-button">Spiel Beenden</button>
    <p id="score-display"></p>

    <script>
        // Define words and correct order dynamically from the shortcode
        const words = <?php echo json_encode($words); ?>;
        const correctSequence = <?php echo json_encode($correct_order); ?>;

        const bingoBoard = document.getElementById('bingo-board');
        const bingoSound = document.getElementById('bingo-sound');
        const finishButton = document.getElementById('finish-button');
        const scoreDisplay = document.getElementById('score-display');

        let board = [];
        let nextWordIndex = 0;  // Keeps track of the current word in the correct sequence
        let score = 0; // Track player score

        // Generate Bingo board
        function generateBoard() {
            for (let i = 0; i < 16; i++) {
                const cell = document.createElement('div');
                cell.className = 'bingo-cell';
                cell.textContent = words[i];
                cell.addEventListener('click', () => handleClick(cell, words[i]));
                bingoBoard.appendChild(cell);
                board.push(cell);
            }
        }

        // Handle cell click
        function handleClick(cell, word) {
            // Check if the clicked word matches the next word in the correct sequence
            if (word === correctSequence[nextWordIndex]) {
                cell.classList.add('clicked');
                score++; // Add a point for correct click
                bingoSound.play();
                nextWordIndex++; // Move to the next word in the sequence
                if (nextWordIndex === correctSequence.length) {
                    alert(`Alle Wörter sind angeklickt! Dein Punktestand ist: ${score}`);
                    resetGame();
                }
            } else {
                alert("Falsches Wort! Klicke das nächste richtige Wort.");
                score--; // Subtract a point for incorrect click
            }
        }

        // Reset the game
        function resetGame() {
            board.forEach(cell => {
                cell.classList.remove('clicked');
            });
            nextWordIndex = 0;
            score = 0; // Reset score
        }

        // Display the score manually when the button is clicked
        function finishGame() {
            alert(`Das Spiel wurde beendet. Dein Punktestand ist: ${score}`);
            scoreDisplay.textContent = `Punktestand: ${score}`;
            resetGame();
        }

        // Event listener for the manual finish button
        finishButton.addEventListener('click', finishGame);

        // Initialize the game
        generateBoard();
    </script>

    <?php
    return ob_get_clean();
}
add_shortcode( 'bingo_game', 'bingo_game_shortcode' );
