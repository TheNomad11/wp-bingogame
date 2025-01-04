<?php
/**
 * Plugin Name: Bingo Game
 * Description: A simple bingo game plugin where users click on words in the correct order based on the teacher's reading.
 * Version: 1.0
 * Author: Your Name
 */

// Enqueue plugin styles
function bingo_game_styles() {
    wp_enqueue_style('bingo-game-style', plugin_dir_url(__FILE__) . 'style.css');
}
add_action('wp_enqueue_scripts', 'bingo_game_styles');

// Enqueue plugin scripts
function bingo_game_scripts() {
    wp_enqueue_script('bingo-game-script', plugin_dir_url(__FILE__) . 'script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'bingo_game_scripts');

// Shortcode to display the Bingo game
function bingo_game_shortcode() {
    ob_start();
    ?>
    <div class="bingo-game-container">
        <h1>Bingo Spiel</h1>
        <p>Klicke auf die Felder in der richtigen Reihenfolge!</p>
        <div id="bingo-board"></div>
        <audio id="bingo-sound" src="<?php echo plugin_dir_url(__FILE__) . 'bingo-sound.mp3'; ?>" preload="auto"></audio>
        <audio id="row-column-sound" src="<?php echo plugin_dir_url(__FILE__) . 'bingo-sound.mp3'; ?>" preload="auto"></audio>

        <button id="finish-button">Spiel Beenden</button>
        <p id="score-display"></p>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('bingo_game', 'bingo_game_shortcode');
?>
