const getGameBoard = () => [...Array(9).keys()].map(i => null); // make a 3 * 3 table

const gameBoard = (function () {
    const spots = getGameBoard();

    const selectSpot = (spot) => {
        if (spots[spot] === null) {
            spots[spot] =  "X";
        }
    }

    const getSpots = () => spots;

    const reset = () => getGameBoard();

    return {getSpots, selectSpot, reset};
})();