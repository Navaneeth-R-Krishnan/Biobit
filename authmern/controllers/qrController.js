const HyperledgerService = require('../db/hyperledger');

exports.getDrugDetails = async (req, res) => {
    const { qrCodeData } = req.body;

    try {
        // Decode the base64-encoded QR code data
        const decodedQrData = Buffer.from(qrCodeData, 'base64').toString('utf-8');

        // Assume decodedQrData contains a drug ID or identifier to query Hyperledger
        const drugDetails = await HyperledgerService.queryDrugDetails(decodedQrData);

        res.json(drugDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve drug details' });
    }
};
