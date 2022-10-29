// external imprt
const express = require('express');

// internal import
const {
    usersControllerUpd,
    usersControllerDel,
    getUser,
    getUserByUserName,
} = require('../controller/usersController');

const router = express.Router();

// update
router.put('/:id', usersControllerUpd);

// delete
router.delete('/:id', usersControllerDel);

// get one user by id
router.get('/:id', getUser);

// get posts by userName
router.get('/:user', getUserByUserName);

module.exports = router;
