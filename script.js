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
    let even = true;
    let player1 = {};
    let player2 = {};
    const createPlayer = (name, marker) => {
        if (Object.keys(player1).length === 0){
            player1 = Object.assign(player1, player(name, marker));
            console.log(`Player 1 is ${player1.name}`)
        }
        else {
            player2 = Object.assign(player2, player(name, marker));
            console.log(`Player 2 is ${player2.name}`)
        }
    }
    const displayBoard = () => {
        if (movesCounter % 2 === 0) turnDetail.textContent = `${player1.name}'s turn (${player1.getMarker()})`;
        else turnDetail.textContent = `${player2.name}'s turn (${player2.getMarker()})`;
        console.log(gameBoard.board);
        let x = 0;
        let y = 0;
        squares.forEach(square => {
            square.textContent = gameBoard.board[x][y]
            if (y<2) {
                y++
            }
            else {
                x++;
                y = 0;
            }
        })
    }
    const newGame = () => {
        gameBoard.resetBoard();
        movesCounter = 0;
        displayBoard();
        squares.forEach(square => {
            square.classList.remove('disabled');
        })
    }
    const fromTheTop = () => {
        player1 = {};
        player2 = {};
    }
    const makeAMove = (xIndex, yIndex) => {
        even = movesCounter % 2 === 0 ? true : false;
        if (even) {
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
        displayBoard();
        if (movesCounter > 4) {
            if (gameBoard.checkForWinner()) {
                let winner = even ? player1.name : player2.name;
                turnDetail.textContent = `Game Over! ${winner} wins!`
                gameOverContainer.classList.remove('hidden');
                removeEventListeners();
            } else if (movesCounter === 9) {
                turnDetail.textContent = `Game Over! It's a draw!`
                gameOverContainer.classList.remove('hidden');
                removeEventListeners();
            }
        }
    }
    function removeEventListeners() {
        squares.forEach(square => {
            square.classList.add('disabled');
        })
    }
    return {
        newGame,
        createPlayer,
        makeAMove,
        displayBoard,
        fromTheTop,
    }
})();

const boardContainer = document.querySelector('.view.board-container');
const startContainer = document.querySelector('.view.start');
const gameOverContainer = document.querySelector('.view.game-over');
const playerSetupContainer = document.querySelector('.view.player-setup');
const turnDetail = document.querySelector('.turn-detail');

const playBtn = document.getElementById('play');
playBtn.addEventListener('click', () => {
    playerSetupContainer.classList.remove('hidden');
    startContainer.classList.add('hidden');
})

const startBtn = document.getElementById('startGame');
startBtn.addEventListener('click', () => {
    boardContainer.classList.remove('hidden');
    playerSetupContainer.classList.add('hidden');

    const player1 = document.getElementById('player-1').value || 'Player 1';
    const player2 = document.getElementById('player-2').value || 'Player 2';

    game.createPlayer(player1, 'x');
    game.createPlayer(player2, 'o');
    game.displayBoard();
})

const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('click', () => {
        game.makeAMove(square.getAttribute('data-x'), square.getAttribute('data-y'));
    })
})

const newGameBtn = document.getElementById('restart-game');
newGameBtn.addEventListener('click', () => {
    gameOverContainer.classList.add('hidden');
    game.newGame();
})

const fromTheToptBtn = document.getElementById('new-game');
fromTheToptBtn.addEventListener('click', () => {
    gameOverContainer.classList.add('hidden');
    boardContainer.classList.add('hidden');
    playerSetupContainer.classList.remove('hidden');
    game.newGame();
    game.fromTheTop();
})