import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initialBoard(),
      isplayerBlack: true,
    };

    this.turnOver = this.turnOver.bind(this);
    this.flipableCells = this.flipableCells.bind(this);
  }

  initialBoard() {
    let initialboard = [];
    for (let y = 0; y < 8; y++) {
      let row = [];
      for (let x = 0; x < 8; x++) {
        if ((y === 3 && x === 3) || (y === 4 && x === 4)) {
          row.push('白');
        } else if ((y === 3 && x === 4) || (y === 4 && x === 3)) {
          row.push('黒');
        } else {
          row.push(null);
        }
      }
      initialboard.push(row);
    }
    return initialboard;
  }

  turnOver(idx) {
    let [yPos, xPos] = idx.split('-');
    const intY = parseInt(yPos);
    const intX = parseInt(xPos);
    if (this.state.board[intY][intX]) return;

    let flipeCells = this.flipableCells(intY, intX);
    if (flipeCells.length === 0) return;

    let player = this.state.isplayerBlack ? '黒' : '白';
    let oldBoard = this.state.board.slice();

    function newBoard(yPos, xPos, flipeCells) {
      oldBoard[yPos][xPos] = player;
      flipeCells.forEach((val) => {
        const y = val[0];
        const x = val[1];
        oldBoard[y][x] = player;
      });
      return oldBoard;
    }

    this.setState({
      board: newBoard(intY, intX, flipeCells),
      isplayerBlack: !this.state.isplayerBlack,
    });
  }

  flipableCells(yPos, xPos) {
    const direction = [
      [-1, 0], // ↑
      [-1, 1], // ↗
      [0, 1], // →
      [1, 1], // ➘
      [1, 0], // ↓
      [1, -1], // ↙
      [0, -1], // ←
      [-1, -1], // ↖
    ];
    let newArr = [];
    const currentBoard = this.state.board.slice();
    const player = this.state.isplayerBlack ? '黒' : '白';

    function flipeCells(yPos, xPos, y, x) {
      let flipeCells = [];
      let flipeY = yPos + y;
      let flipeX = xPos + x;
      while (true) {
        if (
          0 > flipeX ||
          0 > flipeY ||
          flipeX > 7 ||
          flipeY > 7 ||
          currentBoard[flipeY][flipeX] === null
        ) {
          return [];
        } else if (currentBoard[flipeY][flipeX] === player) {
          return flipeCells;
        } else {
          flipeCells.push([flipeY, flipeX]);
          flipeY += y;
          flipeX += x;
        }
      }
    }

    direction.forEach((val) => {
      newArr = newArr.concat(flipeCells(yPos, xPos, val[0], val[1]));
    });

    return newArr;
  }

  render() {
    const board = this.state.board.map((row, y) => {
      let displayRow = row.map((col, x) => (
        <Cell
          turnOver={this.turnOver}
          key={`${y}-${x}`}
          pos={`${y}-${x}`}
          stone={col}
          isFlipable={!!this.flipableCells(y, x).length && col === null}
        />
      ));
      return (
        <tr className='Board-row' key={y}>
          {displayRow}
        </tr>
      );
    });

    return (
      <div className='Board'>
        <table className='Board-table'>
          <tbody>{board}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
