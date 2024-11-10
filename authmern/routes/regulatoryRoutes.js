// routes/regulatoryRoutes.js
const express = require('express');
const router = express.Router();
const regulatoryController = require('../controllers/regulatoryController');

router.get('/drugs', regulatoryController.getAllDrugs);
router.patch('/drugs/approve/:id', regulatoryController.approveDrug);
router.patch('/drugs/reject/:id', regulatoryController.rejectDrug);

module.exports = router;
