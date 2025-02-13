const getFormattedDateTime = require('../formattedDateTime');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('posts').del();
    posts = [
      { userId: 1, title: 'Title 1', body:"Neki tekst 1", updatedAt: null},
      { userId: 2, title: 'Title 2', body:"Neki tekst 1", updatedAt: null},
      { userId: 3, title: 'Title 3', body:"Neki tekst 1", updatedAt: null},
      { userId: 3, title: 'Title 4', body:"Neki tekst 1", updatedAt: null},
    ];
    for (const post of posts){
        post.createdAt = getFormattedDateTime();
    }
    await knex('posts').insert(posts);
  };
