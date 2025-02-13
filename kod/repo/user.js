const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../customError");
const getFormattedDateTime = require("../db/formattedDateTime");

const SALT_ROUNDS = 10;

function hashPassword(password) {
  try {
    return bcrypt.hash(password, SALT_ROUNDS);
  } catch (err) {
    throw new CustomError(404, "could not hash password");
  }
}

function comparePasswords(password, hash) {
  try {
    return bcrypt.compare(password, hash);
  } catch (err) {
    throw new CustomError(404, "could not compare passwords");
  }
}

function generateToken(user) {
  const sanitizedUser = { ...user };
  delete sanitizedUser.password;
  try {
    return jwt.sign(sanitizedUser, process.env.JWT_SECRET);
  } catch (err) {
    throw new CustomError(404, "could not generateToken");
  }
}

async function get() {
  try {
    return db("users").select();
  } catch (err) {
    throw new CustomError(404, "Could not get users");
  }
}

async function getById(userId) {
  try {
    return db("users").where({ id: userId }).first();
  } catch (err) {
    throw new CustomError(404, "Could not get user");
  }
}

async function getByEmail(email) {
  try {
    return db("users").where({ email }).first();
  } catch (err) {
    throw new CustomError(404, "Could not get user by email");
  }
}

async function create(body) {
  try {
    const createdUserId = (
      await db("users").insert({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await hashPassword(body.password),
        createdAt: getFormattedDateTime(),
      })
    )?.[0];
    return getById(createdUserId);
  } catch (err) {
    throw new CustomError(500, "Cannot create user");
  }
}

async function remove(userId) {
  try {
    return db("users").where({ id: userId }).del();
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
}

module.exports = {
  get,
  getById,
  getByEmail,
  create,
  hashPassword,
  comparePasswords,
  generateToken,
  remove,
  // update,
};

// NAPRAVIT UPDATE USERA
