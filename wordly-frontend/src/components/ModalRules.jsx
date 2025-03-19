import React from "react";
import Modal from "react-modal";

const ModalRules = ({ isOpen, closeRules }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeRules} className="modal" overlayClassName="overlay">
      <h2>Game Rules</h2>
      <p>🔹 Guess the **5-letter word** within **6 attempts**.</p>
      <p>🔹 Each guess must be a valid word.</p>
      <p>🔹 The game will provide color feedback:</p>
      <ul>
        <li><span className="correct-box">🟩 Green</span> = Correct letter, correct position.</li>
        <li><span className="present-box">🟨 Yellow</span> = Correct letter, wrong position.</li>
        <li><span className="absent-box">🟥 Red</span> = Letter not in the word.</li>
      </ul>
      <button onClick={closeRules}>Close</button>
    </Modal>
  );
};

export default ModalRules;
