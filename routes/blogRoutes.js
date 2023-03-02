const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getSinglePosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/blogPostController");

//! Get all posts
router.get("/", getAllPosts);

//! Get a single post
router.get("/:id", getSinglePosts);

// ! create a single post
router.post("/create", createPost);

// ! update an existing post
router.patch("/edit/:1d", updatePost);

// ! delete a single post
router.delete("/delete/:id", deletePost);

module.exports = router;
