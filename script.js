/* Bingo Game Styles */
.bingo-game-container {
    font-family: Arial, sans-serif;
    text-align: center; /* Only affects the Bingo game container */
    margin: 0 auto;
}

.bingo-game-container #bingo-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px auto;
    max-width: 100%;
}

.bingo-game-container .bingo-cell {
    padding: 15px;
    border: 2px solid black;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
    text-align: center;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
}

.bingo-game-container .bingo-cell.clicked {
    background-color: #8ccb2f;
    color: white;
    pointer-events: none;
}

.bingo-game-container button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #8ccb2f;
    color: white;
    border: none;
    cursor: pointer;
}

.bingo-game-container button:hover {
    background-color: #6a9a22;
}

.bingo-game-container #score-display {
    margin-top: 10px;
}

/* Reset text alignment and list styles globally */
body, ul, ol {
    text-align: left !important;
    margin: 0 !important;
    padding: 0 !important;
}

.bingo-game-container ul, .bingo-game-container ol {
    text-align: initial !important;  /* Ensures Bingo game lists don't get affected */
}
