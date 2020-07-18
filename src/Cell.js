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
    return (
      <td
        onClick={this.handleClick}
        className={this.props.isFlipable ? 'Cell Cell-highlight' : 'Cell'}>
        {this.props.stone}
      </td>
    );
  }
}

export default Cell;
