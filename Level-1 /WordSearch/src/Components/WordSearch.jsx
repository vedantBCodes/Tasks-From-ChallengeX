import React, { useState, useEffect } from "react";
import "./WordSearch.css";

const grid = [
  ["S", "C", "O", "D", "E"],
  ["M", "H", "T", "M", "L"],
  ["A", "N", "Z", "Y", "P"],
  ["R", "M", "A", "P", "P"],
  ["T", "J", "A", "V", "A"]
];

const wordsToFind = ["CODE", "APPLE", "JAVA", "SMART", "HTML"];

const WordSearch = () => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  useEffect(() => {
    if (foundWords.length === wordsToFind.length) {
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [foundWords]);

  const checkWord = (selection) => {
    const word = selection.map(cell => cell.letter).join("");
    if (foundWords.includes(word)) {
      alert(`The word "${word}" has already been found!`);
      setSelectedCells([]);
      return false;
    }
    return wordsToFind.includes(word);
  };

  const handleCellClick = (row, col) => {
    if (gameOver) return;
    
    const newSelection = [...selectedCells, { row, col, letter: grid[row][col] }];
    setSelectedCells(newSelection);
    
    if (checkWord(newSelection)) {
      setFoundWords([...foundWords, newSelection.map(cell => cell.letter).join("")]);
      setSelectedCells([]);
    }
  };

  const cancelWordSelection = () => {
    setSelectedCells([]);
  };

  const restartGame = () => {
    setSelectedCells([]);
    setFoundWords([]);
    setTime(30);
    setGameOver(false);
    setButtonsDisabled(false);
  };

  return (
    <main>
      <div className="word-search-container">
        <h1 style={{color:'blue',fontSize:'40px'}}>Word Search Game</h1>
        <p style={{fontSize:'20px',color:'green'}}>Find 5 hidden words in 30 seconds</p>
        {gameOver ? (
          time === 0 ? <h2>Game Over ! Time's up !</h2> : <h2>Congratulations! You found all words!</h2>
        ) : (
          <h2>Time Left: {time} sec</h2>
        )}
        <div className="wordSearchGrid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="wordSearchRow">
              {row.map((letter, colIndex) => (
                <button
                  key={colIndex}
                  className={`wordSearchCell ${selectedCells.some(c => c.row === rowIndex && c.col === colIndex) ? "selected" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="words-found">
        <h4 style={{color:'rgb(107, 108, 108)'}}>Words Found: {foundWords.length} / 5</h4>
          <ul>
            <li>
              {foundWords.map((word, index) => (
                <span key={index}>{word}&nbsp;&nbsp;</span>
              ))}
            </li>
          </ul>
        </div>
        <button onClick={cancelWordSelection} className="cancel-word-button">Cancel Selected letters</button> <br /><br />
        {gameOver && <button onClick={restartGame} className="wordSearchRestartBtn">Restart Game</button>}
      </div>
    </main>
  );
};

export default WordSearch;
