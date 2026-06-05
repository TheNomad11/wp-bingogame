<?php
/*
Plugin Name: Bingo Listening Exercise
Description: A bingo game for language learners based on a text.
Version: 1.2
Author: TheNomad11
*/

if ( ! defined( 'ABSPATH' ) ) exit;

function bl_enqueue_scripts() {
    wp_enqueue_style( 'bl-style', plugins_url( 'bingo.css', __FILE__ ) );
    wp_enqueue_script( 'bl-script', plugins_url( 'bingo.js', __FILE__ ), array(), '1.2', true );
}
add_action( 'wp_enqueue_scripts', 'bl_enqueue_scripts' );

function bl_bingo_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'text' => '',
    ), $atts );

    $text = sanitize_text_field( $atts['text'] );
    if ( empty( $text ) ) return 'Please provide text in the shortcode: [bingo_listening text="your text here"]';

    $words = preg_split( '/\s+/', preg_replace( '/[^\p{L}\s]/u', '', $text ) );
    $words = array_filter( $words ); 
    $words = array_values( array_unique( $words ) ); 

    if ( count( $words ) < 9 ) {
        return 'The text is too short. Please provide a text with at least 9 unique words.';
    }

    $all_words_with_index = [];
    foreach ( $words as $index => $word ) {
        $all_words_with_index[] = ['word' => $word, 'index' => $index];
    }

    $selected_keys = array_rand( $all_words_with_index, 9 );
    $grid_words = [];
    foreach ( $selected_keys as $key ) {
        $grid_words[] = $all_words_with_index[$key];
    }

    shuffle( $grid_words );

    // SOUND PATH: Pointing to root folder
    $sound_url = plugins_url( 'bingo.mp3', __FILE__ ); 
    wp_localize_script( 'bl-script', 'bingoData', array(
        'sound' => $sound_url
    ));

    $html = '<div id="bingo-container">';
    $html .= '<div id="bingo-score-display">Points: 0</div>'; // Added score display
    $html .= '<div class="bingo-grid">';
    
    foreach ( $grid_words as $item ) {
        $html .= sprintf(
            '<div class="bingo-cell" data-index="%d">%s</div>',
            $item['index'],
            esc_html( $item['word'] )
        );
    }
    
    $html .= '</div>';
    $html .= '<div id="bingo-message"></div>';
    $html .= '</div>';

    return $html;
}
add_shortcode( 'bingo_listening', 'bl_bingo_shortcode' );
