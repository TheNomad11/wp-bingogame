document.addEventListener("DOMContentLoaded", function () {
    if (typeof bingoData === "undefined" || !bingoData.words || bingoData.words.length === 0) {
        return;
    }

    const bingoBoard = document.getElementById("bingo-board");
    const bingoSound = document.getElementById("bingo-sound");
    const scoreDisplay = document.getElementById("bingo-score");

    const words = bingoData.words;
    const board = [];
    let currentIndex = 0;
    let score = 0;

    // Render board
    bingoBoard.style.display = "grid";
    bingoBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
    bingoBoard.style.gap = "10px";

    words.forEach((word, i) => {
        const cell = document.createElement("div");
        cell.className = "bingo-cell";
        cell.textContent = word;
        cell.style.border = "2px solid black";
        cell.style.padding = "15px";
        cell.style.textAlign = "center";
        cell.style.background = "#f9f9f9";
        cell.style.cursor = "pointer";
        cell.style.hyphens = "auto";
        cell.style.wordWrap = "break-word";

        cell.addEventListener("click", () => {
            if (i === currentIndex) {
                cell.style.background = "#8ccb2f";
                cell.style.color = "white";
                cell.style.pointerEvents = "none";
                currentIndex++;
                score++;
                bingoSound.play();
                if (currentIndex === words.length) {
                    alert("Super! Alle Wörter korrekt angeklickt!");
                }
            } else {
                alert("Falsches Wort!");
                score--;
            }
            scoreDisplay.textContent = "Punkte: " + score;
        });

        bingoBoard.appendChild(cell);
        board.push(cell);
    });
});
