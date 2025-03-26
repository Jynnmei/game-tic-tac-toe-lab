//1) Define the required variables used to track the state of the game.
//2) Store cached element references.
//3) Upon loading, the game state should be initialized, and a function should be called to render this game state.
//4) The state of the game should be rendered to the user.
//5) Define the required constants.
//6) Handle a player clicking a square with a `handleClick` function.
//7) Create Reset functionality.


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
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

init();
