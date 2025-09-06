<?php
/*
Plugin Name: Bingo Listening Game
Description: Simple Bingo listening game via shortcode [bingo_listening words="w1,w2,..."].
Version: 1.0.1
Author: You
*/

if (!defined('ABSPATH')) exit;

// Register/enqueue CSS & JS only when shortcode used
function bingo_listening_enqueue_assets() {
    // Register assets (will be enqueued when shortcode runs)
    wp_register_style(
        'bingo-style',
        plugin_dir_url(__FILE__) . 'assets/css/bingo.css',
        array(),
        '1.0.1'
    );

    wp_register_script(
        'bingo-script',
        plugin_dir_url(__FILE__) . 'assets/js/bingo.js',
        array(),
        '1.0.1',
        true
    );
}
add_action('wp_enqueue_scripts', 'bingo_listening_enqueue_assets');

// Shortcode handler
function bingo_listening_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'words' => ''
        ),
        $atts,
        'bingo_listening'
    );

    $words = array_filter(array_map('trim', explode(',', $atts['words'])));

    // Enqueue the assets now (only when shortcode is present)
    wp_enqueue_style('bingo-style');
    wp_enqueue_script('bingo-script');

    // Pass data to JS
    wp_localize_script('bingo-script', 'bingoData', array(
        'words' => array_values($words), // indexed array
        'sound' => plugin_dir_url(__FILE__) . 'assets/sounds/bingo.mp3'
    ));

    // Return the HTML container(s)
    return '
        <div id="bingo-container" class="bingo-container">
            <h2>Bingo Listening Game</h2>
            <p>Klicke die Wörter in der richtigen Reihenfolge!</p>
            <div id="bingo-board" class="bingo-board" aria-live="polite"></div>
            <div id="bingo-score" class="bingo-score">Punkte: 0</div>
        </div>
    ';
}
add_shortcode('bingo_listening', 'bingo_listening_shortcode');
