import React, { Component } from "react";

class Square extends Component {
  winnerCSS = () => {
    if (this.props.count < 9) {
      if (this.props.playable === true) return "button";
      else {
        if (this.props.checkForWinner === true) return "winnerbutton";
        else return "loserbutton";
      }
    } else return "loserbutton";
  };

  render() {
    return (
      <button
        className={this.winnerCSS()}
        onClick={() => this.props.onPush(this.props.id)}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
