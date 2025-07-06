const User = require('../models/User');
const Post = require('../models/Post');

exports.toggleFollow = async (req, res) => {
  const current = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);

  const isFollowing = current.following.includes(target._id);
  if (isFollowing) {
    current.following.pull(target._id);
    target.followers.pull(current._id);
  } else {
    current.following.push(target._id);
    target.followers.push(current._id);
  }

  await current.save();
  await target.save();

  res.json({ following: !isFollowing });
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
  res.json({ user, posts });
};