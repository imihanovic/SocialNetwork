/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable("likes", (table) => {
    table.integer("userId").unsigned().notNullable();
    table.integer("likeableId").unsigned().notNullable();
    table.string("likeableType").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.primary(["userId", "likeableId", "likeableType"]);
  });
  await knex.schema.raw(`
    CREATE TRIGGER check_likeableType
    BEFORE INSERT ON likes
    FOR EACH ROW
    WHEN NEW.likeableType NOT IN ('post', 'comment')
    BEGIN
      SELECT RAISE(ABORT, 'Invalid likeableType: must be "post" or "comment"');
    END;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
