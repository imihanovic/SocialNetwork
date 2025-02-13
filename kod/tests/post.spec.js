const { expect } = require("chai");
const { create, remove, generateToken } = require("../repo/user");
const repoPost = require("../repo/post");

describe("Post routes", function () {
  let createdUser;
  const newTitle = "edited title test";
  const newBody = "edited body test";
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

  describe("GET /posts", () => {
    it("should fetch all posts", async () => {
      const response = await global.api
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).to.be.an("array");
      expect(response.body.length > 0).to.be.true;
      expect(Object.keys(response.body[0])).to.deep.equal([
        "id",
        "userId",
        "title",
        "body",
        "createdAt",
        "updatedAt",
      ]);
    });
  });
  describe("POST /posts", () => {
    it("should create a new post", async () => {
      const title = "nekiTitle";
      const body = "nekiBody";
      const response = await global.api
        .post("/posts")
        .send({ title, body })
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.title).to.deep.equal(title);
      expect(response.body.body).to.deep.equal(body);
    });
    it("shouldn't create a new post, title empty", async () => {
      const title = "";
      const body = "nekiBody";
      const response = await global.api
        .post("/posts")
        .send({ title, body })
        .set("Authorization", `Bearer ${token}`)
        .expect(500);

      expect(response.status).to.be.equal(500);
    });
    it("shouldn't create a new post, no token", async () => {
      const title = "title";
      const body = "nekiBody";
      const response = await global.api
        .post("/posts")
        .send({ title, body })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
  });

  describe("GET /posts/:postId", () => {
    it("should fetch the post by postId", async () => {
      const response = await global.api
        .get(`/posts/${createdPost.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.id).to.deep.equal(createdPost.id);
    });
    it("shouldn't fetch the post by postId, not existing postId", async () => {
      const response = await global.api
        .get(`/posts/${createdPost.id + 100}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      expect(response.status).to.be.equal(204);
    });
    it("shouldn't fetch the post by postId, no token", async () => {
      const response = await global.api
        .get(`/posts/${createdPost.id}`)
        .expect(401);
      expect(response.status).to.be.equal(401);
    });
  });

  describe("GET /posts/user/:userId", () => {
    it("should fetch the post by userId", async () => {
      const response = await global.api
        .get(`/posts/user/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      for (let el of response.body) {
        expect(el.userId).to.deep.equal(createdUser.id);
      }
    });
    it("shouldn't fetch the post by not existing userId", async () => {
      const response = await global.api
        .get(`/posts/user/${createdUser.id + 100}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(response.body.length).to.be.equal(0);
    });
    it("shouldn't fetch the post by userId, no token", async () => {
      const response = await global.api
        .get(`/posts/user/${createdUser.id}`)
        .expect(401);
      expect(response.status).to.be.equal(401);
    });
  });

  describe("PUT /posts/:postId", () => {
    it("should edit post", async () => {
      const response = await global.api
        .put(`/posts/${createdPost.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: newTitle,
          body: newBody,
        })
        .expect(200);

      expect(response.body.title).to.deep.equal(newTitle);
      expect(response.body.body).to.deep.equal(newBody);
    });
    it("shouldn't edit post, not existing postId", async () => {
      const response = await global.api
        .put(`/posts/${createdPost.id + 100}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: newTitle,
          body: newBody,
        })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
    it("shouldn't edit post, body empty", async () => {
      const response = await global.api
        .put(`/posts/${createdPost.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: newTitle,
          body: "",
        })
        .expect(500);

      expect(response.status).to.be.equal(500);
    });
    it("shouldn't edit post, no token", async () => {
      const response = await global.api
        .put(`/posts/${createdPost.id}`)
        .send({
          title: newTitle,
          body: newBody,
        })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
    it("shouldn't edit post, not an owner", async () => {
      const response = await global.api
        .put(`/posts/1`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: newTitle,
          body: newBody,
        })
        .expect(401);

      expect(response.status).to.be.equal(401);
    });
  });

  describe("DEL /posts/:postId", async function () {
    it("should delete post", async function () {
      const resp = await global.api
        .del(`/posts/${createdPost.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      expect(resp.status).to.be.equal(200);
    });
    it("should not delete post by not existing id", async function () {
      const resp = await global.api
        .del(`/posts/${createdPost.id + 100}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
    it("should not delete post that you don't own", async function () {
      const resp = await global.api
        .del(`/posts/1`)
        .set("Authorization", `Bearer ${token}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
    it("should not delete post, no token", async function () {
      const resp = await global.api
        .del(`/posts/${createdPost.id + 10}`)
        .expect(401);
      expect(resp.status).to.be.equal(401);
    });
  });
});
