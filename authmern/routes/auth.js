const express = require('express');
const { registerManufacturer, registerRegulatoryAuthority, login } = require('../controllers/authController');
const validateIdFormat = require('../middleware/validateIdFormat');
const router = express.Router();

// Registration routes
router.post('/register/manufacturer', validateIdFormat('manufacturer'), registerManufacturer);
router.post('/register/regulatory', validateIdFormat('regulatory'), registerRegulatoryAuthority);

// Login route
router.post('/manufacturer/login', login);

module.exports = router;
