const gameBoard = (() => {
    const board = [
        ['','','',],
        ['','','',],
        ['','','',]
    ]
    const addMarker = (marker, xIndex, yIndex) => {
        if(board[xIndex][yIndex] !== '') {
            return false;
        } else {
            board[xIndex][yIndex] = marker;
            return true;
        }
    }
    const checkForWinner = () => {
        let hasWinner = false;
        //checking rows
        for (let x = 0; x < 3; x++) {
            if (board[x][0] !== '' && board[x][0] === board[x][1] && board[x][1] === board[x][2]) {
                hasWinner = true;
                break;
            }
        }
        //checking columns
        for (let y = 0; y < 3; y++) {
            if (board[0][y] !== '' && board[0][y] === board[1][y] && board[1][y] === board[2][y]) {
                hasWinner = true;
                break;
            }
        }
        //checking diagonals
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            hasWinner = true;
        } else if (board[2][0] !== '' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            hasWinner = true;
        }
        return hasWinner;
    }
    return {
        board,
        addMarker,
        checkForWinner
    }
})();

const player = (name, marker) => {
    const getMarker = () => marker;
    return {
        name,
        getMarker
    }
}