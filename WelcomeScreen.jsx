import React from 'react';
import { FaRocket } from 'react-icons/fa';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onContinue }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <FaRocket className="welcome-icon" />
        <h1>Welcome to the Quiz App!</h1>
        <p>Test your knowledge across various topics. Ready to begin?</p>
        <button className="continue-btn" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
