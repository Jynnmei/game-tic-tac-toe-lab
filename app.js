// Display an empty tic-tac-toe board when the page is initially displayed.
// A player can click on the nine cells to make a move.
// Every click will alternate between marking an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat’s game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.

/*-------------------------------- Constants --------------------------------*/
const player = ["X", "O"];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let squareIndex = null;

/*------------------------ Cached Element References ------------------------*/
const messageElement = document.querySelector("#message");
const squares = document.querySelectorAll(".sqr");
const resetBtn = document.querySelector(".btn");

/*------------------------- Functions & Event Listners --------------------------------*/

const checkWinner = () => {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const a = condition[0];
    const b = condition[1];
    const c = condition[2];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      messageElement.textContent = `It's ${currentPlayer} wins!`;
      gameOver = true;
      return true;
    }
  }

  return false;
};

const handleSquareClick = (e) => {
  const squareIndex = e.target.id;

  if (board[squareIndex] !== "" || gameOver) {
    return;
  }

  board[squareIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    messageElement.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    return;
  }

  if (!board.includes("")) {
    messageElement.textContent = "It's a tie!";
    gameOver = true;
    return true;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = `It's ${currentPlayer} turn`;
};
squares.forEach((square) => {
  square.addEventListener("click", handleSquareClick);
});

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    console.log("Game Reset!");

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    squares.forEach((square) => {
      square.textContent = "";
    });

    messageElement.textContent = `It ${currentPlayer}'s turn`;
  });
}

messageElement.textContent = `${currentPlayer}'s turn`;
