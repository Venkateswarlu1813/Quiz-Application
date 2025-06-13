import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './ResultScreen.css'; // Optional CSS for styling

function ResultScreen({ score, total, restartQuiz, userAnswers }) {
  return (
    <div className="result-screen">
      <h2>Quiz Result</h2>
      <p>Your Score: {score} / {total}</p>

      <h3>Answer Review:</h3>
      <div className="review-container">
        {userAnswers.map((ans, index) => (
          <div key={index} className={`review-question ${ans.isCorrect ? 'correct' : 'incorrect'}`}>
            <h4>{index + 1}. {ans.question}</h4>

            <ul className="options-list">
              {ans.options.map((opt, i) => {
                const isSelected = opt === ans.selectedAnswer;
                const isCorrect = opt === ans.correctAnswer;

                return (
                  <li
                    key={i}
                    className={
                      isCorrect ? 'correct-answer' :
                      isSelected ? 'selected-answer' : ''
                    }
                  >
                    {opt}
                    {isCorrect && <FaCheckCircle color="green" style={{ marginLeft: '8px' }} />}
                    {isSelected && !isCorrect && <FaTimesCircle color="red" style={{ marginLeft: '8px' }} />}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <button className="restart-btn" onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
}

export default ResultScreen;
