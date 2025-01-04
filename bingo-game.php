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
function bingo_game_shortcode() {
    ob_start();
    ?>
    <h1>Bingo Spiel</h1>
    <p>Höre gut zu und klicke die Wörter in der Reihenfolge, in der der Lehrer sie liest!</p>
    <div id="bingo-board"></div>
    <audio id="bingo-sound" src="https://www.soundjay.com/button/sounds/button-3.mp3" preload="auto"></audio>

    <!-- Manual finish button -->
    <button id="finish-button">Spiel Beenden</button>
    <p id="score-display"></p>
    <?php
    return ob_get_clean();
}
add_shortcode( 'bingo_game', 'bingo_game_shortcode' );
