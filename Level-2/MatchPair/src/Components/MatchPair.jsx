import React, { useEffect, useState } from 'react';
import './matchpair.css'; // Import the styles for the game

const symbolsSet1 = ['🍇', '🍉', '🚗', '🍌', '🏠', '🥭', '🍎', '🐯', '🍇', '🍉', '🚗', '🍌', '🏠', '🥭', '🍎', '🐯'];
const symbolsSet2 = ['🍒', '🍓', '🐵', '🥝', '🍿', '🏀', '🎱', '🐻', '🍒', '🍓', '🐵', '🥝', '🍿', '🏀', '🎱', '🐻'];
const symbolsSet3 = ['🍜', '🍢', '🎓', '🍤', '🦀', '🍦', '🍩', '🎂', '🍜', '🍢', '🎓', '🍤', '🦀', '🍦', '🍩', '🎂'];

function MatchPair() {
  const [symbols, setSymbols] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [buttonsState, setButtonsState] = useState([]);
  const [preIndex, setPreIndex] = useState(null);
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    setRandomSymbols(); // Initialize game symbols on component mount
  }, []);

  useEffect(() => {
    shuffleAndSetValues();
  }, [symbols]);

  const getRandomSymbols = () => {
    const randomSet = Math.floor(Math.random() * 3) + 1;
    return randomSet === 1 ? symbolsSet1 : randomSet === 2 ? symbolsSet2 : symbolsSet3;
  };

  const setRandomSymbols = () => {
    setSymbols(getRandomSymbols());
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleAndSetValues = () => {
    const shuffledSymbols = shuffleArray([...symbols]);
    const initialButtonsState = shuffledSymbols.map((symbol) => ({
      symbol,
      revealed: false,
      matched: false,
    }));
    setButtonsState(initialButtonsState);
    setAttemptCount(0);
    setPreIndex(null);
    setMatchCount(0);
  };

  const handleButtonClick = (index) => {
    const newButtonsState = [...buttonsState];

    if (newButtonsState[index].matched || newButtonsState[index].revealed) return;

    newButtonsState[index].revealed = true;

    if (preIndex !== null) {
      const prevIndex = preIndex;
      if (newButtonsState[index].symbol === newButtonsState[prevIndex].symbol) {
        newButtonsState[index].matched = true;
        newButtonsState[prevIndex].matched = true;
        setMatchCount(matchCount + 1);
      } else {
        setTimeout(() => {
          newButtonsState[index].revealed = false;
          newButtonsState[prevIndex].revealed = false;
          setButtonsState([...newButtonsState]);
        }, 1000);
      }
      setPreIndex(null);
    } else {
      setPreIndex(index);
    }

    setButtonsState([...newButtonsState]);
    setAttemptCount(attemptCount + 1);
  };

  return (
    <div className="App">
      <h1>Matching Game</h1>
      <div id="attempts">
        <p style={{fontSize:'20px'}}>Attempts: {attemptCount}</p>
      </div>
      <div className="container">
      <div className="gridContainer">
        {buttonsState.map((button, index) => (
          <button
            key={index}
            style={{
              backgroundColor: button.matched ? 'yellowgreen' : button.revealed ? '' : '#7fffd4',
              color: button.revealed ? '' : 'transparent',
              fontSize: '30px',
            }}
            onClick={() => handleButtonClick(index)}
          >
            {button.symbol}
          </button>
        ))}
      </div>
    </div> <br />
      <input type="button" value="Restart Game" onClick={() => setRandomSymbols()} />
    </div>
  );
}

export default MatchPair;
