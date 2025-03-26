// Display an empty tic-tac-toe board when the page is initially displayed.
// A player can click on the nine cells to make a move.
// Every click will alternate between marking an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat’s game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.

const player = ["X", "O"];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let tie = false;
let gameOver = false;
let winner = null;

const messageEl = document.querySelector("#message");
const squareEls = document.querySelectorAll(".sqr");
const resetBtnEl = document.querySelector(".btn");

function init() {
  console.log("Game initialized!");
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  tie = false;
  gameOver = false;
  winner = null;
  render();
}

function updateBoard() {
  squareEls.forEach((square, index) => {
    const cellValue = board[index];
    square.textContent = cellValue;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn}'s turn`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Player ${turn} wins!`;
  }
}

function render() {
  updateBoard();
  updateMessage();
}

function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const condition = winningCombos[i];
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      messageEl.textContent = `It's ${turn} wins!`;
      winner = true;
      gameOver = true;
      return true;
    }
  }
  return false;
}

function placePiece(squareIndex) {
  board[squareIndex] = turn;
}

function checkForTie() {
  if (!board.includes("") && !winner) {
    tie = true;
    gameOver = true;
    return true;
  }
  return false;
}

function handleClick(e) {
  const squareIndex = e.target.id;

  if (board[squareIndex] !== "" || gameOver) {
    return;
  }

  placePiece(squareIndex);

  if (checkForWinner()) {
    render();
    return;
  }

  if (checkForTie()) {
    render();
    return true;
  }

  switchPlayerTurn();
  render();
}

function switchPlayerTurn() {
  turn = turn === "X" ? "O" : "X";
}

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

init();
