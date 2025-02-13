const { expect } = require("chai");
const { create, remove, generateToken } = require("../repo/user");

describe("User routes", function () {
  let createdUser;
  const mockUser = {
    username: "testUser",
    firstName: "testUser",
    lastName: "testUser",
    email: new Date().toISOString() + "@mail.com",
    password: "sifra123",
  };
  let token;

  before(async function () {
    createdUser = await create(mockUser);
    token = generateToken({
      ...mockUser,
      id: createdUser.id,
    });
  });

  after(async function () {
    await remove(createdUser.id);
  });

  describe("GET /users", () => {
    it("should fetch all users", async () => {
      const response = await global.api
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        "id",
        "username",
        "firstName",
        "lastName",
        "email",
        "password",
        "createdAt",
      ]);
    });
    it("shouldn't fetch all users, no token", async () => {
      const resp = await global.api.get("/users").expect(401);
      expect(resp.status).to.be.equal(401);
    });
  });

  describe("GET /users/:userId", () => {
    it("should fetch the user by id", async () => {
      const response = await global.api
        .get(`/users/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).to.deep.equal(createdUser);
    });
    it("shouldn't fetch the user by not existing id", async () => {
      const resp = await global.api
        .get(`/users/${createdUser.id + 1}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
    it("should fetch the user by id, no token", async () => {
      const resp = await global.api.get(`/users/${createdUser.id}`).expect(401);
      expect(resp.status).to.be.equal(401);
    });
  });

  describe("POST /signup", () => {
    it("should create a new user", async () => {
      const username = "testUser";
      const firstName = "testUser";
      const lastName = "testUser";
      const email = "user05@email.com";
      const password = "sifra123";
      const response = await global.api
        .post("/signup")
        .send({ username, firstName, lastName, email, password })
        .expect(200);

      expect(response.body.email).to.deep.equal(email);
      expect(response.body.password).to.not.equal(password);
    });
    it("shouldn't create a new user, not valid mail form", async () => {
      const username = "testUser";
      const firstName = "testUser";
      const lastName = "testUser";
      const email = "user05.com";
      const password = "sifra123";
      const response = await global.api
        .post("/signup")
        .send({ username, firstName, lastName, email, password })
        .expect(500);

      expect(response.status).to.be.equal(500);
    });
    it("shouldn't create a new user, username field required", async () => {
      const firstName = "testUser";
      const lastName = "testUser";
      const email = "user05@email.com";
      const password = "sifra123";
      const response = await global.api
        .post("/signup")
        .send({ firstName, lastName, email, password })
        .expect(500);
      expect(response.status).to.be.equal(500);
    });
  });

  describe("POST /login", () => {
    it("should login the user", async () => {
      const email = "user01@mail.com";
      const password = "sifra123";

      const response = await global.api
        .post("/login")
        .send({ email, password })
        .expect(200);

      expect(response.body).to.have.property("token");
      expect(response.body.token).to.be.a("string").that.is.not.empty;
    });
    it("shouldn't login the user, no such user", async () => {
      const email = "user08@mail.com";
      const password = "sifra123";

      const response = await global.api
        .post("/login")
        .send({ email, password })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
    it("shouldn't login the user, incorrect password", async () => {
      const email = "user01@mail.com";
      const password = "sifra124";

      const response = await global.api
        .post("/login")
        .send({ email, password })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
  });

  describe("DEL /users/:userId", async function () {
    it("should delete user", async function () {
      const resp = await global.api
        .del(`/users/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(resp.status).to.be.equal(200);
    });
    it("should not delete user by not existing id", async function () {
      const resp = await global.api
        .del(`/users/${createdUser.id + 1}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
    it("should not delete user that is not logged", async function () {
      const resp = await global.api
        .del(`/users/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
    it("should not delete user, no token", async function () {
      const resp = await global.api
        .del(`/users/${createdUser.id + 1}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
  });
});
