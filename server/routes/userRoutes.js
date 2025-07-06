const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { toggleFollow, getUserProfile } = require('../controllers/userController');

// Get current user profile (protected)
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Follow another user (protected)
router.post('/:id/follow', auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(req.user.id);
  if (!user || !currentUser) return res.sendStatus(404);
  if (!user.followers.includes(currentUser._id)) {
    user.followers.push(currentUser._id);
    currentUser.following.push(user._id);
    await user.save();
    await currentUser.save();
  }
  res.json({ msg: 'Followed user' });
});

// Toggle follow/unfollow a user
router.put('/follow/:id', auth, toggleFollow);

// Get user profile and posts by username
router.get('/:username', getUserProfile);

module.exports = router;
