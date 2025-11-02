const db = require("../db/db");

const allPosts = async (req, res) => {
  try {
    const posts = await db("posts").select("*");

    if (!posts) {
      res
        .status(404)
        .json({ message: "Not a single post in the database was found" });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching all the posts",
      error: error.message,
    });
  }
};

const post = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await db("posts").where({ id: id }).first();

    if (!foundPost) {
      res.status(404).json({
        message: `Can't seem to find the post with id: ${id} in the database, r u sure it's the right id?`
      });
    } else {
      res.status(200).json(foundPost);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching data for the post with id: ${id}`,
      error: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [newId] = await db("posts").insert({ title, content });
    const newPost = await db("posts").where({ id: newId }).first();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "Error while creating a new post",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const {id} = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are mandatory!" });
    }

    const updatedPostsNumber = await db("posts")
      .where({ id: id })
      .update({ title: title, content: content });

    if (updatedPostsNumber === 0){
      return res.status(404).json({message: `Couldn't find the post you are trying to update.`});
    }

    const updatedPost = await db('posts').where({id: id}).first();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error while updating the post",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;

    const deletedPostsNumber = await db("posts")
      .where({ id: id })
      .del();

    if (deletedPostsNumber === 0){
      return res.status(404).json({message: `Couldn't find the post you are trying to delete.`});
    }

    res.status(204).json({message: `Post ${id} deleted.`});
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting the post",
      error: error.message,
    });
  }
};

module.exports = {
  allPosts,
  post,
  createPost,
  updatePost,
  deletePost,
};
