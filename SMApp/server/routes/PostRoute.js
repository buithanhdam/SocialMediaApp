const express = require('express');
const {createPost,getPost, updatePost, deletePost, likeDislikePost,getTimeLinePosts} = require('../controllers/PostController');


const router = express.Router();

router.post('/',createPost);
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.put('/:id/like',likeDislikePost);
router.get('/:id/timeline',getTimeLinePosts);

module.exports = router;