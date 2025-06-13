// src/components/QuestionCard.js

import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ question, handleAnswer, current, total, goBack }) => {
  return (
    <div className="question-container">
      <h3>Question {current + 1} of {total}</h3>
      <p className="question-text">{question.question}</p>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => handleAnswer(option === question.answer)}
          >
            {option}
          </button>
        ))}
      </div>
      <button className="back-button" onClick={goBack}>← Back</button>
    </div>
  );
};

export default QuestionCard;
