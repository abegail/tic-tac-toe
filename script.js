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
    const resetBoard = () => {
        board.forEach(row => {
            for (let y = 0; y < 3; y++) {
                row[y] = ''
            }
        })
    }
    return {
        board,
        addMarker,
        checkForWinner,
        resetBoard
    }
})();

const player = (name, marker) => {
    const getMarker = () => marker;
    const placeMarker = (xIndex, yIndex) => gameBoard.addMarker(marker, xIndex, yIndex);
    return {
        name,
        getMarker,
        placeMarker
    }
}

const game = (() => {
    let movesCounter = 0;
    let player1 = {};
    let player2 = {};
    const createPlayer = (name, marker) => {
        if (Object.keys(player1).length === 0) player1 = Object.assign(player1, player(name, marker));
        else player2 = Object.assign(player2, player(name, marker));
    }
    const displayBoard = () => {
        console.log(gameBoard.board);
    }
    const newGame = () => gameBoard.resetBoard();
    const makeAMove = (xIndex, yIndex) => {
        if (movesCounter % 2 === 0) {
            if (player1.placeMarker(xIndex, yIndex)) {
                movesCounter++;
                console.log('Move success!')
            }
            else console.log('Illegal move!')
        } else {
            if (player2.placeMarker(xIndex, yIndex)) {
                movesCounter++;
                console.log('Move success!')
            }
            else console.log('Illegal move!')
        }
    }
    return {
        displayBoard,
        newGame,
        createPlayer,
        makeAMove
    }
})();

const boardContainer = document.querySelector('.board-container');
const startContainer = document.querySelector('.view.start');

const startBtn = document.getElementById('startGame');
startBtn.addEventListener('click', () => {
    boardContainer.classList.remove('hidden');
    startContainer.classList.add('hidden');

    game.createPlayer('abby', 'x');
    game.createPlayer('jinger', 'o');
})

const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('click', () => {
        console.log(square.getAttribute('data-x'), square.getAttribute('data-y'));
        game.makeAMove(square.getAttribute('data-x'), square.getAttribute('data-y'));
        game.displayBoard();
    })
})