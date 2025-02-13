require("dotenv").config();
const knex = require("knex");
const path = require("path");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "sqlite3"),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
  },
});

module.exports = db;
