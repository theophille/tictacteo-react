import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        id={i}
        value={this.props.squares[i].value}
        onPush={this.props.onPress}
        checkForWinner={this.props.squares[i].winner}
        playable={this.props.playable}
        count={this.props.count}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
