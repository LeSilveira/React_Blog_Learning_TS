import { Request, Response } from "express";
import { db } from "../db/db";
import { Post } from '../types';
 
const allPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db("posts").select<Post[]>("*");

    if (!posts || posts.length === 0) {
      res
        .status(404)
        .json({ message: "Not a single post in the database was found" });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      message: "Error while fetching all the posts",
      error: e.message,
    });
  }
};

const post = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const foundPost = await db("posts").where({ id: id }).first<Post>();

    if (!foundPost) {
      res.status(404).json({
        message: `Can't seem to find the post with id: ${id} in the database, r u sure it's the right id?`,
      });
    } else {
      res.status(200).json(foundPost);
    }
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      message: `Error while fetching data for the post`,
      error: e.message,
    });
  }
};

const createPost = async (
  req: Request<{ title: string; content: string }>,
  res: Response
) => {
  try {
    const { title, content } = req.body;
    const [newId] = await db("posts").insert({ title, content });
    const newPost = await db("posts").where({ id: newId }).first<Post>();

    res.status(201).json(newPost);
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      message: "Error while creating a new post",
      error: e.message,
    });
  }
};

const updatePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body as {title: string, content: string};

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are mandatory!" });
    }

    const updatedPostsNumber = await db("posts")
      .where({ id: id })
      .update({ title: title, content: content });

    if (updatedPostsNumber === 0) {
      return res
        .status(404)
        .json({ message: `Couldn't find the post you are trying to update.` });
    }

    const updatedPost = await db("posts").where({ id: id }).first<Post>();

    res.status(200).json(updatedPost);
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      message: "Error while updating the post",
      error: e.message,
    });
  }
};

const deletePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const deletedPostsNumber = await db("posts").where({ id: id }).del();

    if (deletedPostsNumber === 0) {
      return res
        .status(404)
        .json({ message: `Couldn't find the post you are trying to delete.` });
    }

    res.status(204).json({ message: `Post ${id} deleted.` });
  } catch (error) {
    const e = error as Error;
    res.status(500).json({
      message: "Error while deleting the post",
      error: e.message,
    });
  }
};

export { allPosts, post, createPost, updatePost, deletePost };