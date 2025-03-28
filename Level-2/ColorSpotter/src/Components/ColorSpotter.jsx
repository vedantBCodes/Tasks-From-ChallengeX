import React, { useEffect, useState } from "react";
import "./colorSpotter.css";

const ColorSpotter = () => {
  const [gridSize, setGridSize] = useState(3);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(
    localStorage.getItem("maxScore5") || 0
  );
  const [uniqueIndex, setUniqueIndex] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [baseColor, setBaseColor] = useState(getRandomRGBColor());

  useEffect(() => {
    localStorage.setItem("maxScore5", maxScore);
    generateGrid(gridSize);
  }, [maxScore, gridSize]);

  const generateGrid = (size) => {
    setUniqueIndex(Math.floor(Math.random() * (size * size)));
    setBaseColor(getRandomRGBColor());
  };

  const handleBoxClick = (index) => {
    if (index === uniqueIndex) {
      setScore(score + 1);
      setGridSize(gridSize + 1);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      if (score > maxScore) setMaxScore(score);
      setScore(0);
      setGridSize(3);
    }
    generateGrid(gridSize + 1);
  };

  return (
    <div className="container">
      <div className="score">
        <h1>Color Spotter</h1>
        <span id="score">Score: {score}</span>
        <span id="maxScore">Max Score: {maxScore}</span>
      </div>

      <div className={`mainBox ${isShaking ? "shake" : ""}`} style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const isUnique = index === uniqueIndex;
          return (
            <button
              key={index}
              style={{
                backgroundColor: baseColor,
                opacity: isUnique ? 0.85 : 1,
              }}
              onClick={() => handleBoxClick(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

// Function to generate a random RGB color
const getRandomRGBColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export default ColorSpotter;
