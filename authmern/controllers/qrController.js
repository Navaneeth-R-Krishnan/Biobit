const HyperledgerService = require('../db/hyperledger');

exports.getDrugDetails = async (req, res) => {
    const { qrCodeData } = req.body;
    try {
        // Assume qrCodeData contains a drug ID or identifier
        const drugDetails = await HyperledgerService.queryDrugDetails(qrCodeData);
        res.json(drugDetails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve drug details' });
    }
};