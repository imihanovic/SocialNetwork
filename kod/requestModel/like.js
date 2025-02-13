const Joi = require("@hapi/joi");

module.exports = {
  0: {
    query: {},
    path: {},
    header: {},
    group: "likes",
    description: "Get All Likes",
  },
  1: {
    query: {},
    path: {
      userId: Joi.number().required(),
    },
    header: {},
    model: "getLikeByUserId",
    group: "likes",
    description: "Get like by user id",
  },
  2: {
    query: {},
    path: {
      postId: Joi.number().required(),
    },
    header: {},
    model: "getLikeByPostId",
    group: "likes",
    description: "Get like by post id",
  },
  3: {
    query: {},
    path: {
      postId: Joi.number().required(),
      userId: Joi.number().required(),
    },
    model: "getLike",
    group: "likes",
    description: "Get like",
  },
  4: {
    query: {},
    body: {
      postId: Joi.number().integer().required(),
    },
    model: "createLike",
    group: "likes",
    description: "Create like",
  },
  5: {
    query: {},
    path: {
      postId: Joi.number().integer().required(),
      userId: Joi.number().integer().required(),
    },
    header: {},
    model: "deleteLike",
    group: "likes",
    description: "Delete like",
  },
  6: {
    excludeFromSwagger: false,
  },
};
