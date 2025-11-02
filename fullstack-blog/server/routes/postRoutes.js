const express = require("express");
const router = express.Router();

const {
  allPosts,
  post,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", allPosts);
router.get(`/:id`, post);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
