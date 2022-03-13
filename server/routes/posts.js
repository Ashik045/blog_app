// external imprt
const express = require('express');

// internal import
const {
    createPost,
    updPost,
    delPost,
    getPost,
    getAllPost,
} = require('../controller/postController');

const router = express.Router();

// create post
router.post('/', createPost);

// update post
router.put('/:id', updPost);

// delete post
router.delete('/:id', delPost);

// get a post
router.get('/:id', getPost);

// get all post
router.get('/', getAllPost);

module.exports = router;
