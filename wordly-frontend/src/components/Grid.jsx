import React from "react";

const Grid = ({ grid, feedback }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((letter, colIndex) => (
            <div
              key={colIndex}
              className={`grid-cell ${
                feedback[rowIndex]?.[colIndex] === "correct" ? "correct" :
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
  );
};

export default Grid;
