const { hashPassword } = require("../../repo/user.js");
const getFormattedDateTime = require("../formattedDateTime.js");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const users = [
    {
      username: "user01",
      firstName: "user",
      lastName: "01",
      email: "user01@mail.com",
    },
    {
      username: "user02",
      firstName: "user",
      lastName: "02",
      email: "user02@mail.com",
    },
    {
      username: "user03",
      firstName: "user",
      lastName: "03",
      email: "user03@mail.com",
    },
  ];

  for (const user of users) {
    user.password = await hashPassword("sifra123");
    user.createdAt = getFormattedDateTime();
  }

  await knex("users").insert(users);
};
