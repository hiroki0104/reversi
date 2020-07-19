import React, { Component } from 'react';
import Board from './Board';

class Reversi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          board: this.initialBoard(),
        },
      ],
      isplayerBlack: true,
    };
  }

  // 初期の8x8の盤面の生成
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

  render() {
    return (
      <div className='Reversi'>
        <Board />
      </div>
    );
  }
}

export default Reversi;
