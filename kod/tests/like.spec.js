const { expect } = require("chai");
const { create, remove, generateToken } = require("../repo/user");
const likeRepo = require("../repo/like");
const repoPost = require("../repo/post");

describe("Like routes", function () {
  let createdUser;
  const mockUser = {
    username: "testUser",
    firstName: "testUser",
    lastName: "testUser",
    email: new Date().toISOString() + "@mail.com",
    password: "sifra123",
  };
  let token;
  let createdPost;

  before(async function () {
    createdUser = await create(mockUser);
    let mockPost = {
      userId: createdUser.id,
      title: "Naslov",
      body: "Body",
    };
    createdPost = await repoPost.create(mockPost);
    token = generateToken({
      ...mockUser,
      id: createdUser.id,
    });
  });

  after(async function () {
    await remove(createdUser.id);
  });

  describe("GET /likes", () => {
    it("should fetch all likes", async () => {
      const response = await global.api
        .get("/likes")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        "userId",
        "postId",
        "createdAt",
      ]);
    });
  });

  describe("POST /likes", () => {
    it("should create a new like", async () => {
      const response = await global.api
        .post("/likes")
        .send({ postId: createdPost.id })
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.postId).to.deep.equal(createdPost.id);
    });
  });

  describe("GET /likes/user/:userId", () => {
    it("should fetch likes by userId", async () => {
      const response = await global.api
        .get(`/likes/user/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      for (let el of response.body) {
        expect(el.userId).to.deep.equal(createdUser.id);
      }
    });
  });

  describe("GET /likes/post/:postId", () => {
    it("should fetch likes by postId", async () => {
      const response = await global.api
        .get(`/likes/post/${createdPost.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      for (let el of response.body) {
        expect(el.postId).to.deep.equal(createdPost.id);
      }
    });
  });

  describe("GET /likes/:postId/:userId", () => {
    it("should fetch like by postId and userId", async () => {
      const response = await global.api
        .get(`/likes/${createdPost.id}/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.postId).to.deep.equal(createdPost.id);
      expect(response.body.userId).to.deep.equal(createdUser.id);
    });
  });

  describe("DEL /likes/:postId/:userId", async function () {
    it("should delete like", async function () {
      const resp = await global.api
        .del(`/likes/${createdPost.id}/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(resp.status).to.be.equal(200);
    });
    it("should not delete like by not existing postId", async function () {
      const resp = await global.api
        .del(`/likes/${createdPost.id + 100}/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(500);
      expect(resp.status).to.be.equal(500);
    });
    it("should not delete like that is not on your post", async function () {
      const resp = await global.api
        .del(`/likes/${createdPost.id - 2}/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(403);
      expect(resp.status).to.be.equal(403);
    });
    it("should not delete like, no token", async function () {
      const resp = await global.api
        .del(`/likes/${createdPost.id}/${createdUser.id}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
  });
});
