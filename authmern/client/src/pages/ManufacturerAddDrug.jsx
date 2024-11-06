// components/ManufacturerAddDrug.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const ManufacturerAddDrug = () => {
  const [drugName, setDrugName] = useState('');
  const [qrData, setQrData] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setQrData(data);  // Set the QR data from scanner
      toast.success("QR Code scanned successfully");
    }
  };

  const handleError = (err) => {
    console.error(err);
    toast.error("Failed to scan QR code");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      manufacturerId: "DM12345678",  // Replace with the actual logged-in manufacturer's ID
      drugName,
      qrCodeData: qrData,
      productionDate,
      expirationDate,
      batchNumber,
      additionalInfo,
    };

    try {
      await axios.post('http://localhost:5000/api/v1/manufacturer/add-drug', formData);
      toast.success("Drug information added successfully");
      navigate('/manufacturer-dashboard');
    } catch (err) {
      toast.error("Failed to add drug information");
    }
  };

  return (
    <div className="manufacturer-add-drug">
      <h2>Add New Drug</h2>
      <form onSubmit={handleSubmit}>
        <label>Drug Name:</label>
        <input type="text" value={drugName} onChange={(e) => setDrugName(e.target.value)} required />

        <label>Scan QR Code:</label>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text);
            }
            if (!!error) {
              handleError(error);
            }
          }}
          style={{ width: '100%' }}
        />

        <label>Production Date:</label>
        <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} required />

        <label>Expiration Date:</label>
        <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />

        <label>Batch Number:</label>
        <input type="text" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} required />

        <label>Additional Information:</label>
        <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />

        <button type="submit">Submit Drug</button>
      </form>
    </div>
  );
};

export default ManufacturerAddDrug;
