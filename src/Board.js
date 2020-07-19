import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  render() {
    const { board, player } = this.props;
    const displayBoard = board.map((row, y) => {
      // マス目
      let displayRow = row.map((col, x) => (
        <Cell
          turnOver={() => this.props.turnOver(`${y}-${x}`)}
          key={`${y}-${x}`}
          pos={`${y}-${x}`}
          stone={col}
          isFlipable={
            !!this.props.flipableCells(y, x, player, board).length &&
            col === null
          }
        />
      ));

      // 行
      return (
        <tr className='Board-row' key={y}>
          {displayRow}
        </tr>
      );
    });

    return (
      <table className='Board-table'>
        <tbody>{displayBoard}</tbody>
      </table>
    );
  }
}

export default Board;
