import express, { Router } from "express";
import {
  allPosts,
  post,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const postRoutes: Router = express.Router();

postRoutes.get("/", allPosts);
postRoutes.get(`/:id`, post);
postRoutes.post("/", createPost);
postRoutes.put("/:id", updatePost);
postRoutes.delete("/:id", deletePost);

export { postRoutes };
