import React from 'react';
import './AttemptedList.css';

const AttemptedList = ({ attempts }) => {
  return (
    <div className="attempted-list">
      <h3>📋 My Attempted Quizzes</h3>
      {attempts.length === 0 ? (
        <p>No quizzes attempted yet.</p>
      ) : (
        <ul>
          {attempts.map((attempt, index) => (
            <li key={index}>
              <strong>{attempt.category}</strong> - {attempt.score}/{attempt.total} 
              <br />
              <small>{new Date(attempt.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttemptedList;
