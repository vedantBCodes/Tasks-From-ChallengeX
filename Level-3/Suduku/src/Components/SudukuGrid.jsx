// SudokuGrid.js
import React from "react";

function SudokuGrid({ board, handleInputChange }) {
  return (
    <div className="grid">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            value={value !== 0 ? value : ""}
            onChange={(e) =>
              handleInputChange(rowIndex, colIndex, e.target.value)
            }
            maxLength="1"
            className={value !== 0 ? "fixed-cell" : ""}
          />
        ))
      )}
    </div>
  );
}

export default SudokuGrid;
