// external imprt
const express = require('express');

// internal import
const {
    usersControllerUpd,
    usersControllerDel,
    getUser,
} = require('../controller/usersController');

const router = express.Router();

// update
router.put('/:id', usersControllerUpd);

// delete
router.delete('/:id', usersControllerDel);

// get a user by id
router.get('/:id', getUser);

module.exports = router;
