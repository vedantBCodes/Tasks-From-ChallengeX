import React, { useState, useEffect, useRef } from 'react';
import './typingspeed.css'; // Optional CSS file

const TypingSpeedTest = () => {
  // Initial statement to type
  const initialStatement = 'he turned in the research paper on friday otherwise he would have not passed the class';

  // State variables
  const [statement, setStatement] = useState(initialStatement); // Current statement placeholder
  const [cnt, setCnt] = useState(0); // Key press counter
  const [letterCnt, setLetterCnt] = useState(0); // Count of correctly typed letters
  const [time, setTime] = useState(10); // Timer set for 10 seconds
  const [stopTime, setStopTime] = useState(false); // Stop timer flag
  const [typingSpeed, setTypingSpeed] = useState(null); // Final typing speed

  const resetBtnRef = useRef(null); // Reference for reset button

  // Timer logic
  useEffect(() => {
    let interval;
    if (cnt > 0 && !stopTime) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setStopTime(true); // Timer stopped
            setTypingSpeed((letterCnt / 10).toFixed(2)); // Calculate typing speed in letters per second
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [cnt, stopTime, letterCnt]); // Dependencies

  // Handle virtual keyboard button clicks
  const handleButtonClick = (char) => {
    setCnt((prevCnt) => prevCnt + 1); // Increment the press counter

    if (char === statement[0] && !stopTime) {
      setStatement((prevStatement) => prevStatement.slice(1)); // Remove first character if correct
      setLetterCnt((prevCount) => prevCount + 1); // Increment letter count
    }
  };

  // Handle real keyboard typing (keydown event)
  useEffect(() => {
    const handleKeyDown = (e) => {
      setCnt((prevCnt) => prevCnt + 1); // Increment key press count
      if (e.key === statement[0] && !stopTime) {
        setStatement((prevStatement) => prevStatement.slice(1)); // Remove first character if correct
        setLetterCnt((prevCount) => prevCount + 1); // Increment typed letters count
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
  }, [statement, stopTime]); // Dependencies

  // Reset button click handler
  const handleResetClick = () => {
    setStatement(initialStatement); // Reset the statement
    setCnt(0);
    setLetterCnt(0);
    setTime(10); // Reset the timer
    setStopTime(false);
    setTypingSpeed(null); // Reset typing speed
  };

  // Virtual keyboard buttons (small letters + numbers)
  const keyboardButtons = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
  ];

  // Render
  return (
    <div className="container">
      <h1>Typing Speed Test</h1>
      <p>
        <b>Start typing to measure your speed.</b> <br />
        You can type on your keyboard or use the virtual keyboard below.
      </p>

      <input type="text" readOnly placeholder={statement} />

      <div className="btnContainer">
        {keyboardButtons.map((btn, index) => (
          <button key={index} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="timeContainer">
        <h3>
          {stopTime
            ? `Typing speed: ${typingSpeed} lps (letters per second)`
            : `${time} seconds left`}
        </h3>
      </div>

      <button id="reset" ref={resetBtnRef} onClick={handleResetClick}>
        Reset
      </button>
    </div>
  );
};

export default TypingSpeedTest;
