import React, { Component } from 'react';
import Row from './row.js';

const ROWS = 6;
const COLUMNS = 7;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      restartGame: false
    };
    this.makeMove = this.makeMove.bind(this)
  }

  initialBoard() {
    let board = [];
    for (let i = 0; i < ROWS; i++) {
      let row = [];
      for (let j = 0; j < COLUMNS; j++) { row.push(null) }
      board.push(row);
    }
    
    this.setState({
      board,
      currentPlayer: this.state.player1,
      restartGame: false
    });
  }
  
  makeMove(j) {
    if (!this.state.restartGame) {
      let board = this.state.board;
      for (let i = 5; i >= 0; i--) {
        if (!board[i][j]) {
          board[i][j] = this.state.currentPlayer;
          break;
        }
      }
      //check for wins or board draw/error

      let curr = this.checkForWin(board);
      if (curr === this.state.player1 || curr === this.state.player2){
        this.setState({board, restartGame: true});
        let player = this.state.currentPlayer;
        alert("Player " + player + " wins!")
      } 
      if(curr === "draw"){
        this.setState({ board, restartGame: true });
        alert("It's a draw!")
      }
      else{
        this.setState({board, currentPlayer: this.switchPlayer()});
      }
      }
      else{
        alert("Game Over! Restart the game to continue playing..")
      }
    }

  switchPlayer() {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }

  checkVertical(board) {
    for (let i = 3; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j] &&
              board[i][j] === board[i - 2][j] &&
              board[i][j] === board[i - 3][j]) {
            return board[i][j];    
          }
        }
      }
    }
  }
  
  checkHorizontal(board) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i][j+1] &&
              board[i][j] === board[i][j+2] &&
              board[i][j] === board[i][j+3]) {
            return board[i][j];    
          }
        }
      }
    }
  }
  
  checkDiagLeft(board) {
    for (let i = 3; i < ROWS; i++) {
      for (let j = 3; j < COLUMNS; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i-1][j-1] &&
              board[i][j] === board[i-2][j-2] &&
              board[i][j] === board[i-3][j-3]) {
            return board[i][j];    
          }
        }
      }
    }
  }
  
  checkDiagRight(board) {
    for (let i = 3; i < ROWS; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i-1][j+1] &&
              board[i][j] === board[i-2][j+2] &&
              board[i][j] === board[i-3][j+3]) {
            return board[i][j];    
          }
        }
      }
    }
  }

  checkDraw(board) {
     for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        if (board[i][j] !== this.state.player1 || board[i][j] !== this.state.player2) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  checkForWin(board) {
    return this.checkVertical(board) || this.checkDiagRight(board) || this.checkDiagLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
  }
  
  componentWillMount() {
    this.initialBoard();
  }
  
  render() {
    return (
      <div>
        <div className="playerstatus">Next Player is: Player {this.state.currentPlayer}!</div>
        <table>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} makeMove={this.makeMove} row={row} />))}
          </tbody>
        </table> 
        <div className="space"> </div>
        <div className="button" onClick={() => {this.initialBoard()}}>Restart Game</div>
      </div>
    );
  }
}

export default Board;