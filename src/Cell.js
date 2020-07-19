import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    const { isFlipable, stone } = this.props;

    // 石の表示
    let cell;
    if (stone === '黒') {
      cell = <span className='black-circle'></span>;
    } else if (stone === '白') {
      cell = <span className='white-circle'></span>;
    }

    return (
      <td
        onClick={this.props.turnOver}
        className={isFlipable ? 'Cell Cell-highlight' : 'Cell'}>
        {cell}
      </td>
    );
  }
}

export default Cell;
