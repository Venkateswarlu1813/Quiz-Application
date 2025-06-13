import React from 'react';
import FeedbackForm from './FeedbackForm';

const ResultScreen = ({ score, total, restartQuiz }) => {
  return (
    <div className="result-container">
      <h2>Quiz Completed! 🎉</h2>
      <p>Your Score: <strong>{score}</strong> out of <strong>{total}</strong></p>
      <button onClick={restartQuiz} className="retry-button">Retry Quiz</button>

      <FeedbackForm />
    </div>
  );
};

export default ResultScreen;
