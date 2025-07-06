const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  const post = await Post.create({
    caption, imageUrl, author: req.user.id
  });
  res.status(201).json(post);
};

exports.getFeed = async (req, res) => {
  const user = await User.findById(req.user.id);
  const posts = await Post.find({
    author: { $in: [...user.following, user._id] }
  }).sort({ createdAt: -1 }).populate('author');
  res.json(posts);
};

exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const liked = post.likes.includes(req.user.id);
  if (liked) {
    post.likes.pull(req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  await post.save();
  res.json({ liked: !liked });
};

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user.id, text });
  await post.save();
  res.json(post.comments);
};
