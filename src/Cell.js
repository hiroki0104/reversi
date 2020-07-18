import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.turn_over(this.props.pos);
  }

  render() {
    return (
      <td onClick={this.handleClick} className='Cell'>
        {this.props.stone}
      </td>
    );
  }
}

export default Cell;
