import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/


function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let x = 0; x < nrows; x++) {
      let row = [];
      for (let y = 0; y < ncols; y++) {
        row.push(generateLight());
      };
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function generateLight() {
    return (Math.random() < chanceLightStartsOn);
  }

  function hasWon() {
    for (let x = 0; x < nrows; x++) {
      for (let y = 0; y < ncols; y++) {
        if (board[y][x]) return false;
      };
    }
    return true;
  };

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(oldRow => oldRow.map(oldCell => oldCell));
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }
  createBoard();
  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return ("you won!")
  };

  // make table board

  return (
    <div>
      
        {board.map((row,x) =>
          <div>
            {row.map((cell,y) => <span><Cell flipCellsAroundMe={()=>flipCellsAround(`${x}-${y}`)} isLit={cell} /></span>)}
          </div>
        )}
      
    </div>
  );
  // TODO
}



export default Board;
