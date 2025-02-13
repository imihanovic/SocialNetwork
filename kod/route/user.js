const Router = require("@koa/router");
const Joi = require("joi");
const CustomError = require("../customError");
const validationMiddleware = require("../middleware/validate");
const userRepo = require("../repo/user");
const authMiddlewareJwtCheck = require("../middleware/auth");

const router = new Router();

// GET /users
router.get("/users", authMiddlewareJwtCheck, async (ctx) => {
  ctx.body = await userRepo.get();
});

// GET /users/:userId
router.get(
  "/users/:userId",
  authMiddlewareJwtCheck,
  validationMiddleware.params({
    userId: Joi.number().integer().required(),
  }),
  async (ctx) => {
    const userId = ctx.params.userId;
    ctx.body = await userRepo.getById(userId);
  }
);

// DELETE /users
router.delete("/users/:userId", authMiddlewareJwtCheck, async (ctx) => {
  const userId = parseInt(ctx.params.userId);

  const loggedUser = ctx.state.user;
  if (userId !== loggedUser.id) throw new CustomError(401, "Wrong permissions");

  ctx.body = await userRepo.remove(userId);
});

// POST /signup
router.post(
  "/signup",
  validationMiddleware.body({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
  async (ctx) => {
    const body = ctx.request.body;
    ctx.body = await userRepo.create(body);
  }
);

// POST /login
router.post(
  "/login",
  validationMiddleware.body({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await userRepo.getByEmail(email);
    if (!user) {
      throw new CustomError(401, "No such user.");
    }

    const passwordMatch = await userRepo.comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new CustomError(401, "Wrong password.");
    }

    const id = user.id;
    const token = userRepo.generateToken(user);
    ctx.body = { id, token };
  }
);

module.exports = router;
