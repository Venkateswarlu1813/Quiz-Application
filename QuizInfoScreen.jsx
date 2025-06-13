import React from 'react';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';

const QuizInfoScreen = ({ totalQuestions, marksPerQuestion, startQuiz, goBack }) => {
  return (
    <div className="quiz-info">
      <h2>Quiz Information</h2>
      <p>Total Questions: {totalQuestions}</p>
      <p>Marks per Question: {marksPerQuestion}</p>
      <div className="quiz-buttons">
        <button onClick={startQuiz}><FaPlay /> Start Quiz</button>
        <button onClick={goBack}><FaArrowLeft /> Back</button>
      </div>
    </div>
  );
};

export default QuizInfoScreen;
