import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.initialBoard(),
    };
  }

  initialBoard() {
    let initialboard = [];
    for (let y = 0; y < 8; y++) {
      let row = [];
      for (let x = 0; x < 8; x++) {
        if ((y === 3 && x === 3) || (y === 4 && x === 4)) {
          row.push('〇');
        } else if ((y === 3 && x === 4) || (y === 4 && x === 3)) {
          row.push('●');
        } else {
          row.push(null);
        }
      }
      initialboard.push(row);
    }
    return initialboard;
  }

  render() {
    const board = this.state.board.map((row, y) => {
      let displayRow = row.map((col, x) => (
        <Cell key={`${y}-${x}`} pos={`${y}-${x}`} stone={col} />
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
