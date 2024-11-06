// routes/regulatoryRoutes.js
const express = require('express');
const router = express.Router();
const regulatoryController = require('../controllers/regulatoryController');

router.get('/drugs', regulatoryController.getAllDrugs);
router.post('/drugs/approve/:id', regulatoryController.approveDrug);
router.post('/drugs/reject/:id', regulatoryController.rejectDrug);

module.exports = router;
