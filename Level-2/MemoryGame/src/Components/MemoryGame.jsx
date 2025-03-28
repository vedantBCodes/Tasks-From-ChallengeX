import React, { useState, useEffect } from "react";
import "./memorygame.css"; // Importing the CSS file

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(3); // Grid starts with 3x3
  const [coloredBoxCount, setColoredBoxCount] = useState(3); // 3 colored boxes initially
  const [coloredBoxIndexes, setColoredBoxIndexes] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [gamePhase, setGamePhase] = useState("showing"); // 'showing' -> showing colors, 'playing' -> user clicks
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);

  // Generate random colored boxes at the beginning of each level
  useEffect(() => {
    const totalBoxes = gridSize * gridSize;
    const randomIndexes = new Set();
    while (randomIndexes.size < coloredBoxCount) {
      randomIndexes.add(Math.floor(Math.random() * totalBoxes));
    }
    setColoredBoxIndexes([...randomIndexes]);
    setSelectedBoxes([]);
    setGamePhase("showing");

    const timer = setTimeout(() => setGamePhase("playing"), 2000); // Hide colors after 2 seconds
    return () => clearTimeout(timer);
  }, [level]);

  const handleBoxClick = (index) => {
    if (gamePhase !== "playing") return; // Prevent clicks during the "showing" phase

    if (coloredBoxIndexes.includes(index)) {
      setSelectedBoxes([...selectedBoxes, index]);
    } else {
      setLives((prevLives) => prevLives - 1);
    }

    // Level up when all correct boxes are selected
    if (selectedBoxes.length + 1 === coloredBoxCount) {
      setTimeout(() => {
        setGridSize((prev) => prev + 1);
        setColoredBoxCount((prev) => prev + 1);
        setLevel((prev) => prev + 1);
      }, 500);
    }
  };

  const restartGame = () => {
    setGridSize(3);
    setColoredBoxCount(3);
    setLevel(1);
    setLives(3);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Level: {level}</p>
      <p>Lives: {lives}</p>
      {lives <= 0 ? (
        <div>
          <h2>Game Over!</h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <div
          className="gridContainer"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 100px)`,
            gridTemplateRows: `repeat(${gridSize}, 100px)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <div
              key={index}
              className={`box ${
                gamePhase === "showing" && coloredBoxIndexes.includes(index)
                  ? "colored"
                  : selectedBoxes.includes(index)
                  ? "correct"
                  : ""
              }`}
              onClick={() => handleBoxClick(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
