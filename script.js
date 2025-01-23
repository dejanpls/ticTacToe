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

const gameBoard = (function () {
    const spots = getGameBoard();

    const selectSpot = (spot) => {
        if (spots[spot] === null) {
            spots[spot] =  "X";

            const randomIndex = getRandomIndex(spots);

            if (randomIndex !== -1) spots[randomIndex] = "O";
        }
    }

    const getSpots = () => spots;

    const reset = () => getGameBoard();

    return {getSpots, selectSpot, reset};
})();