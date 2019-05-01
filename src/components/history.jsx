import React, { Component } from "react";
import HistoryButton from "./historyButton";

var count = -1;

class History extends Component {
  render() {
    return (
      <React.Fragment>
        <ol> {buttons} </ol>
      </React.Fragment>
    );
  }
}

export default History;
