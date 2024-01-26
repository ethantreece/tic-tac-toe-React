import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// Define players
const playerX = "X";
const playerO = "O";

// Initialize game state
let currentPlayer = playerX;
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Function to handle cell clicks
function handleClick(cellIndex) {
  console.log("clicked " + cellIndex);
  // Check if the cell is empty and the game is still active
  if (gameBoard[cellIndex] === "" && gameActive) {
    // Update the game board with the current player's symbol
    gameBoard[cellIndex] = currentPlayer;

    // Update the cell's content on the page
    document.getElementsByClassName("cell")[cellIndex].innerText =
      currentPlayer;

    // Check for a winner or a tie
    if (checkWinner() === currentPlayer) {
      alert(`Player ${currentPlayer} wins!`);
      resetGame();
      gameActive = false;
    } else if (checkTie()) {
      alert("It's a tie!");
      gameActive = false;
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
  }
}

// Function to reset the game
function resetGame() {
  console.log("Resetting game");
  // Clear the game board
  gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Reset cell content on the page
  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.innerText = "";
  }

  // Reset game state
  currentPlayer = playerX;
  gameActive = true;
}

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a]; // Return the winning player's symbol
    }
  }

  return null; // No winner yet
}

// Function to check for a tie
function checkTie() {
  return gameBoard.every((cell) => cell !== ""); // Check if all cells are filled
}

export default App;
