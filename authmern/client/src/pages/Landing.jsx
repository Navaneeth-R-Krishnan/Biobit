import React from 'react';
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-main">
      <div className="landing-content">
        <h1>Welcome to BioBit!</h1>
        <p>Your gateway to secure and seamless authentication.</p>
        <div className="landing-cards">
          {/* Manufacturer Card */}
          <div className="landing-card">
            <h3>Manufacturer</h3>
            <p>Login or Register as a Manufacturer to manage your products.</p>
            <Link to="/manuregister" className="landing-button">Register</Link>
            <Link to="/manulogin" className="landing-button">Login</Link>
            
          </div>

          {/* User Card */}
          <div className="landing-card">
            <h3>User</h3>
            <p>Login or Register to authenticate medicines as a User.</p>
            <Link to="/register" className="landing-button">Register</Link>
            <Link to="/login" className="landing-button">Login</Link>
            
          </div>

          {/* Regulatory Authority Card */}
          <div className="landing-card">
            <h3>Regulatory Authority</h3>
            <p>Login or Register as a Regulatory Authority to approve manufacturers</p>
            <Link to="/raregister" className="landing-button">Register</Link>
            <Link to="/ralogin" className="landing-button">Login</Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
