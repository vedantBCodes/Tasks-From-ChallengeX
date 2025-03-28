import React, { useState } from "react";
// import SudokuGrid from "./SudokuGrid";
import SudokuGrid from "./SudukuGrid.jsx";
import "./suduko.css";

const Suduko = () => {
    const initialBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ];
    
      const [board, setBoard] = useState(initialBoard);
    
      const handleInputChange = (row, col, value) => {
        const updatedBoard = [...board];
        updatedBoard[row][col] = value === "" ? 0 : parseInt(value, 10);
        setBoard(updatedBoard);
      };
    
      const resetBoard = () => setBoard(initialBoard);
    
      const checkSolution = () => {
        alert(isSudokuSolved(board) ? "Sudoku Solved!" : "Not Yet Solved.");
      };
    
      const isSudokuSolved = (grid) => {
        // Simple check for any empty (0) values
        return !grid.some(row => row.includes(0));
      };
    
      return (
        <div className="app">
          <h1>Sudoku Game</h1>
          <SudokuGrid board={board} handleInputChange={handleInputChange} />
          <div className="buttons">
            <button onClick={checkSolution}>Check Solution</button>
            <button onClick={resetBoard}>Reset</button>
          </div>
        </div>
      );
    }

export default Suduko
