import React, { useState } from 'react';
    import './tictactoe.css'
    
    const TicTacToe = () => {
      const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
      const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player starts first
      const winner = calculateWinner(board);
    
      const handlePlayerMove = (index) => {
        if (board[index] || winner) return; // Prevent move if already filled or game over
    
        const newBoard = [...board];
        newBoard[index] = 'X'; // Player is 'X'
        setBoard(newBoard);
        setIsPlayerTurn(false);
    
        if (!calculateWinner(newBoard) && !newBoard.includes(null)) return; // If draw
    
        setTimeout(() => makeAIMove(newBoard), 500); // Let AI move after delay
      };
    
      const makeAIMove = (currentBoard) => {
        if (winner || !currentBoard.includes(null)) return; // Stop AI if game is over
    
        const bestMove = getBestMove(currentBoard);
        const newBoard = [...currentBoard];
        newBoard[bestMove] = 'O'; // AI plays 'O'
        setBoard(newBoard);
        setIsPlayerTurn(true);
      };
    
      const getBestMove = (currentBoard) => {
        const emptyIndices = currentBoard
          .map((value, index) => (value === null ? index : null))
          .filter((val) => val !== null);
        let bestScore = -Infinity;
        let move = 0;
    
        for (let index of emptyIndices) {
          currentBoard[index] = 'O'; // AI move simulation
          const score = minimax(currentBoard, false);
          currentBoard[index] = null; // Undo the move
          if (score > bestScore) {
            bestScore = score;
            move = index;
          }
        }
        return move;
      };
    
      const minimax = (board, isMaximizing) => {
        const result = calculateWinner(board);
        if (result === 'X') return -10; // Player wins
        if (result === 'O') return 10; // AI wins
        if (!board.includes(null)) return 0; // Draw
    
        if (isMaximizing) {
          let bestScore = -Infinity;
          board.forEach((_, index) => {
            if (board[index] === null) {
              board[index] = 'O';
              bestScore = Math.max(bestScore, minimax(board, false));
              board[index] = null;
            }
          });
          return bestScore;
        } else {
          let bestScore = Infinity;
          board.forEach((_, index) => {
            if (board[index] === null) {
              board[index] = 'X';
              bestScore = Math.min(bestScore, minimax(board, true));
              board[index] = null;
            }
          });
          return bestScore;
        }
      };
    
      const renderSquare = (index) => (
        <button className="square" onClick={() => handlePlayerMove(index)}>
          {board[index]}
        </button>
      );
    
      const resetGame = () => setBoard(Array(9).fill(null));
    
      return (
        <div className="game">
          <h1>Tic Tac Toe (with AI)</h1>
          <div className="board">
            <div className="board-row">{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
            <div className="board-row">{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
            <div className="board-row">{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
          </div>
          <div className="status">
            {winner
              ? `Winner: ${winner}`
              : board.includes(null)
              ? `Next: ${isPlayerTurn ? 'You (X)' : 'AI (O)'}`
              : "It's a draw!"}
          </div>
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      );
    };
    
    // Check for a winner
    const calculateWinner = (squares) => {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    };
    
    export default TicTacToe;

    
    