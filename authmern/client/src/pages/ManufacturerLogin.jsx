import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ManufacturerLogin.css';

const ManufacturerLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { ...formData, role: 'manufacturer' });
      alert('Manufacturer logged in successfully');
      // Save token to localStorage or context for future requests
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>MANUFACTURER LOGIN</h1>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default ManufacturerLogin;
