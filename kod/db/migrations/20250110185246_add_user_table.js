/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("likes", (table) => {
    table.integer("userId").unsigned().notNullable();
    table.integer("postId").unsigned().notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());

    table.primary(["userId", "postId"]);

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
