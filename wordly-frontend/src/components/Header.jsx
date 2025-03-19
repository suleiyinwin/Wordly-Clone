import React from "react";

const Header = ({ score, resetGame, openRules }) => {
  return (
    <div className="header">
      <div className="score">⭐ {score}</div>
      <div className="title">Wordly Clone</div>
      <button className="new-game-button" onClick={resetGame}>🔄 New Game</button>
      <div className="rules-icon" onClick={openRules}>❓</div>
    </div>
  );
};

export default Header;
