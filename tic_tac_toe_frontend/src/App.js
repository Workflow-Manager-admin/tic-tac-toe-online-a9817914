import React, { useState } from 'react';
import './App.css';

/**
 * Color palette (from requirements):
 * --accent:   #ffca28 (yellow)
 * --primary:  #1976d2 (blue)
 * --secondary:#424242 (gray)
 * 
 * This app implements a 3x3 tic tac toe game for two players.
 */

// PUBLIC_INTERFACE
function App() {
  // The tic tac toe board is a 3x3 array tracked in a flat 9-item array.
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [nextX, setNextX] = useState(true); // true: X, false: O
  const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'draw'
  const [winner, setWinner] = useState(null); // 'X' | 'O' | null

  /**
   * Checks the current board for a win, draw, or ongoing game.
   * @param {string[]|null[]} squares 
   * @returns {{winner: string|null, draw: boolean}}
   */
  // PUBLIC_INTERFACE
  function calculateGameResult(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], draw: false };
      }
    }
    if (squares.every(Boolean)) {
      return { winner: null, draw: true };
    }
    return { winner: null, draw: false };
  }

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || status !== 'playing') return;
    const newBoard = board.slice();
    newBoard[idx] = nextX ? 'X' : 'O';
    const { winner, draw } = calculateGameResult(newBoard);
    setBoard(newBoard);
    if (winner) {
      setStatus('won');
      setWinner(winner);
    } else if (draw) {
      setStatus('draw');
      setWinner(null);
    } else {
      setNextX(!nextX);
      setStatus('playing');
      setWinner(null);
    }
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(emptyBoard);
    setNextX(true);
    setStatus('playing');
    setWinner(null);
  }

  // Renders the current status text
  // PUBLIC_INTERFACE
  function renderStatus() {
    if (status === 'won' && winner) {
      return (
        <span className="result win">
          {winner} wins!
        </span>
      );
    } else if (status === 'draw') {
      return (
        <span className="result draw">
          Draw!
        </span>
      );
    } else {
      return (
        <span className="result playing">
          {nextX ? 'X' : 'O'}'s turn
        </span>
      );
    }
  }

  return (
    <div className="tic-tac-toe-app">
      <h1 className="app-title">Tic Tac Toe</h1>
      <div className="board-container">
        <Board squares={board} onClick={handleSquareClick} status={status} />
      </div>
      <div className="controls">
        {renderStatus()}
        <button
          className="restart-btn"
          onClick={handleRestart}
          aria-label="Restart Game"
        >
          Restart Game
        </button>
      </div>
      <footer className="app-footer">
        <span className="footer-text">
          Minimal React &bull; Two Player &bull; Light Theme
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onClick, status }) {
  // Render each cell as a Square
  return (
    <div className={`board ${status}`}>
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  return (
    <button
      className={`square${value ? ' filled' : ''}`}
      onClick={onClick}
      aria-label={value ? `Cell ${value}` : "Empty cell"}
      tabIndex={0}
    >
      {value || ''}
    </button>
  );
}

export default App;
