# WP Bingo Listening Exercise 🎧

A lightweight WordPress plugin designed for language learners. This plugin transforms a text into an interactive 3x3 Bingo game, where students must click words in the exact order they appear in the audio/text to win.

#### This plugin is vibe-coded, so be warned!  I am still testing ist. Originally made with ChatGPT in autumn 2024, now in June 2026 updated with Gemma4:31b and Claude Sonnet 4.6


## 🚀 Features
- **Sequential Validation:** Prevents "cheating" by requiring words to be clicked in the order they are spoken.
- **Dynamic Grid:** Randomly selects 9 unique words from the provided text and shuffles their position on the board.
- **Gamification:** Includes a scoring system (`+10` for correct words, `-5` for mistakes).
- **Audio Feedback:** Plays a "Bingo!" sound effect when a line is completed.
- **Responsive Design:** Works on desktops, tablets, and smartphones.

## 🛠 Installation

1. **Upload the Plugin:**
   Upload the plugin folder to your `/wp-content/plugins/` directory.
2. **Add Required Files:**
   Ensure the following files are located in the **root folder** of the plugin:
   - `bingo-listening.php`
   - `bingo.js`
   - `bingo.css`
   - `bingo.mp3`
3. **Activate:**
   Go to the WordPress Admin Dashboard $\rightarrow$ **Plugins** $\rightarrow$ **Activate "Bingo Listening Exercise"**.

## 📖 Usage

Use the shortcode below in any post or page. Instead of a list of words, you provide the full text you are using for the listening exercise.

### Shortcode Syntax
`[bingo_listening text="Your selected words go here..."]`

### Example
`[bingo_listening text="Müll ehrenamtlich Flüchtlinge Umwelt vermeiden Wegwerfgesellschaft Rohstoffe Lebensstil nachhaltig"]`

> **Note:** The text must contain at least **9 unique words**. The plugin will automatically pick 9 of them and place them in the grid.

## 🎮 How to Play
1. The student listens to the audio recording of the provided text.
2. As they hear a word that appears on their grid, they click it.
3. **The Catch:** If they click a word out of order (e.g., clicking the 3rd word before the 1st), the cell will flash red and points will be deducted.
4. **Winning:** Completing a row, column, or diagonal triggers a "Bingo!" sound.
5. **Game Over:** Once all 9 words are found, the final score and total number of Bingos are displayed.

## 📂 File Structure
```text
bingo-listening/
├── bingo-listening.php  # Main plugin logic & shortcode
├── bingo.js             # Game logic & sequence validation
├── bingo.css            # Grid styling & animations
└── bingo.mp3            # Victory sound effect
```

## 📝 License
This project is open-source and free to use.

***

### 💡 Pro-Tips for the Teacher:
- **Text Selection:** Use a text with clear, distinct keywords to make the exercise effective.
- **Audio Pairing:** Place the WordPress audio player directly above the shortcode so students can play and click simultaneously.
- **Competition:** Encourage students to compete for the highest "Total Points" by avoiding mistakes.
