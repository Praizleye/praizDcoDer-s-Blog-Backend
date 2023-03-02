const Post = require("../models/blogModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  const blogPosts = await Post.find({}).sort({ createdAt: -1 });

  res.status(200).json(blogPosts);
};

const getSinglePosts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ mssg: "No such blog post exists." });
  }

  const blogPosts = await Post.findById(id);

  if (!blogPosts) {
    return res.status(404).json({ message: "No such blog post" });
  }

  res.status(200).json(blogPosts);
};

const createPost = async (req, res) => {
  const { title, author, genre, body } = req.body;

  try {
    if (
      !title ||
      !author ||
      !genre ||
      !body ||
      title.length < 1 ||
      author.length < 1 ||
      genre.length < 1 ||
      body.length < 1
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const createPost = await Post.create({ title, author, genre, body });
    res.status(200).json(createPost);
  } catch (error) {
    return res.status(400).json({ message: "unknown error" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "No such blog post exists." });
  }

  const updatePost = Post.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!updatePost) {
    return res.status(400).json({ message: "No such blog post exists" });
  }

  res.status(200).json(updatePost);
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "No such blog post exists." });
  }

  const deletePost = Post.findOneAndDelete({ _id: id });

  if (!updatePost) {
    return res.status(400).json({ message: "No such blog post exists" });
  }

  res.status(200).json(deletePost);
};

module.exports = {
  getAllPosts,
  getSinglePosts,
  createPost,
  updatePost,
  deletePost,
};
