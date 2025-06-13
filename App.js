import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomeScreen from './components/WelcomeScreen';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import NavBar from './components/NavBar';
import CategorySelection from './components/CategorySelection';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import QuizInfoScreen from './components/QuizInfoScreen';
import Leaderboard from './components/Leaderboard';

import './style.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quizUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showSignUp, setShowSignUp] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || null;
  });

  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Load questions when category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`/questions/${selectedCategory}.json`)
        .then((res) => {
          if (!res.ok) throw new Error('Question file not found');
          return res.json();
        })
        .then((data) => {
          setQuestions(data);
          setQuizStarted(false);
          setCurrentQuestionIndex(0);
          setScore(0);
          setShowResult(false);
          setUserAnswers([]);
        })
        .catch((err) => console.error('Failed to load questions:', err));
    }
  }, [selectedCategory]);

  // Save score to leaderboard
  useEffect(() => {
    if (showResult && questions.length > 0) {
      const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      const newEntry = {
        username: user?.email || 'Anonymous',
        score,
        total: questions.length,
        category: selectedCategory,
        date: new Date().toLocaleDateString(),
      };
      leaderboard.push(newEntry);
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
  }, [showResult, questions.length, score, selectedCategory, user]);

  const handleLogin = (userData) => {
    localStorage.setItem('quizUser', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('quizUser');
    localStorage.removeItem('selectedCategory');
    setUser(null);
    setSelectedCategory(null);
    setShowResult(false);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleCategorySelect = (category) => {
    localStorage.setItem('selectedCategory', category);
    setSelectedCategory(category);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    const currentQ = questions[currentQuestionIndex];
    const answerObj = {
      question: currentQ.question,
      options: currentQ.options,
      correctAnswer: currentQ.answer,
      selectedAnswer: selectedOption,
      isCorrect,
    };
    setUserAnswers((prev) => [...prev, answerObj]);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    localStorage.removeItem('selectedCategory');
    setSelectedCategory(null);
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const mainQuizContent = !selectedCategory ? (
    <CategorySelection
      onSelectCategory={handleCategorySelect}
      onBack={handleLogout}
    />
  ) : !quizStarted ? (
    <QuizInfoScreen
      totalQuestions={questions.length}
      marksPerQuestion={1}
      startQuiz={startQuiz}
      goBack={() => {
        localStorage.removeItem('selectedCategory');
        setSelectedCategory(null);
      }}
    />
  ) : showResult ? (
    <ResultScreen
      score={score}
      total={questions.length}
      restartQuiz={restartQuiz}
      userAnswers={userAnswers}
    />
  ) : questions.length > 0 ? (
    <QuestionCard
      question={questions[currentQuestionIndex]}
      handleAnswer={handleAnswer}
      current={currentQuestionIndex}
      total={questions.length}
      goBack={() => setQuizStarted(false)}
    />
  ) : (
    <p>Loading questions...</p>
  );

  if (showWelcome) {
    return <WelcomeScreen onContinue={() => setShowWelcome(false)} />;
  }

  if (!user) {
    return showSignUp ? (
      <SignUpForm switchToLogin={() => setShowSignUp(false)} />
    ) : (
      <LoginForm onLogin={handleLogin} switchToSignUp={() => setShowSignUp(true)} />
    );
  }

  return (
    <Router>
      <div className="app-container">
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={mainQuizContent} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
