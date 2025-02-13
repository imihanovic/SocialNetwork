const Router = require("@koa/router");
const Joi = require("joi");
const authMiddlewareJwtCheck = require("../middleware/auth");
const validationMiddleware = require("../middleware/validate");
const postRepo = require("../repo/post");

const router = new Router();

// GET /posts
router.get("/posts", async (ctx) => {
  ctx.body = await postRepo.get();
});

// GET /posts/:postId
router.get(
  "/posts/:postId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const postId = ctx.params.postId;
    ctx.body = await postRepo.getById(postId);
  }
);

// GET /posts/user/:userId
router.get(
  "/posts/user/:userId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    userId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const userId = ctx.params.userId;
    console.log("Fetching posts for userId:", userId);

    try {
      const posts = await postRepo.getByUserId(userId);
      if (!posts || posts.length === 0) {
        ctx.status = 404;
        ctx.body = { message: "No posts found for this user" };
        return;
      }
      ctx.body = posts;
    } catch (err) {
      console.error("Error while fetching posts:", err);
      ctx.status = 500;
      ctx.body = { message: "Internal server error", error: err.message };
    }
  }
);

// POST /posts
router.post(
  "/posts",
  authMiddlewareJwtCheck,
  validationMiddleware.body({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const data = {
      ...ctx.request.body,
      userId,
    };
    ctx.body = await postRepo.create(data);
  }
);

// PUT /posts/:postId
router.put(
  "/posts/:postId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
  }),
  validationMiddleware.body({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const postId = ctx.params.postId;
    const body = ctx.request.body;
    ctx.body = await postRepo.update(postId, body, userId);
  }
);

// DELETE /posts/:postId
router.delete(
  "/posts/:postId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const userId = ctx.state.user.id;
    const postId = ctx.params.postId;
    ctx.body = await postRepo.removePost(postId, userId);
  }
);

module.exports = router;
