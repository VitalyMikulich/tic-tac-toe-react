import React from 'react';
import { Link } from 'react-router-dom';

export default function PlayersForm() {
  return <>
    <h1>Tic Tac Toe</h1>
    <form>
      <label htmlFor="player1">Player 1</label>
      <input type="text" id="player1"/>
      <label htmlFor="player2">Player 2</label>
      <input type="text" id="player2"/>
    </form>
    <Link to='/Game'><div className="play">Game</div></Link>
  </>
}