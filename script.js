const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let isGameActive = true;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  if (!isGameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    statusMessage.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
  } else if (isDraw()) {
    statusMessage.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return winCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  currentPlayer = "X";
  isGameActive = true;
  statusMessage.textContent = "X's Turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartButton.addEventListener("click", restartGame);

statusMessage.textContent = "X's Turn";
