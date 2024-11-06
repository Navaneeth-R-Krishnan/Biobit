import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/RegulatoryDashboard.css';

const RegulatoryDashboard = () => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/drugs/all');
        const drugsWithComment = response.data.map(drug => ({
          ...drug,
          rejectionComment: '', // Initialize rejection comment for each drug
        }));
        setDrugs(drugsWithComment);
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
      alert("Drug approved successfully!");
    } catch (error) {
      console.error("Error approving drug:", error);
      alert("Error approving drug.");
    }
  };

  const handleReject = async (id, comment) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/drugs/reject/${id}`, { comment });
      setDrugs((prevDrugs) =>
        prevDrugs.map((drug) => 
          drug._id === id ? { ...drug, status: "rejected", rejectionComment: comment } : drug
        )
      );
      alert("Drug rejected successfully.");
    } catch (error) {
      console.error("Error rejecting drug:", error);
      alert("Error rejecting drug.");
    }
  };

  const handleCommentChange = (id, value) => {
    setDrugs((prevDrugs) =>
      prevDrugs.map((drug) => 
        drug._id === id ? { ...drug, rejectionComment: value } : drug
      )
    );
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
                      onClick={() => handleReject(drug._id, drug.rejectionComment)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <input
                      type="text"
                      placeholder="Rejection Comment"
                      value={drug.rejectionComment}
                      onChange={(e) => handleCommentChange(drug._id, e.target.value)}
                      style={{ marginLeft: "10px" }}
                    />
                  </>
                ) : drug.status === "rejected" ? (
                  <span>{drug.rejectionComment || "Rejected"}</span>
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
