// external import
const express = require('express');

// internal import
const { regController, loginController } = require('../controller/authController');

const router = express.Router();

router.post('/register', regController);

router.post('/login', loginController);

module.exports = router;
