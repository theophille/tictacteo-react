import React, { Component } from "react";

class HistoryButton extends Component {
  render() {
    return (
      <button
        className="reset"
        onClick={() => this.props.jumpTo(this.props.id)}
        index={() => this.props.index(this.props.id)}
      >
        Move
      </button>
    );
  }
}

export default HistoryButton;
