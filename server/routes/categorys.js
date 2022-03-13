// external imprt
const express = require('express');

// internal import
const { createCategory, getAllCat } = require('../controller/categoryController');

const router = express.Router();

// create category
router.post('/', createCategory);

// create all category
router.get('/', getAllCat);

module.exports = router;
