const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPost, getFeed, toggleLike, addComment } = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/feed', auth, getFeed);

router.post('/comment/:id', auth, addComment);

module.exports = router;
