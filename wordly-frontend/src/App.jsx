import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./App.css";

const ROWS = 6;
const COLUMNS = 5;

Modal.setAppElement("#root");

const App = () => {
  const [grid, setGrid] = useState(Array(ROWS).fill("").map(() => Array(COLUMNS).fill("")));
  const [currentRow, setCurrentRow] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [usedKeys, setUsedKeys] = useState({});
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();

      if (gameOver) return; // Don't allow typing if game is over

      if (/^[A-Z]$/.test(key) && guess.length < COLUMNS) {
        handleInput(key);
      } else if (event.key === "Backspace") {
        handleDelete();
      } else if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guess, gameOver]);

  const resetGame = async () => {
    try {
      const response = await axios.get("http://localhost:5001/new-word"); // Fetch a new word from backend
      if (response.status === 200) {
        setGrid(Array(ROWS).fill("").map(() => Array(COLUMNS).fill("")));
        setCurrentRow(0);
        setGuess("");
        setFeedback([]);
        setUsedKeys({});
        setMessage("");
        setGameOver(false);
      }
    } catch (error) {
      setMessage("Error starting new game");
    }
  };

  const handleInput = (letter) => {
    if (!gameOver && guess.length < COLUMNS) {
      setGuess(guess + letter);
      let newGrid = [...grid];
      newGrid[currentRow][guess.length] = letter;
      setGrid(newGrid);
    }
  };

  const handleDelete = () => {
    if (!gameOver && guess.length > 0) {
      setGuess(guess.slice(0, -1));
      let newGrid = [...grid];
      newGrid[currentRow][guess.length - 1] = "";
      setGrid(newGrid);
    }
  };

  const handleSubmit = async () => {
    if (gameOver || guess.length !== COLUMNS) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/guess", { word: guess });

      if (response.data.error) {
        setMessage(response.data.error);
        let newGrid = [...grid];
        newGrid[currentRow] = Array(COLUMNS).fill("");
        setGrid(newGrid);
        setGuess("");
        return;
      }

      const newFeedback = response.data.result;
      let newUsedKeys = { ...usedKeys };

      let newGrid = [...grid];
      newGrid[currentRow] = [...guess.split("")];
      setGrid(newGrid);

      guess.split("").forEach((letter, index) => {
        newUsedKeys[letter] = newFeedback[index];
      });

      setUsedKeys(newUsedKeys);
      setFeedback([...feedback, newFeedback]);

      if (response.data.win) {
        setMessage("🎉 You won!");
        setScore(score + 10); // ✅ Increase score only if won
        setGameOver(true);
      } else if (currentRow >= ROWS - 1) {
        setMessage("Game Over! Try again.");
        setGameOver(true);
      } else {
        setCurrentRow(currentRow + 1);
        setGuess("");
      }

    } catch (error) {
      setMessage(error.response?.data?.error || "Server issue");
      let newGrid = [...grid];
      newGrid[currentRow] = Array(COLUMNS).fill("");
      setGrid(newGrid);
      setGuess("");
    }
  };

  return (
    <div className="game-wrapper">
      <div className="game-container">
        <div className="header">
          <div className="score">⭐ {score}</div>
          <div className="title">Wordly Clone</div>
          
          <div className="rules-icon" onClick={() => setIsRulesOpen(true)}>❓</div>
        </div>

        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((letter, colIndex) => (
                <div
                  key={colIndex}
                  className={`grid-cell ${feedback[rowIndex]?.[colIndex] === "correct" ? "correct" :
                      feedback[rowIndex]?.[colIndex] === "present" ? "present" :
                        feedback[rowIndex]?.[colIndex] === "absent" ? "absent" : ""
                    }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

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
          <div className="keyboard-row">
          <button className="new-game-button" onClick={resetGame}>
            🔄 New Game
          </button>
        </div>
        </div>

        <p className="message">{message}</p>
      </div>

      <Modal
        isOpen={isRulesOpen}
        onRequestClose={() => setIsRulesOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Game Rules</h2>
        <p>🔹 Guess the **5-letter word** within **6 attempts**.</p>
        <p>🔹 Each guess must be a valid word.</p>
        <p>🔹 The game will provide color feedback:</p>
        <ul>
          <li><span className="correct-box">🟩 Green</span> = Correct letter, correct position.</li>
          <li><span className="present-box">🟨 Yellow</span> = Correct letter, wrong position.</li>
          <li><span className="absent-box">🟥 Red</span> = Letter not in the word.</li>
        </ul>
        <button onClick={() => setIsRulesOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
