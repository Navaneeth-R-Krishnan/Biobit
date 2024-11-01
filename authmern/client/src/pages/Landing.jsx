import React from 'react';
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-main">
      <div className="landing-content">
        <h1>Welcome to BioBit!</h1>
        <p>Your gateway to secure and seamless authentication.</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button">Login</Link>
          <Link to="/register" className="landing-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
