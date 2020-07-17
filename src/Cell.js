import React, { Component } from 'react';
import './Cell.css'

class Cell extends Component {
  render() {
    return <td className="Cell">{this.props.stone}</td>;
  }
}

export default Cell;
