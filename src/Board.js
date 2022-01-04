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

function Board({ nrows = 5, ncols = 5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create nested false array
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(false);
      }
      initialBoard.push(row);
    }

    const flipCell = (y, x) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        initialBoard[y][x] = !initialBoard[y][x];
      }
    }

    /**
     * randomly toggle cells, and surrounding cells
     * this ensures that there is always a solution to the board, and is scalable to boards of any size
     * in theory, the player only has to repeat the sequences of button presses leading to the current configuration
     * 25 random toggles arbitrarily chosen
     * https://dc.ewu.edu/cgi/viewcontent.cgi?referer=https://www.google.com/&httpsredir=1&article=1166&context=theses
     */
    for (let i = 0; i < 25; i++) {
      let y = Math.floor(Math.random() * nrows);
      let x = Math.floor(Math.random() * ncols);
      flipCell(y, x);
      flipCell(y, (x - 1));
      flipCell(y, (x + 1));
      flipCell((y - 1), x);
      flipCell((y + 1), x);
    }
    return initialBoard;
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
      // using JSON functions is one method to make a deep copy of a nested array
      // https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
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

  function hasWon() {
    // check the board in state to determine whether the player has won.
    // a false nested array indicates a win
    const lightOff = (light) => !light;
    const rowOff = (row) => row.every(lightOff);
    return board.every(rowOff);
  }

  // generate a new random board
  function reset() {
    setBoard(createBoard());
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
      <div className="Board">
        <h1 className="Board-header"><span className="Board-win">YOU WIN!</span></h1>
        <button className="Board-reset" onClick={reset}>Play Again?</button>
      </div>
    );
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
          key={coord}
          coord={coord} />
      );
    }
    tableBoard.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div>
      <h1 className="Board-title">LIGHTS OUT</h1>
      <table className="Board-table">
        <tbody>{tableBoard}</tbody>
      </table>
    </div>
  );
}

export default Board;
