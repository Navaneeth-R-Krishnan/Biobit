import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const RegulatoryLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || "");
  const navigate = useNavigate(); // Initialize navigate

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { ...formData, role: 'regulatory' });
      localStorage.setItem('token', JSON.stringify(response.data.token)); // Save token to localStorage
      alert('Regulatory authority logged in successfully');
      navigate('/radashboard'); // Redirect to Regulatory Dashboard on successful login
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (token !== "") {
      alert("You are already logged in");
      navigate('/radashboard'); // If the user has a token, redirect to dashboard
    }
  }, [token, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>REGULATORY AUTHORITY LOGIN</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default RegulatoryLogin;
