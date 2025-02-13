const Joi = require('@hapi/joi');

module.exports = {
  0: {
    query: {},
    path: {},
    header: {},
    group: 'users',
    description: 'Get All Users',
  },
  1: {
    query: {},
    path: {
      userId: Joi.number().required(),
    },
    header: {},
    model: 'getUserDetails',
    group: 'users',
    description: 'Get user by id',
  },
  2: {
    query: {},
    path: {
      userId: Joi.number().required(),
    },
    header: {},
    model: 'deleteUser',
    group: 'users',
    description: 'Delete user',
  },
  3: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    },
    model: 'signup',
    group: 'users',
    description: 'Signup User',
  },
  4: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
    model: 'login',
    group: 'users',
    description: 'Login User',
  },
  5: {
    excludeFromSwagger: false,
  },
};
