import React, { Component } from "react";

class Square extends Component {
  render() {
    const { makeMove, colIndex, val } = this.props;

    let status = "empty";

    if (val === 1) {
      status = "player1";
    }

    if (val === 2) {
      status = "player2";
    }

    return (
      <td>
        <div className="square" onClick={() => makeMove(colIndex)}>
          <div className={[status, "circle"].join(" ")}></div>
        </div>
      </td>
    );
  }
}

export default Square;
