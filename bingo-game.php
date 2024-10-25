<?php
/*
Plugin Name: Bingo Game
Description: A plugin to add a Bingo game to WordPress posts and pages
Version: 1.0
Author: Your Name
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class BingoGame {
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('bingo_game', array($this, 'bingo_game_shortcode'));
    }

    public function enqueue_scripts() {
        wp_enqueue_style('bingo-game-style', plugins_url('css/style.css', __FILE__));
        wp_enqueue_script('bingo-game-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.0', true);
    }

    public function bingo_game_shortcode($atts) {
        $words = isset($atts['words']) ? explode(',', $atts['words']) : [];
        
        // Ensure we have at least 16 words
        while (count($words) < 16) {
            $words[] = '';
        }
        
        ob_start();
        ?>
        <div id="bingo-container">
            <audio id="bingo-sound" src="<?php echo plugins_url('assets/bingo-sound.mp3', __FILE__); ?>"></audio>
            <div class="container">
                <h1>Wort-Bingo-Spiel</h1>
                <div id="bingo-card" class="bingo-card"></div>
            </div>
            <div id="popup" class="popup">
                <div class="popup-content">
                    <h2 id="popup-message">Reihe abgeschlossen!</h2>
                    <button id="close-popup">Weiter</button>
                </div>
            </div>
        </div>
        <script>
            var bingoWords = <?php echo json_encode($words); ?>;
        </script>
        <?php
        return ob_get_clean();
    }
}

new BingoGame();

