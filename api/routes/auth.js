// external import
const express = require('express');

// internal import
const { regController, loginController } = require('../controller/authController');

const router = express.Router();

// signup
router.post('/register', regController);

// login
router.post('/login', loginController);

module.exports = router;
