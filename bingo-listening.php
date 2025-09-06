<?php
/*
Plugin Name: WP Bingo Listening
Description: 4x4 Bingo listening exercise with clickable words in correct order.
Version: 1.0
Author: Your Name
*/

if (!defined('ABSPATH')) exit;

// Enqueue scripts and styles
function wp_bingo_enqueue() {
    wp_enqueue_style('bingo-css', plugin_dir_url(__FILE__).'assets/css/bingo.css');
    wp_enqueue_script('bingo-js', plugin_dir_url(__FILE__).'assets/js/bingo.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'wp_bingo_enqueue');

// Shortcode [bingo_listening words="..."]
// Shortcode [bingo_listening words="..." size="4"]
function wp_bingo_shortcode($atts) {
    $atts = shortcode_atts(array(
        'words' => '',
        'size'  => '4', // default 4x4
    ), $atts);

    $size = intval($atts['size']);
    if (!in_array($size, [3, 4])) $size = 4; // fallback

    $words_array = array_map('trim', explode(',', $atts['words']));

if (count($words_array) !== 9) {
    return '<div style="color:red;">Bitte genau 9 Wörter eingeben.</div>';
}


    // Pass data to JS
    $sound_url = plugin_dir_url(__FILE__).'assets/sounds/bingo.mp3';
    wp_localize_script('bingo-js', 'bingoData', array(
        'words' => $words_array,
        'sound' => $sound_url,
        'size'  => $size
    ));

    // Board HTML + score
    $html  = '<div id="bingo-score">Punkte: 0</div>';
    $html .= '<div id="bingo-board" class="bingo-grid"></div>';

    return $html;
}
add_shortcode('bingo_listening', 'wp_bingo_shortcode');

