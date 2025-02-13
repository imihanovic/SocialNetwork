const db = require("../db");
const CustomError = require("../customError");
const { getById: getPostById } = require("./post.js");
const getFormattedDateTime = require("../db/formattedDateTime");

async function get() {
  try {
    return db("likes").select();
  } catch (err) {
    throw new CustomError(404, "Cannot get likes");
  }
}

async function getById(post, user) {
  try {
    return db("likes").where({ postId: post, userId: user }).first();
  } catch (err) {
    throw new CustomError(404, "Cannot get like");
  }
}

async function getByPostId(id) {
  try {
    return db("likes").where({ postId: id });
  } catch (err) {
    throw new CustomError(404, "Cannot get likes by post");
  }
}

async function getByUserId(id) {
  try {
    return db("likes").where({ userId: id });
  } catch (err) {
    throw new CustomError(404, "Cannot get likes by user");
  }
}

async function create(body) {
  try {
    const date = getFormattedDateTime();
    const createdlikeId = (
      await db("likes").insert({
        userId: body.userId,
        postId: body.postId,
        createdAt: date,
      })
    )?.[0];
    return getById(body.postId, body.userId);
  } catch (err) {
    throw new CustomError(500, "Cannot create likes");
  }
}

async function removeLike(postId, userId, loggedUserId) {
  try {
    const post = await getPostById(postId);
    if (post.userId === loggedUserId || Number(userId) === loggedUserId) {
      return db("likes").where({ postId: postId, userId: userId }).del();
    } else {
      throw new CustomError(403, "Cannot delete someone elses like!");
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(500, "Cannot delete like");
  }
}

module.exports = {
  get,
  getById,
  getByPostId,
  create,
  getByUserId,
  removeLike,
};
