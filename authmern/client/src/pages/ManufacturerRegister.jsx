import React, { useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const ManufacturerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let uniqueId = e.target.uniqueId.value;  // this is still being used on frontend
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let contactNumber = e.target.contactNumber.value;
    let address = "";  // Assuming address is optional for now, add an empty string or actual data
  
    if (uniqueId && name && email && password && confirmPassword && contactNumber) {
      if (password === confirmPassword) {
        const formData = { 
          uniqueId,  // Change `uniqueId` to `id` to match the backend field
          name,
          email,
          password,
          address,  // Include address, even if empty
          contactNumber 
        };
  
        try {
          await axios.post("http://localhost:5000/api/v1/register/manufacturer", formData);  // Ensure correct endpoint
          toast.success("Manufacturer registration successful");
          navigate("/manufacturer/login");
        } catch (err) {
          console.error("Error response:", err.response?.data || err.message);
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all fields");
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
            <h2>Register as a Manufacturer</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Manufacturer ID (e.g., DM12345678)" name="uniqueId" required />
              <input type="text" placeholder="Name" name="name" required />
              <input type="email" placeholder="Email" name="email" required />
              <input type="text" placeholder="Contact Number" name="contactNumber" required />
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
            Already registered? <Link to="/manulogin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerRegister;
