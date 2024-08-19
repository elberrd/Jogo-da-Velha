const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const resetButton = document.querySelector("#reset-button");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";

infoDisplay.textContent = "Vez do circulo primeiro";

function createBoard() {
  gameBoard.innerHTML = ""; // Clear the board before creating it
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = go === "circle" ? "Vez do circulo" : "Vez do X";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.textContent = "Circulo Ganhou!";
      highlightWinningCombo(array, "circle");
      disableBoard();
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.textContent = "X Ganhou!";
      highlightWinningCombo(array, "cross");
      disableBoard();
    }
  });
}

function highlightWinningCombo(combo, winner) {
  combo.forEach((index) => {
    document.getElementById(index).classList.add("winning-square");
  });

  if (combo.includes(0) && combo.includes(4) && combo.includes(8)) {
    document.getElementById(0).classList.add("diagonal-left");
    document.getElementById(4).classList.add("diagonal-left");
    document.getElementById(8).classList.add("diagonal-left");
  } else if (combo.includes(2) && combo.includes(4) && combo.includes(6)) {
    document.getElementById(2).classList.add("diagonal-right");
    document.getElementById(4).classList.add("diagonal-right");
    document.getElementById(6).classList.add("diagonal-right");
  } else if (combo[0] % 3 === combo[1] % 3) {
    combo.forEach((index) => {
      document.getElementById(index).classList.add("vertical");
    });
  } else {
    combo.forEach((index) => {
      document.getElementById(index).classList.add("horizontal");
    });
  }
}

function disableBoard() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    square.removeEventListener("click", addGo);
  });
}

function resetGame() {
  go = "circle";
  infoDisplay.textContent = "Vez do circulo primeiro";
  createBoard(); // Recreate the game board
}

// Attach event listener to the reset button
resetButton.addEventListener("click", resetGame);
