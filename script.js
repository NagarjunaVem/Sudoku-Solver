// Get board from input fields
function getBoard() {
  let cells = document.querySelectorAll(".cell");
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = cells[i * 9 + j].value;
      row.push(val ? parseInt(val) : 0);
    }
    board.push(row);
  }
  return board;
}

// Display solved board
function setBoard(board) {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i * 9 + j].value = board[i][j] !== 0 ? board[i][j] : "";
    }
  }
}

// Check if placing num is valid
function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

// Backtracking algorithm
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Solve Button
function solveSudoku() {
  let board = getBoard();
  if (solve(board)) {
    setBoard(board);
  } else {
    alert("No solution exists!");
  }
}

// Clear Button
function clearBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.value = "");
}

// Enable arrow key navigation between Sudoku cells
document.addEventListener("keydown", function (e) {
  const cells = Array.from(document.querySelectorAll(".cell"));
  const index = cells.indexOf(document.activeElement);

  if (index === -1) return; // do nothing if not focused on a cell

  const row = Math.floor(index / 9);
  const col = index % 9;

  let newRow = row;
  let newCol = col;

  switch (e.key) {
    case "ArrowUp":
      newRow = row > 0 ? row - 1 : row;
      break;
    case "ArrowDown":
      newRow = row < 8 ? row + 1 : row;
      break;
    case "ArrowLeft":
      newCol = col > 0 ? col - 1 : col;
      break;
    case "ArrowRight":
      newCol = col < 8 ? col + 1 : col;
      break;
    default:
      return; // exit if not an arrow key
  }

  e.preventDefault(); // prevent page scroll
  const newIndex = newRow * 9 + newCol;
  cells[newIndex].focus();
});
