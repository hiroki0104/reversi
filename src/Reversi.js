import React, { Component } from 'react';
import Board from './Board';
import './Reversi.css';
import './Btn.css';

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

    // this.redo = this.redo.bind(this);
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

  turnOver(idx) {
    const history = this.state.history.slice();
    const current = history[history.length - 1];
    let currentBoard = current.board.slice();

    let [yPos, xPos] = idx.split('-');
    const intY = parseInt(yPos);
    const intX = parseInt(xPos);
    if (currentBoard[intY][intX]) return;

    // ひっくり返せる石があるかどうか
    let player = this.state.isplayerBlack ? '黒' : '白';
    let flipeCells = this.flipableCells(intY, intX, player, currentBoard);
    if (flipeCells.length === 0) return;

    // ひっくり返す処理後の盤面を作成する
    function newBoard(yPos, xPos, flipeCells, currentBoard) {
      let newBoard = currentBoard.slice();
      newBoard[yPos][xPos] = player;
      flipeCells.forEach((val) => {
        const y = val[0];
        const x = val[1];
        newBoard[y][x] = player;
      });
      return newBoard;
    }

    let newBoards = newBoard(yPos, xPos, flipeCells, currentBoard);
    this.setState(
      (st) => ({
        history: [...st.history, { board: newBoards }],
        isplayerBlack: !st.isplayerBlack,
      }),
      () => {
        const currentPlayer = this.state.isplayerBlack ? '黒' : '白';
        const history = this.state.history;
        const current = history[history.length - 1];
        if (!this.canFlipe(currentPlayer, current.board))
          return this.togglePlayer();
      }
    );
  }

  // ひっくり返せる石の座標を配列で返す
  flipableCells(yPos, xPos, player, currentBoard) {
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

    // 各方向に対してひっくり返せる石の座標を生成する
    function directionflipeCells(yPos, xPos, y, x) {
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

    let newArr = [];
    direction.forEach((val) => {
      newArr = newArr.concat(directionflipeCells(yPos, xPos, val[0], val[1]));
    });

    return newArr;
  }

  // そのプレイヤーが石を置けるマスがあるかどうか
  canFlipe(player, currentBoard) {
    for (let y = 0; y < 8; ++y) {
      for (let x = 0; x < 8; ++x) {
        if (
          this.flipableCells(y, x, player, currentBoard).length &&
          currentBoard[y][x] === null
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

  countStone(board) {
    // 初期値
    let lookUp = {
      黒: 0,
      白: 0,
    };

    board.forEach((row) => {
      row.forEach((col) => {
        if (col) {
          lookUp[col]++;
        }
      });
    });

    return lookUp;
  }

  // うまくいかない
  // redo() {
  //   const redohistory = this.state.history.slice(
  //     0,
  //     this.state.history.length - 1
  //   );
  //   this.setState({
  //     history: redohistory,
  //     isplayerBlack: !this.state.isplayerBlack,
  //   });
  // }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    console.log(history);

    const currentPlayer = this.state.isplayerBlack ? '黒' : '白';
    const nextPlayer = !this.state.isplayerBlack ? '黒' : '白';

    let lookUp = this.countStone(current.board);
    const blackStoneCounts = lookUp['黒'];
    const whiteStoneCounts = lookUp['白'];

    // 進行状況の把握
    let result, Winner;
    if (
      !this.canFlipe(currentPlayer, current.board) &&
      !this.canFlipe(nextPlayer, current.board)
    ) {
      if (blackStoneCounts !== whiteStoneCounts) {
        Winner = blackStoneCounts > whiteStoneCounts ? '黒' : '白';
        result = <div className='game-over'>勝者は{Winner}です</div>;
      } else {
        result = (
          <div className='game-over'>
            試合は引き分けです！素晴らしい戦いでした
          </div>
        );
      }
    } else {
      result = (
        <div className='current-hand'>
          <span>{currentPlayer}の番</span>
        </div>
      );
    }

    return (
      <div className='Reversi'>
        <div className='Board-result'>{result}</div>
        <div className='Board-progress'>
          <div
            className={
              this.state.isplayerBlack ? 'score black current' : 'score black'
            }>
            黒 : {blackStoneCounts}枚
          </div>
          <div className='Board-prev'>
            {/* redo button */}
            {/* <button className='btn btn-icon' onClick={this.redo}>
              <i className='fas fa-redo-alt'></i>
              一手戻る
            </button> */}
          </div>
          <div
            className={
              !this.state.isplayerBlack ? 'score white current' : 'score white'
            }>
            白 : {whiteStoneCounts}枚
          </div>
        </div>
        <Board
          board={current.board}
          turnOver={(id) => this.turnOver(id)}
          flipableCells={this.flipableCells}
          player={currentPlayer}
        />
      </div>
    );
  }
}

export default Reversi;
