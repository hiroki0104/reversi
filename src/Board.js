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
    this.canFlipe = this.canFlipe.bind(this);
    this.countStone = this.countStone.bind(this);
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

    let player = this.state.isplayerBlack ? '黒' : '白';
    let oldBoard = this.state.board.slice();

    let flipeCells = this.flipableCells(intY, intX, player);
    if (flipeCells.length === 0) return;

    function newBoard(yPos, xPos, flipeCells) {
      oldBoard[yPos][xPos] = player;
      flipeCells.forEach((val) => {
        const y = val[0];
        const x = val[1];
        oldBoard[y][x] = player;
      });
      return oldBoard;
    }

    this.setState(
      {
        board: newBoard(intY, intX, flipeCells),
        isplayerBlack: !this.state.isplayerBlack,
      },
      () => {
        const currentPlayer = this.state.isplayerBlack ? '黒' : '白';
        if (!this.canFlipe(currentPlayer)) return this.togglePlayer();
      }
    );
  }

  flipableCells(yPos, xPos, player) {
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

  canFlipe(player) {
    for (let y = 0; y < 8; ++y) {
      for (let x = 0; x < 8; ++x) {
        if (
          this.flipableCells(y, x, player).length &&
          this.state.board[y][x] === null
        ) {
          return true;
        }
      }
    }

    return false;
  }

  togglePlayer() {
    this.setState({
      isplayerBlack: !this.state.isplayerBlack,
    });
  }

  countStone() {
    let lookUp = {
      黒: 0,
      白: 0,
    };

    this.state.board.forEach((row) => {
      row.forEach((col) => {
        if (col) {
          lookUp[col]++;
        }
      });
    });

    return lookUp;
  }

  render() {
    const currentPlayer = this.state.isplayerBlack ? '黒' : '白';
    const nextPlayer = !this.state.isplayerBlack ? '黒' : '白';
    let lookUp = this.countStone();
    const blackStoneCounts = lookUp['黒'];
    const whiteStoneCounts = lookUp['白'];

    let result, Winner;
    if (!this.canFlipe(currentPlayer) && !this.canFlipe(nextPlayer)) {
      if (blackStoneCounts !== whiteStoneCounts) {
        Winner = blackStoneCounts > whiteStoneCounts ? '黒' : '白';
        result = <div>勝者は{Winner}です</div>;
      } else {
        result = <div>試合は引き分けです！素晴らしい戦いでした</div>;
      }
    } else {
      result = (
        <React.Fragment>
          <div className='current-hand'>
            <span>{currentPlayer}の番</span>
          </div>
        </React.Fragment>
      );
    }

    const board = this.state.board.map((row, y) => {
      let displayRow = row.map((col, x) => (
        <Cell
          turnOver={this.turnOver}
          key={`${y}-${x}`}
          pos={`${y}-${x}`}
          stone={col}
          isFlipable={
            !!this.flipableCells(y, x, currentPlayer).length && col === null
          }
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
        <div className='Board-score'>
          <div
            className={
              this.state.isplayerBlack ? 'score black current' : 'score black'
            }>
            黒 : {blackStoneCounts}枚
          </div>
          <div
            className={
              !this.state.isplayerBlack ? 'score white current' : 'score white'
            }>
            白 : {whiteStoneCounts}枚
          </div>
        </div>
        <table className='Board-table'>
          <tbody>{board}</tbody>
        </table>

        <div className='Board-progress'>
          <div className="game-over">試合は引き分けです！素晴らしい戦いでした</div>
        </div>
      </div>
    );
  }
}

export default Board;
