// external imprt
const express = require('express');

// internal import
const {
    createPost,
    updPost,
    delPost,
    getPost,
    getAllPost,
    allPostOfUser,
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

// get all post of a user
router.get('/allpost/', allPostOfUser);

// // get popular
// router.get('/', popularPost);

module.exports = router;
