// routes/manufacturerRoutes.js
const express = require('express');
const { addDrugWithQR } = require('../controllers/manufacturerController');
const router = express.Router();

// Endpoint to add a new drug with QR code
router.post('/add-drug', addDrugWithQR);

module.exports = router;
