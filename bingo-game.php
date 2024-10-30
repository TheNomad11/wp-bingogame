<?php
/*
Plugin Name: Bingo Game
Description: A plugin to add a Bingo game to WordPress posts and pages
Version: 1.1
Author: Your Name
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class BingoGame {
    private static $instance_count = 0;

    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('bingo_game', array($this, 'bingo_game_shortcode'));
    }

    public function enqueue_scripts() {
        wp_enqueue_style('bingo-game-style', plugins_url('css/style.css', __FILE__));
        wp_enqueue_script('bingo-game-script', plugins_url('js/script.js', __FILE__), array('jquery'), '1.1', true);
    }

    public function bingo_game_shortcode($atts) {
        self::$instance_count++;
        $unique_id = 'bingo-game-' . self::$instance_count;

        $words = isset($atts['words']) ? explode(',', $atts['words']) : [];
        
        // Ensure we have at least 16 words
        while (count($words) < 16) {
            $words[] = '';
        }
        
        ob_start();
        ?>
        <div id="<?php echo esc_attr($unique_id); ?>" class="bingo-container">
            <audio class="bingo-sound" src="<?php echo plugins_url('assets/bingo-sound.mp3', __FILE__); ?>"></audio>
            <div class="container">
                <h1>Wort-Bingo-Spiel</h1>
                <div class="bingo-card"></div>
            </div>
            <div class="popup">
                <div class="popup-content">
                    <h2 class="popup-message">Reihe abgeschlossen!</h2>
                    <button class="close-popup">Weiter</button>
                </div>
            </div>
        </div>
        <script>
            if (typeof bingoGames === 'undefined') {
                var bingoGames = [];
            }
            bingoGames.push({
                id: <?php echo json_encode($unique_id); ?>,
                words: <?php echo json_encode($words); ?>
            });
        </script>
        <?php
        return ob_get_clean();
    }
}

new BingoGame();
