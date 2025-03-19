import React from "react";

const Keyboard = ({ usedKeys, handleInput, handleDelete, handleSubmit }) => {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {"QWERTYUIOP".split("").map((letter) => (
          <button key={letter} className={`key ${usedKeys[letter]}`} onClick={() => handleInput(letter)}>
            {letter}
          </button>
        ))}
      </div>

      <div className="keyboard-row">
        {"ASDFGHJKL".split("").map((letter) => (
          <button key={letter} className={`key ${usedKeys[letter]}`} onClick={() => handleInput(letter)}>
            {letter}
          </button>
        ))}
      </div>

      <div className="keyboard-row">
        {"ZXCVBNM".split("").map((letter) => (
          <button key={letter} className={`key ${usedKeys[letter]}`} onClick={() => handleInput(letter)}>
            {letter}
          </button>
        ))}
      </div>

      <div className="keyboard-row">
        <button className="key delete" onClick={handleDelete}>⌫</button>
        <button className="key submit" onClick={handleSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default Keyboard;
