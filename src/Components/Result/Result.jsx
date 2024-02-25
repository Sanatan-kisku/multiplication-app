// Result.jsx
import React, { useState } from 'react';
import "./Result.css";

const Result = ({ correctCount, wrongCount, correctAnswers, wrongAnswers, onRetry }) => {
  const [isCorrectListOpen, setIsCorrectListOpen] = useState(false);
  const [isWrongListOpen, setIsWrongListOpen] = useState(false);

  const toggleCorrectList = () => {
    setIsCorrectListOpen(!isCorrectListOpen);
  };

  const toggleWrongList = () => {
    setIsWrongListOpen(!isWrongListOpen);
  };

  return (
    <div className="result-section">
      <h3>Results</h3>
      <p>Correct Answers: {correctCount}</p>
      <p>Wrong Answers: {wrongCount}</p>

      <div>
        <button onClick={toggleCorrectList}>
          {isCorrectListOpen ? 'Hide Correct Answers' : 'Show Correct Answers'}
        </button>
        {isCorrectListOpen && (
          <div>
            <p>Correct Answers:</p>
            <ul>
              {correctAnswers.map(({ multiplicand, multiplier, correctAnswer }, index) => (
                <li key={index}>
                  {multiplicand} * {multiplier} = {correctAnswer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <button onClick={toggleWrongList}>
          {isWrongListOpen ? 'Hide Wrong Answers' : 'Show Wrong Answers'}
        </button>
        {isWrongListOpen && (
          <div>
            <p>Incorrect Answers:</p>
            <ul>
              {wrongAnswers.map(({ multiplicand, multiplier, userAnswer }, index) => (
                <li key={index}>
                  {multiplicand} * {multiplier} = {multiplicand * multiplier} (Your Answer: {userAnswer})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default Result;
