import React from 'react';
import calculateWinner from '../calculateWinner';
import Board from '../Board';
import { Link } from 'react-router-dom';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        player1: document.querySelector('#player1').value || 'X',
        player2:document.querySelector('#player2').value || 'O',
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const player1 = this.state.player1;
      const player2 = this.state.player2;
      console.log(player1, player2);

      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button className="moves" onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        if(winner === 'X') status = 'Winner ' + player1;
        else status = 'Winner ' + player2;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? player1 : player2);
      }
      if (history.length === 10 && !winner) status = 'Draw';
      return (
        <>
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
          <Link to='/'><div className="newGame-div">New Game</div></Link>
        </>
      );
    }
}