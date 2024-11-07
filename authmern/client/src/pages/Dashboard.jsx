import React, { useEffect, useState } from 'react'
import "../styles/Dashboard.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [ data, setData ] = useState({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get("http://localhost:5000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg});
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchUserData();
    if(token === ""){
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setToken("");
    navigate('/');
    toast.success("Logged out successfully");
  };

  const handleQrScan = () => {
    navigate("/qrscanner");
  };

  return (
    <div className='dashboard-main'>
      <h1>Welcome to BioBit, CUSTOMER!</h1>
      <h2>Please Scan QR by clicking the button below to verify authencity of your medicine!</h2>
      
      <div className="dashboard-buttons">
        <button onClick={handleQrScan} className="scan-button">QR Scanner</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  )
}

export default Dashboard