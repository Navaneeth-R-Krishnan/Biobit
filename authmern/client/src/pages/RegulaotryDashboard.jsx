import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/RegulatoryDashboard.css';

const RegulatoryDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [rejectionComment, setRejectionComment] = useState("");

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/drugs/all');
        setDrugs(response.data);
      } catch (error) {
        console.error("Error fetching drugs:", error);
      }
    };
    fetchDrugs();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/drugs/approve/${id}`);
      setDrugs((prevDrugs) =>
        prevDrugs.map((drug) => (drug._id === id ? { ...drug, status: "approved" } : drug))
      );
    } catch (error) {
      console.error("Error approving drug:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/drugs/reject/${id}`, { comment: rejectionComment });
      setDrugs((prevDrugs) =>
        prevDrugs.map((drug) => (drug._id === id ? { ...drug, status: "rejected", rejectionComment } : drug))
      );
    } catch (error) {
      console.error("Error rejecting drug:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Regulatory Authority Dashboard</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Manufacturer Name</th>
            <th>Manufacture Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug._id}>
              <td>{drug.name}</td>
              <td>{drug.manufacturer}</td>
              <td>{new Date(drug.date).toLocaleDateString()}</td>
              <td>{drug.status}</td>
              <td>
                {drug.status === "pending" ? (
                  <>
                    <FaCheck
                      onClick={() => handleApprove(drug._id)}
                      style={{ color: "green", cursor: "pointer", marginRight: "10px" }}
                    />
                    <FaTimes
                      onClick={() => handleReject(drug._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      placeholder="Rejection Comment"
                      value={rejectionComment}
                      onChange={(e) => setRejectionComment(e.target.value)}
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                ) : drug.status === "rejected" ? (
                  <span>{drug.rejectionComment}</span>
                ) : (
                  <span>Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegulatoryDashboard;
