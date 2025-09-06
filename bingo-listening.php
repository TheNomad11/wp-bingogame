<?php
/*
Plugin Name: Bingo Listening Game
Description: Simple Bingo listening game via shortcode [bingo_listening words="word1,word2,..."].
Version: 1.0
Author: You
*/

if (!defined('ABSPATH')) exit;

// Enqueue assets
function bingo_listening_enqueue_assets() {
    wp_enqueue_style(
        'bingo-style',
        plugin_dir_url(__FILE__) . 'assets/css/bingo.css',
        array(),
        '1.0'
    );

    wp_enqueue_script(
        'bingo-script',
        plugin_dir_url(__FILE__) . 'assets/js/bingo.js',
        array(),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'bingo_listening_enqueue_assets');

// Shortcode
function bingo_listening_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'words' => ''
        ),
        $atts,
        'bingo_listening'
    );

    $words = array_map('trim', explode(',', $atts['words']));

    // Pass words + sound URL to JS
    wp_localize_script('bingo-script', 'bingoData', array(
        'words' => $words,
        'sound' => plugin_dir_url(__FILE__) . 'assets/sounds/bingo.mp3'
    ));

    return '
        <div id="bingo-container">
            <h2>Bingo Listening Game</h2>
            <p>Klicke die Wörter in der richtigen Reihenfolge!</p>
            <div id="bingo-board"></div>
            <div id="bingo-score">Punkte: 0</div>
        </div>
    ';
}
add_shortcode('bingo_listening', 'bingo_listening_shortcode');
