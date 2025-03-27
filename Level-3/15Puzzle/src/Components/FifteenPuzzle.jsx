import React, { useState, useEffect } from 'react';
import './fifteenPuzzle.css';

function FifteenPuzzle() {
  const [buttons, setButtons] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [win, setWin] = useState(false);

  // Initialize buttons for the puzzle grid (1 to 15) and an empty space
  useEffect(() => {
    resetGame();
  }, []);

  // Shuffle buttons using Fisher-Yates algorithm
  const shuffleButtons = (btns) => {
    for (let i = btns.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [btns[i], btns[j]] = [btns[j], btns[i]];
    }
    return [...btns];
  };

  // Handle tile click and check valid moves
  const handleClick = (index) => {
    const newButtons = [...buttons];
    const emptyIndex = newButtons.findIndex((btn) => btn === 16);
    const isValidMove = [index - 1, index + 1, index - 4, index + 4].includes(emptyIndex);

    if (isValidMove) {
      [newButtons[index], newButtons[emptyIndex]] = [newButtons[emptyIndex], newButtons[index]];
      setButtons(newButtons);
      setMoveCount((prev) => prev + 1);
      checkForWin(newButtons);
    }
  };

  // Check if the player has won
  const checkForWin = (btns) => {
    const isWin = btns.slice(0, 15).every((val, idx) => val === idx + 1);
    if (isWin) {
      setWin(true);
    }
  };

  // Reset game function
  const resetGame = () => {
    const initialButtons = Array.from({ length: 16 }, (_, i) => i + 1);
    setButtons(shuffleButtons(initialButtons));
    setMoveCount(0);
    setWin(false);
  };

  return (
    <div className="container">
      <h1>15 Puzzle Game</h1>
      <p>Total Moves: {moveCount}</p>
      {win && <p className="winMessage">Congrats! You won!</p>}
      <div className="btnContainer">
        {buttons.map((num, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={num === 16 ? 'emptyBtn' : 'puzzleBtn'}
            style={num === index + 1 ? { border: '2px solid rgb(99, 99, 222)' } : {}}
          >
            {num !== 16 ? num : 'X'}
          </button>
        ))}
      </div>
      <button id="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

export default FifteenPuzzle;
