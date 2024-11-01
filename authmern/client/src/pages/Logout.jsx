import React, { useEffect, useState } from 'react';
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Remove auth from localStorage
        localStorage.removeItem("auth");

        // Set up countdown interval
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // Redirect when countdown reaches 0
        if (countdown === 0) {
            clearInterval(interval); // Clear interval
            navigate("/");
        }

        // Clean up interval on component unmount or countdown change
        return () => clearInterval(interval);
    }, [countdown, navigate]);

    return (
        <div className='logout-main'>
            <h1>Logout Successful!</h1>
            <p>You will be redirected to the landing page in {countdown} seconds...</p>
        </div>
    );
}

export default Logout;
