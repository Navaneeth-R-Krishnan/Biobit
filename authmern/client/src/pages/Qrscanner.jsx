import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/Qrscanner.css"

function QrScanner() {
    const [drugDetails, setDrugDetails] = useState(null);

    const handleScanSuccess = async (qrCodeMessage) => {
        try {
            const response = await fetch('/api/drug-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ qrCodeData: qrCodeMessage })
            });
            const data = await response.json();
            setDrugDetails(data);  // Display this data in the UI
        } catch (error) {
            console.error('Error fetching drug details:', error);
        }
    };

    // Initialize the QR code scanner
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scanner.render(handleScanSuccess);
        return () => scanner.clear();
    }, []);

    return (
        <div>
            <div id="qr-reader"></div>
            {drugDetails && <div>{JSON.stringify(drugDetails)}</div>}
        </div>
    );
}

export default QrScanner;