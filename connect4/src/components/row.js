import React, { Component } from 'react';
import Square from './square.js';

class Row extends Component {
  render() {
    const { makeMove, row } = this.props;
    let output = Object.keys(row).map(function(i) {
      return (<Square key={i} makeMove={makeMove} colIndex={i} val={row[i]} />)
    });
    return (<tr>{output}</tr>)
  };
}
export default Row; 
