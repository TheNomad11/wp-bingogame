<?php
/*
Plugin Name: Bingo Listening Game
Description: A simple Bingo game for listening exercises where students must click words in the correct order. Words are editable from the settings page.
Version: 1.2
Author: Your Name
*/

if ( ! defined( 'ABSPATH' ) ) exit;

// Enqueue scripts and styles and pass data to JS
function bingo_listening_enqueue_scripts() {
    wp_enqueue_style( 'bingo-listening-style', plugins_url( 'assets/bingo.css', __FILE__ ) );

    // Get words from settings, or use defaults (16 words expected)
    $default = 'Parkplätze,Zugfahrkarten,Entwicklung,Schmetterling,Verantwortung,Bewegung,Geschwindigkeit,Information,Apfel,Banane,Orange,Traube,Erdbeere,Kiwi,Kokosnuss,Wassermelone';
    $words = get_option( 'bingo_listening_words', $default );
    $words_array = array_values( array_map( 'trim', explode( ',', $words ) ) );

    // Audio file bundled in plugin
    $audio_url = plugins_url( 'assets/sounds/bingo.mp3', __FILE__ );

    wp_enqueue_script( 'bingo-listening-script', plugins_url( 'assets/bingo.js', __FILE__ ), array(), false, true );
    wp_localize_script( 'bingo-listening-script', 'BingoData', array(
        'words' => $words_array,
        'audioUrl' => $audio_url,
    ) );
}
add_action( 'wp_enqueue_scripts', 'bingo_listening_enqueue_scripts' );

// Shortcode to display the game
function bingo_listening_shortcode() {
    ob_start(); ?>
    <div id="bingo-game">
        <h2>Bingo Listening</h2>
        <p>Klicke die Wörter in der richtigen Reihenfolge!</p>
        <div id="bingo-board"></div>
        <div id="score-display">Punkte: 0</div>
        <!-- audio element: src will be set by JS using localized BingoData.audioUrl -->
        <audio id="bingo-sound" preload="auto"></audio>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'bingo_listening', 'bingo_listening_shortcode' );

// --- Settings Page ---
function bingo_listening_add_admin_menu() {
    add_options_page(
        'Bingo Listening',
        'Bingo Listening',
        'manage_options',
        'bingo-listening',
        'bingo_listening_options_page'
    );
}
add_action( 'admin_menu', 'bingo_listening_add_admin_menu' );

function bingo_listening_settings_init() {
    register_setting( 'bingoListening', 'bingo_listening_words' );

    add_settings_section(
        'bingo_listening_section',
        __( 'Bingo Listening Einstellungen', 'bingo-listening' ),
        function() { echo '<p>Gib hier die Wörter ein, getrennt durch Kommas. Es werden 16 Wörter benötigt (4x4 Feld).</p>'; },
        'bingoListening'
    );

    add_settings_field(
        'bingo_listening_words_field',
        __( 'Wörterliste', 'bingo-listening' ),
        'bingo_listening_words_render',
        'bingoListening',
        'bingo_listening_section'
    );
}
add_action( 'admin_init', 'bingo_listening_settings_init' );

function bingo_listening_words_render() {
    $value = get_option( 'bingo_listening_words', '' );
    echo "<textarea cols='60' rows='5' name='bingo_listening_words'>" . esc_textarea( $value ) . "</textarea>";
}

function bingo_listening_options_page() { ?>
    <div class="wrap">
        <h1>Bingo Listening Einstellungen</h1>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'bingoListening' );
            do_settings_sections( 'bingoListening' );
            submit_button();
            ?>
        </form>
        <h2>Sound-Datei</h2>
        <p>Lege eine Audiodatei namens <code>bingo.mp3</code> in den Ordner <code>assets/sounds/</code> des Plugins (z. B. <code>wp-content/plugins/bingo-listening/assets/sounds/bingo.mp3</code>). Die URL wird automatisch an das Skript übergeben.</p>
    </div>
<?php }
