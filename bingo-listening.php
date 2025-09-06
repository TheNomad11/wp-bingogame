<?php
/*
Plugin Name: Bingo Listening Game
Description: Simple Bingo listening game via shortcode [bingo_listening words="word1,word2,..."].
Version: 1.3
Author: You
*/

if (!defined('ABSPATH')) exit; // no direct access

// Register scripts
function bingo_listening_enqueue_scripts() {
    wp_register_script(
        'bingo-script',
        plugin_dir_url(__FILE__) . 'bingo-script.js',
        array(),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'bingo_listening_enqueue_scripts');

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

    // Pass words to JS
    wp_enqueue_script('bingo-script');
    wp_localize_script('bingo-script', 'bingoData', array(
        'words' => $words
    ));

    return '
        <div id="bingo-container">
            <h2>Bingo Listening Game</h2>
            <p>Klicke die Wörter in der richtigen Reihenfolge!</p>
            <div id="bingo-board"></div>
            <audio id="bingo-sound" src="https://www.soundjay.com/button/sounds/button-3.mp3" preload="auto"></audio>
            <div id="bingo-score">Punkte: 0</div>
        </div>
    ';
}
add_shortcode('bingo_listening', 'bingo_listening_shortcode');
