import React, { Component } from 'react';
import Square from './square.js';

class Row extends Component {
  render() {
    const { makeMove, row } = this.props;
    let output = Object.keys(row).map(function(i) {
      return (<Square key={i} val={row[i]} colIndex={i} makeMove={makeMove}/>)
    });
    return (<tr>{output}</tr>)
  };
}
export default Row; 
