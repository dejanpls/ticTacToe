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

function createPlayer (marker) {    

    const getMarker = () => marker;
    const switchMarker = () => marker = marker === "X" ? "O" : "X";

    return {getMarker, switchMarker};
}

const gameBoard = (function () {
    let spots = getGameBoard();
    let wins = [0, 0];

    let player = createPlayer("X");
    let computer = createPlayer("O");

    const selectSpot = (spot) => {

        if (spots[spot] === null && !checkResult(spots)) {
            spots[spot] =  player.getMarker();

            const randomIndex = getRandomIndex(spots);

            if (checkResult(spots)) {
                console.log("You won!");   
                wins[0] += 1;   
            } else if (randomIndex !== -1) {
                spots[randomIndex] = computer.getMarker();

                if (checkResult(spots)) {
                    console.log("Computer Won!");
                    wins[1] += 1;
                }
            };
            
            if (randomIndex === -1 && !checkResult(spots)) console.log("Tie.");

            console.log(spots);
        }
    }
    const reset = () => spots = getGameBoard();

    return {selectSpot, reset, wins};
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
            return true;
        }
    }

    return false;
};

// DOM
const boardContainer = document.querySelector("div.board");

function generateBoard() {
    for (i = 0; i < 9; i++) {
        const spot = document.createElement("div");
        spot.classList = `spot spot-${i}`; 
        boardContainer.appendChild(spot);
    }
}