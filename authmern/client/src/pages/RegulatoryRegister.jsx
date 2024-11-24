import React, { useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RegulatoryRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      uniqueId: e.target.uniqueId.value,
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      department: e.target.department.value,
      contactInfo: e.target.contactInfo.value,
    };
  
    if (Object.values(formData).some((field) => !field)) {
      toast.error("Please fill all fields");
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/v1/register/regulatory", formData);
      toast.success(response.data.message);
      navigate("/radashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Register as Regulatory Authority</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Regulatory ID (e.g., RA1234567)" name="uniqueId" required />
              <input type="text" placeholder="Name" name="name" required />
              <input type="email" placeholder="Email" name="email" required />
              <input type="text" placeholder="Department" name="department" required />
              <input type="text" placeholder="Contact Information" name="contactInfo" required />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
          <p className="login-bottom-p">
            Already registered? <Link to="/ralogin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryRegister;
