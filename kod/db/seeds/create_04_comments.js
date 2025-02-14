const getFormattedDateTime = require("../formattedDateTime");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  comments = [
    { userId: 1, postId: 1, body: "Komentar 1", updatedAt: null },
    { userId: 1, postId: 2, body: "Komentar 2", updatedAt: null },
    { userId: 2, postId: 3, body: "Komentar 3", updatedAt: null },
    { userId: 2, postId: 4, body: "Komentar 4", updatedAt: null },
    { userId: 3, postId: 4, body: "Komentar 5", updatedAt: null },
  ];
  for (const comment of comments) {
    comment.createdAt = getFormattedDateTime();
  }
  await knex("comments").insert(comments);
};
