let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let statusDisplay = document.getElementById('status');
let boxes = document.querySelectorAll('#box');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
document.querySelector('.restart').addEventListener('click', restartGame);
function handleBoxClick(event) {
    const clickedBox = event.target;
    const boxIndex = Array.from(boxes).indexOf(clickedBox);
    if (board[boxIndex] !== '' || !gameActive) {
        return;
    }
    board[boxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;
    clickedBox.style.color = currentPlayer === 'X' ? 'blue' : 'red';
    checkResult();
}
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has WON!!!`;
        statusDisplay.style.color="green"
        gameActive = false;
        return;
    }
    if (!board.includes('')) {
        statusDisplay.textContent = 'It\'s a DRAW!!!';
        statusDisplay.style.color="grey"
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}
function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = 'Start The GAME';
    statusDisplay.style.color="white"
    boxes.forEach(box => box.textContent = '');
}
