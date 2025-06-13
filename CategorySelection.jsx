// CategorySelection.js
import React from 'react';
import './CategorySelection.css';

const categories = [
  { label: 'Science', value: 'science' },
  { label: 'General Knowledge', value: 'gk' },
  { label: 'Computers', value: 'computers' },
  { label: 'Politics', value: 'politics' },
  { label: 'History', value: 'history' }
];

const CategorySelection = ({ onSelectCategory, onBack }) => {
  return (
    <div className="category-container">
      <h2>Select a Quiz Category</h2>
      <div className="category-grid">
        {categories.map(({ label, value }) => (
          <div
            key={value}
            className="category-card"
            onClick={() => onSelectCategory(value)}
          >
            {label}
          </div>
        ))}
      </div>
      <button className="back-button" onClick={onBack}>
        ⬅ Back
      </button>
    </div>
  );
};

export default CategorySelection;
