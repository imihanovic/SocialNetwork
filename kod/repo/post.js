const db = require("../db");
const getFormattedDateTime = require("../db/formattedDateTime");
const CustomError = require("../customError");

async function get() {
  try {
    return db("posts").select();
  } catch (err) {
    throw new CustomError(404, "Cannot get posts");
  }
}

async function getById(postId) {
  try {
    return db("posts").where({ id: postId }).first();
  } catch (err) {
    throw new CustomError(404, "Cannot find post");
  }
}

async function getByUserId(Id) {
  try {
    return db("posts").where({ userId: Id });
  } catch (err) {
    throw new CustomError(404, "Cannot get posts by user");
  }
}

async function create(data) {
  try {
    const createdDate = getFormattedDateTime();
    const createdPostId = (
      await db("posts").insert({
        userId: data.userId,
        title: data.title,
        body: data.body,
        createdAt: createdDate,
        updatedAt: null,
      })
    )?.[0];
    const createdPost = await getById(createdPostId);
    return createdPost;
  } catch (err) {
    throw new CustomError(401, "cannot save post");
  }
}

async function update(postId, body, user) {
  try {
    const post = await getById(postId);
    if (user === post.userId) {
      const updateDate = getFormattedDateTime();
      await db("posts").where({ id: postId }).update({
        title: body.title,
        body: body.body,
        updatedAt: updateDate,
      });
      return await getById(postId);
    } else {
      throw new CustomError(401, "You cannot update post that you do not own!");
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(401, "Cannot update post");
  }
}

async function removePost(postId, user) {
  try {
    const post = await getById(postId);
    if (user === post.userId) {
      return db("posts").where({ id: postId }).del();
    } else {
      throw new CustomError(401, "Cannot delete post, you are not an owner");
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(401, "Cannot delete post");
  }
}

module.exports = {
  get,
  getById,
  getByUserId,
  create,
  update,
  removePost,
};
