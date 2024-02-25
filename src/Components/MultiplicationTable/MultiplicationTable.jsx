// MultiplicationTable.jsx
import React, { useState, useEffect, useRef } from 'react';
import Result from '../Result/Result';
import "./MultiplicationTable.css";

function MultiplicationTable() {
  const initialMultiplicand = 2;
  const [multiplicand, setMultiplicand] = useState(initialMultiplicand);
  const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Ref to store a reference to the first input element
  const firstInputRef = useRef(null);

  useEffect(() => {
    // Focus on the first input element when the component mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []); // Empty dependency array ensures it only runs once on mount

  const check = (e, multiplier, index) => {
    const nextIndex = index + 1;
    const nextInput = document.getElementById(`input-${nextIndex}`);

    if (nextInput && e.key === 'Enter') {
      e.preventDefault();
      nextInput.focus();
    }

    const userAnswer = e.target.value.trim();
    const correctAnswer = (multiplicand * multiplier).toString();

    // Check correctness only when the full answer is entered
    if (userAnswer.length === correctAnswer.length) {
      const isCorrect = userAnswer === correctAnswer;

      if (isCorrect) {
        e.target.classList.add("correct");
        e.target.classList.remove("wrong");
        setCorrectCount((prevCount) => prevCount + 1);
        setCorrectAnswers((prevCorrectAnswers) => [
          ...prevCorrectAnswers,
          { multiplicand, multiplier, correctAnswer },
        ]);
      } else {
        e.target.classList.add("wrong");
        e.target.classList.remove("correct");
        setWrongCount((prevCount) => prevCount + 1);
        setWrongAnswers((prevAnswers) => [
          ...prevAnswers,
          { multiplicand, multiplier, userAnswer },
        ]);
      }
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      const nextInput = document.getElementById(`input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const setMultiplicandHandler = () => {
    const newMultiplicand = parseInt(userInput, 10);
    if (!isNaN(newMultiplicand) && newMultiplicand > 0) {
      // Reset input values and styles
      const inputs = document.querySelectorAll('.input-container input');
      inputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'wrong');
      });

      setMultiplicand(newMultiplicand);
      setShowResults(false);
      setUserInput('');
    } else {
      alert('Please enter a valid positive number for the multiplicand.');
    }
  };


  const reset = () => {
    // Reset input values and styles
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });

    // Reset state values
    setMultiplicand(initialMultiplicand);
    setUserInput('');
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setShowResults(false);
  };

  const multiplierInputs = data.map((multiplier, index) => (
    <div key={multiplier} className="input-container">
      <label>
        {multiplicand} * {multiplier} <span>=</span>
        <input
          ref={index === 0 ? firstInputRef : null} // Set ref for the first input element
          id={`input-${index}`}
          type="number"
          onChange={(e) => check(e, multiplier, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      </label>
    </div>
  ));

  const next = (e) => {
    e.preventDefault();

    // Reset input values and styles
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });

    // Increment multiplicand and hide results
    setMultiplicand((prevMultiplicand) => prevMultiplicand + 1);
    setShowResults(false);
  };

  const endTest = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const retryTest = () => {
    setShowResults(false);
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
  };

  return (
    <div className='container'>
      <h1>Multiplication Table Test</h1>
      {!showResults && (
        <>
          <input
            type="number"
            className="multiplication-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter multiplicand"
          />
          <button className="multiplication-button" onClick={setMultiplicandHandler}>
            Set Multiplicand
          </button>
          <button className="multiplication-button" onClick={reset}>
            Reset
          </button>
        </>
      )}
      <hr />
      <h2>Multiplication Table of {multiplicand}</h2>
      {showResults ? (
        <Result
          correctCount={correctCount}
          wrongCount={wrongCount}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          onRetry={retryTest}
        />
      ) : (
        <form>
          <div className='multiplier'>
            {multiplierInputs}
          </div>
          <div className="button-container">
            <button style={{ backgroundColor: 'green', color: 'white' }} onClick={next}>Next Number</button>
            <button style={{ backgroundColor: 'red', color: 'white' }} onClick={endTest}>End Test</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default MultiplicationTable;
