const getFormattedDateTime = require("../formattedDateTime");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("friendships").del();
  friendships = [
    { userId: 1, followingUserId: 2 },
    { userId: 1, followingUserId: 3 },
    { userId: 3, followingUserId: 1 },
  ];
  for (const post of friendships) {
    post.createdAt = getFormattedDateTime();
  }
  await knex("friendships").insert(friendships);
};
