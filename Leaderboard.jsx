import React, { useEffect, useState } from 'react';
import { FaTrophy, FaUser } from 'react-icons/fa';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(data);
  }, []);

  return (
    <div className="leaderboard">
      <h2><FaTrophy /> Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <FaUser /> {entry.username} - {entry.score}/{entry.total} ({entry.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
