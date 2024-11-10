import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/Qrscanner.css";

function QrScanner() {
    const [drugDetails, setDrugDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleScanSuccess = async (qrCodeMessage) => {
        try {
            setLoading(true);
            setError(null);

            // Encode the scanned QR data to base64
            const base64QrData = btoa(qrCodeMessage);

            const response = await fetch('http://localhost:5000/api/v1/drug-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ qrCodeData: base64QrData })
            });

            if (!response.ok) {
                throw new Error('Drug details not found or error occurred.');
            }

            const data = await response.json();
            setDrugDetails(data);
        } catch (error) {
            console.error('Error fetching drug details:', error);
            setError('Failed to retrieve drug details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Initialize the QR code scanner
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scanner.render(handleScanSuccess);
        return () => scanner.clear();
    }, []);

    return (
        <div className="qr-scanner-container">
            <div id="qr-reader"></div>
            {loading && <p>Loading drug details...</p>}
            {error && <p className="error">{error}</p>}
            {drugDetails && (
                <div className="drug-details">
                    <h2>The Drug</h2>
                    <h3>Drug Details</h3>
                    <p><strong>Name:</strong> {drugDetails.drugName}</p>
                    <p><strong>Manufacturer:</strong> {drugDetails.manufacturerId}</p>
                    <p><strong>Production Date:</strong> {drugDetails.productionDate}</p>
                    <p><strong>Approval Date:</strong> {drugDetails.approvalDate}</p>
                </div>
            )}
        </div>
    );
}

export default QrScanner;
