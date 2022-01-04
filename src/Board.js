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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        let randNum = (Math.random() * 1); // generate number between 0 and 1
        let x = Math.round(10 * randNum) / 10;     // round to tenths
        (x < chanceLightStartsOn) ? row.push(true) : row.push(false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    const lightOff = (light) => !light;
    const rowOff = (row) => row.every(lightOff);
    return board.every(rowOff);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      let newBoard = JSON.parse(JSON.stringify(board));

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell((y - 1), x, newBoard);
      flipCell((y + 1), x, newBoard);
      flipCell(y, (x - 1), newBoard);
      flipCell(y, (x + 1), newBoard);

      // return the copy, setting it as the  current board
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    alert("You win");
  }

  // make table board
  let tableBoard = [];

  for (let i = 0; i < nrows; i++) {
    let row = [];
    for (let j = 0; j < ncols; j++) {
      let coord = `${i}-${j}`
      row.push(
        <Cell
          isLit={board[i][j]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
          key={coord} />
      )
    }
    tableBoard.push(<tr key={i}>{row}</tr>);
  }

  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
