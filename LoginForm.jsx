import React, { useState } from 'react';
import './AuthForm.css';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginForm = ({ onLogin, switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email };
    localStorage.setItem('quiz_user', JSON.stringify(userData));
    onLogin(userData);
  };

  return (
    <div className="auth-form-container">
      <h2><FaSignInAlt /> Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-fields">
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit"><FaSignInAlt /> Login</button>
      </form>
      <p>Don't have an account? <span onClick={switchToSignUp}>Sign Up</span></p>
    </div>
  );
};

export default LoginForm;
