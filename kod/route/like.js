const Router = require("@koa/router");
const Joi = require("joi");
const authMiddlewareJwtCheck = require("../middleware/auth");
const validationMiddleware = require("../middleware/validate");
const likeRepo = require("../repo/like");
const CustomError = require("../customError");

const router = new Router();

// GET /likes
router.get("/likes", authMiddlewareJwtCheck, async (ctx) => {
  ctx.body = await likeRepo.get();
});

// GET /likes/user/:userId
router.get(
  "/likes/user/:userId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    userId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const userId = ctx.params.userId;
    ctx.body = await likeRepo.getByUserId(userId);
  }
);

// GET /likes/post/:postId
router.get(
  "/likes/post/:postId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const postId = ctx.params.postId;
    ctx.body = await likeRepo.getByPostId(postId);
  }
);
//GET /likes/:postId/:userId
router.get(
  "/likes/:postId/:userId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const postId = ctx.params.postId;
    const userId = ctx.params.userId;
    ctx.body = await likeRepo.getById(postId, userId);
  }
);
// POST /likes
router.post(
  "/likes",
  authMiddlewareJwtCheck,
  validationMiddleware.body({
    postId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const userId = ctx.state.user.id;
    const body = { ...ctx.request.body, userId };
    ctx.body = await likeRepo.create(body);
  }
);

// DELETE /likes/:postId/:userId
router.delete(
  "/likes/:postId/:userId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    postId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
  }),
  async function (ctx) {
    const user = ctx.state.user.id;
    const postId = ctx.params.postId;
    const userId = ctx.params.userId;
    ctx.body = await likeRepo.removeLike(postId, userId, user);
  }
);

module.exports = router;
