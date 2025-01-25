const getGameBoard = () => [...Array(9).keys()].map(i => null); // make a 3 * 3 table

const getRandomIndex = (spots) => {
    const indexes = spots.map((val, i) => (val === null ? i : null)).filter(i => i !== null)

    if (indexes.length > 0) {
        const randomIndex = Math.floor(Math.random() * indexes.length);
        return indexes[randomIndex];
    } else {
        return -1; // no null values
    }
}

function createPlayer(marker) {

    const getMarker = () => marker;
    const switchMarker = () => marker = marker === "X" ? "O" : "X";

    return { getMarker, switchMarker };
}

let player = createPlayer("X");
let computer = createPlayer("O");

const gameBoard = (function () {
    let spots = getGameBoard();
    let wins = [0, 0];
    let winCombo = [];

    const setSpot = (spot, marker) => {
        if (spots[spot] === null && !checkResult(spots)) {
            spots[spot] = marker;
        }
    }

    const reset = () => spots = getGameBoard();

    const getSpots = () => spots;

    const getSpot = (index) => {
        if (spots[index] !== null) {
            return spots[index];
        }
    }

    const getWinCombo = () => winCombo;
    let setWinCombo = (array) => winCombo = array; 

    const getPlayerScore = () => wins[0];
    const getComputerScore = () => wins[1];

    let setPlayerScore = () => wins[0] += 1;
    let setComputerScore = () => wins[1] += 1;

    return { 
        setSpot, 
        reset, 
        getSpots, 
        getPlayerScore, 
        getComputerScore, 
        getSpot, 
        setPlayerScore, 
        setComputerScore,
        getWinCombo,
        setWinCombo,
    };
})();

const checkResult = (board) => {
    const winningLines = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Top-left to bottom-right diagonal
        [2, 4, 6]  // Top-right to bottom-left diagonal
    ];

    for (const [a, b, c] of winningLines) {
        if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
            gameBoard.setWinCombo([a, b, c]);
            return true;
        }
    }

    return false;
};

// DOM
const boardContainer = document.querySelector("div.board");
const resetBtn = document.querySelector("button.reset");
const toggleMarkerBtn = document.querySelector("button.toggleMarker");

function generateBoard() {
    for (i = 0; i < 9; i++) {
        const spot = document.createElement("div");
        spot.classList = `spot spot-${i}`;
        boardContainer.appendChild(spot);
    }
}

generateBoard();

function selectSpot(e) {

    if (e.target.textContent === "" && !checkResult(gameBoard.getSpots())) {

        const index = e.target.classList[1].split("")[5];
        gameBoard.setSpot(index, player.getMarker());
    
        const randomIndex = getRandomIndex(gameBoard.getSpots());
    
        if (checkResult(gameBoard.getSpots())) {
            updateScore("player");
            toggleResetBtn("You Won!");
            markWinCombo();
    
        } else if (randomIndex !== -1) {
            gameBoard.setSpot(randomIndex, computer.getMarker());
    
            if (checkResult(gameBoard.getSpots())) {
                updateScore("computer");
                toggleResetBtn("Computer Won!");
                markWinCombo();
            }
        };
    
        if (randomIndex === -1 && !checkResult(gameBoard.getSpots())) toggleResetBtn("It's a tie.");
    
        // update the DOM
        updateBoard();
    }
}

function toggleResetBtn (winner) {
    const gameOver = document.querySelector('div.gameOver');
    const winnerSpan = document.querySelector('p.winner');

    winnerSpan.textContent = winner;
    gameOver.style.visibility = gameOver.style.visibility === "visible" ? "hidden" : "visible";
}

function updateBoard() {
    for (i = 0; i < 9; i++) {
        const spot = document.querySelector(`.spot-${i}`);
        spot.textContent = gameBoard.getSpot(i);
    }
}

function markWinCombo() {
    const winCombo = gameBoard.getWinCombo();
    for (i = 0; i < winCombo.length; i++) {
        const spot = document.querySelector(`.spot-${winCombo[i]}`);
        spot.style.backgroundColor = '#81b29a';
        spot.style.color = '#fff'
    }
}

function resetBoard() {
    for (i = 0; i < 9; i++) {
        const spot = document.querySelector(`.spot-${i}`);
        spot.style.backgroundColor = '#2f6690';
        spot.style.color = '#81c3d7';
        spot.textContent = "";
    }

    gameBoard.reset();
    toggleResetBtn();
}

function updateScore(winner) {
    const playerDOM = document.querySelector("span.player");
    const computerDOM = document.querySelector("span.computer");

    if (winner === "player") {
        gameBoard.setPlayerScore();
        playerDOM.textContent = gameBoard.getPlayerScore();
    } else {
        gameBoard.setComputerScore();
        computerDOM.textContent = gameBoard.getComputerScore();
    }
}

boardContainer.addEventListener('mouseup', selectSpot);
resetBtn.addEventListener('mouseup', resetBoard);

toggleMarkerBtn.addEventListener('mouseup', () => {
    player.switchMarker();
    computer.switchMarker();

    const marker = document.querySelector('span.marker');
    marker.textContent = player.getMarker();
});