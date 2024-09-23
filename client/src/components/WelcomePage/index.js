import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import the associated CSS file for styling

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>Welcome to Pet Haven Hotel</h1>
        <Link to="/home" className="learn-more-button">LEARN MORE</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
