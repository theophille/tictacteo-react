import React, { Component } from "react";
import Board from "./gameBoard";
import HistoryButton from "./historyButton";

var turn = true;
var playable = true;
var count = 0;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false },
        { value: null, active: true, winner: false }
      ]
    };
  }

  history = [[Array(9).fill(null)]];

  pushReset = () => {
    const squares = [...this.state.squares];

    for (let i = 0; i < 9; i++) {
      squares[i].value = null;
      squares[i].active = true;
      squares[i].winner = false;
    }

    turn = true;
    playable = true;
    count = 0;

    this.history = this.history.slice(0, 1);

    this.setState({ squares });
  };

  pushTheButton = squareID => {
    if (this.state.squares[squareID].active === true && playable === true) {
      let x;
      count++;

      if (turn === true) x = "x";
      else x = "o";

      const squares = [...this.state.squares];
      squares[squareID].value = x;
      squares[squareID].active = false;

      var values = [];
      for (let i = 0; i < 9; i++) {
        values = values.concat(squares[i].value);
      }

      this.history[count] = values;

      this.setState({ squares });

      turn = !turn;

      checkForWinner(x, this.state, this);
    }
  };

  jumpTo = buttonID => {
    console.log(buttonID);
    const squares = [...this.state.squares];
    for (let i = 0; i < 9; i++) {
      squares[i].value = buttonID[i];
      if (squares[i].value !== "o" || squares[i].value !== "x")
        squares[i].active = true;
      squares[i].winner = false;
    }
    this.setState({ squares });
    this.history = this.history.slice(0, this.history.indexOf(buttonID) + 1);
    for (let i = 8; i >= 0; i--)
      if (buttonID[i] === "x") {
        turn = false;
        break;
      } else if (buttonID[i] === "o") {
        turn = true;
        break;
      }
    count = this.history.indexOf(buttonID);
    if (playable !== true) playable = true;
  };

  render() {
    const buttons = this.history.map(move => {
      return (
        <li>
          <HistoryButton
            id={move}
            jumpTo={this.jumpTo}
            getindex={this.getIndex}
          />
        </li>
      );
    });

    return (
      <React.Fragment>
        <div>
          <h1 id="title">
            This is a <br />
            TicTacTeo Game{" "}
          </h1>
          <Board
            value={null}
            onPress={this.pushTheButton}
            squares={this.state.squares}
            playable={playable}
            count={count}
          />
        </div>
        <div className="score">
          <h1 id="header1"> Activity </h1>
          <div className="dashboard_content">
            <h1 className="whosturn"> {display()} </h1>
            <button className="reset" onClick={this.pushReset}>
              {" "}
              Reset{" "}
            </button>
          </div>
        </div>
        <div className="score">
          <h1 id="header1"> History </h1>
          <div>{<ul className="list"> {buttons} </ul>}</div>
        </div>
      </React.Fragment>
    );
  }
}

// ------------ checkForWinner ------------ //

function checkForWinner(x, state, him) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      state.squares[a].value &&
      state.squares[a].value === state.squares[b].value &&
      state.squares[a].value === state.squares[c].value
    ) {
      console.log(x);
      playable = false;

      const stateCopy = [...state.squares];
      stateCopy[a].winner = true;
      stateCopy[b].winner = true;
      stateCopy[c].winner = true;

      him.setState({ squares: stateCopy });

      if (count === 9) count--;

      console.log(state);
    }
  }
}

function display() {
  let player = turn ? "X" : "O";
  let winner = turn ? "O" : "X";
  if (count < 9)
    if (playable) return "IT'S " + player + "'s TURN";
    else return winner + " IS THE WINNER";
  else return "Equality";
}

export default Game;
