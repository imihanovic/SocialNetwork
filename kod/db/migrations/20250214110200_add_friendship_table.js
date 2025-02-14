/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("friendships", (table) => {
    table.integer("userId").unsigned().notNullable();
    table.integer("followingUserId").unsigned().notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());

    table.primary(["userId", "followingUserId"]);

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .foreign("followingUserId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.check("userId <> followingUserId");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("friendships");
};
