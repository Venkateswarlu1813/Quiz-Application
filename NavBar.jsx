import React from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './NavBar.css';

const NavBar = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('quiz_user');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1>Quiz App</h1>
      <div className="user-info">
        <FaUserCircle size={20} /> {user.email}
        <button onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
