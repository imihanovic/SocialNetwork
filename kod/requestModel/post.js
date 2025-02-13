const Joi = require("@hapi/joi");

module.exports = {
  0: {
    query: {},
    path: {},
    header: {},
    group: "posts",
    description: "Get All Posts",
  },
  1: {
    query: {},
    path: {
      postId: Joi.number().required(),
    },
    header: {},
    model: "getPostById",
    group: "posts",
    description: "Get post by id",
  },
  2: {
    query: {},
    path: {
      userId: Joi.number().required(),
    },
    header: {},
    model: "getPostByUserId",
    group: "posts",
    description: "Get post by user id",
  },
  3: {
    body: {
      title: Joi.string().required(),
      body: Joi.string().required(),
    },
    model: "createPost",
    group: "posts",
    description: "Create post",
  },
  4: {
    body: {
      title: Joi.string().required(),
      body: Joi.string().required(),
    },
    model: "updatePost",
    group: "posts",
    description: "Update Post",
  },
  5: {
    query: {},
    path: {
      postId: Joi.number().required(),
    },
    header: {},
    model: "deletePost",
    group: "posts",
    description: "Delete post",
  },
  6: {
    excludeFromSwagger: false,
  },
};
