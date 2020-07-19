import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.turnOver(this.props.pos);
  }

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
        onClick={this.handleClick}
        className={isFlipable ? 'Cell Cell-highlight' : 'Cell'}>
        {cell}
      </td>
    );
  }
}

export default Cell;
