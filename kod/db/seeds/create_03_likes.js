const getFormattedDateTime = require("../formattedDateTime");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("likes").del();
  likes = [
    { userId: 1, postId: 1 },
    { userId: 2, postId: 2 },
    { userId: 3, postId: 3 },
    { userId: 3, postId: 4 },
  ];
  for (const like of likes) {
    like.createdAt = getFormattedDateTime();
  }
  await knex("likes").insert(likes);
};
