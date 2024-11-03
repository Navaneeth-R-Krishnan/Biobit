const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.post('/drug-details', qrController.getDrugDetails);

module.exports = router;
