// src/components/QrScanner.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import "../styles/QrScanner.css"; // Custom styling

const QrScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data); // Store the result locally
      // Optionally, you could call the backend to verify/process data
      try {
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrData: data }),
        });
        const result = await response.json();
        // Redirect or display feedback based on result
        navigate('/result', { state: result });
      } catch (error) {
        console.error("Error processing QR code", error);
      }
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR code", error);
  };

  return (
    <div className="qr-scanner">
      <h2>Scan QR Code</h2>
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
      {scanResult && <p>Scanned Result: {scanResult}</p>}
    </div>
  );
};

export default QrScanner;
