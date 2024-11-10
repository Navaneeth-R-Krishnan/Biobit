// const HyperledgerService = require('../db/hyperledger');

// exports.getDrugDetails = async (req, res) => {
//     const { qrCodeData } = req.body;

//     try {
//         if (!qrCodeData) {
//             return res.status(400).json({ error: 'QR Code data is required' });
//         }

//         // Decode the base64-encoded QR code data
//         const decodedQrData = Buffer.from(qrCodeData, 'base64').toString('utf-8');

//         // Query the Hyperledger service using the decoded data
//         const drugDetails = await HyperledgerService.queryDrugDetails(decodedQrData);

//         if (!drugDetails) {
//             return res.status(404).json({ error: 'Drug details not found' });
//         }

//         res.json(drugDetails);
//     } catch (error) {
//         console.error('Error retrieving drug details:', error);
//         res.status(500).json({ error: 'Failed to retrieve drug details' });
//     }
// };

const ApprovedDrug = require('../models/ApprovedDrug');  // Import the approved drugs model

exports.getDrugDetails = async (req, res) => {
    const { qrCodeData } = req.body;
    console.log("Received QR Code Data:", qrCodeData); // Debugging: print the received QR code data in base64

    try {
        if (!qrCodeData) {
            return res.status(400).json({ error: 'QR Code data is required' });
        }

        // Directly compare the base64-encoded QR data with the stored base64-encoded data in MongoDB
        const drugDetails = await ApprovedDrug.findOne({ qrCodeData });

        if (!drugDetails) {
            return res.status(404).json({ error: 'Drug details not found' });
        }

        res.json(drugDetails);
    } catch (error) {
        console.error('Error retrieving drug details:', error);
        res.status(500).json({ error: 'Failed to retrieve drug details' });
    }
};
