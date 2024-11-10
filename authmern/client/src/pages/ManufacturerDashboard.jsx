import React, { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ManufacturerDashboard.css";

function ManufacturerDashboard() {
    const [drugName, setDrugName] = useState("");
    const [manufacturerId, setManufacturerId] = useState("");  // Updated to match backend
    const [manufacturerName, setManufacturerName] = useState("");
    const [manufactureDate, setManufactureDate] = useState("");
    const [qrCodeData, setQrCodeData] = useState(null);
    const [scanning, setScanning] = useState(false);

    const startScanner = () => {
        const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
        scanner.render(handleScanSuccess);
        setScanning(true);
    };

    const handleScanSuccess = (decodedText) => {
        setQrCodeData(decodedText);
        toast.success("QR code scanned successfully!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!qrCodeData || !drugName || !manufacturerId || !manufacturerName || !manufactureDate) {
            toast.error("Please fill in all fields and scan the QR code!");
            return;
        }

        const base64QrCode = btoa(qrCodeData);

        try {
            const response = await fetch("http://localhost:5000/api/v1/manufacturer/add-drug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    drugName,
                    manufacturerId,
                    manufacturerName,
                    productionDate: manufactureDate,
                    qrCodeData: base64QrCode
                })
            });

            if (!response.ok) throw new Error("Failed to save drug information");

            toast.success("Drug information saved successfully!");
            setDrugName("");
            setManufacturerId("");
            setManufacturerName("");
            setManufactureDate("");
            setQrCodeData(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="manufacturer-dashboard">
            <h2>Manufacturer Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Drug Name:</label>
                    <input
                        type="text"
                        value={drugName}
                        onChange={(e) => setDrugName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manufacturer Unique ID:</label>
                    <input
                        type="text"
                        value={manufacturerId}
                        onChange={(e) => setManufacturerId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manufacturer Name:</label>
                    <input
                        type="text"
                        value={manufacturerName}
                        onChange={(e) => setManufacturerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manufacture Date:</label>
                    <input
                        type="date"
                        value={manufactureDate}
                        onChange={(e) => setManufactureDate(e.target.value)}
                        required
                    />
                </div>
                <div className="qr-section">
                    <button type="button" onClick={startScanner} disabled={scanning}>
                        {scanning ? "Scanning..." : "Scan QR Code"}
                    </button>
                    <div id="qr-reader"></div>
                </div>
                <button type="submit" className="submit-btn">Save Drug Information</button>
            </form>
            <ToastContainer position="top-center" />
        </div>
    );
}

export default ManufacturerDashboard;
