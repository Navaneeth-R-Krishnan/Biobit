// routes/scanRoute.js
const express = require('express');
const router = express.Router();

// POST endpoint to process QR data
router.post('/scan', (req, res) => {
  const { qrData } = req.body;

  if (!qrData) {
    return res.status(400).json({ error: 'No QR data received' });
  }

  // Process the QR data as needed (e.g., validation, database lookup, etc.)
  console.log("Received QR Data:", qrData);

  // Respond back with success or further details
  res.json({ message: 'QR data processed successfully', data: qrData });
});

module.exports = router;
