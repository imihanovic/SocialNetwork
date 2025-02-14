const getFormattedDateTime = require("../formattedDateTime");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("likes").del();
  likes = [
    { userId: 1, likeableId: 1, likeableType: "post" },
    { userId: 2, likeableId: 2, likeableType: "post" },
    { userId: 3, likeableId: 3, likeableType: "post" },
    { userId: 3, likeableId: 4, likeableType: "post" },
    { userId: 1, likeableId: 1, likeableType: "comment" },
    { userId: 2, likeableId: 2, likeableType: "comment" },
    { userId: 3, likeableId: 3, likeableType: "comment" },
    { userId: 3, likeableId: 4, likeableType: "comment" },
  ];
  for (const like of likes) {
    like.createdAt = getFormattedDateTime();
  }
  await knex("likes").insert(likes);
};
