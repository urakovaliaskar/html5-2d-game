import supertest from "supertest";
const defaults = require("superagent-defaults");
const app = require("../app");

const request = defaults(supertest(app));

let token = "";
let user = {};

describe("Authorization Endpoint", () => {
  it("should authorize the user", async (done) => {
    try {
      const res = await request.post("/api/users/login").send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
      });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty(
        "message",
        "Authentication is successful!"
      );
      token = res.body.token;
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe("Get Users Endpoint", () => {
  it("should get an array of users", async (done) => {
    try {
      const res = await request
        .get("/api/users")
        .set({ Authorization: `Bearer ${token}` });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("users");
      expect(Array.isArray(res.body.users)).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe("Create User Endpoint", () => {
  it("should create a new user", async (done) => {
    try {
      const email = `${Math.random().toString(36).substring(7)}@test.com`;
      const res = await request
        .post("/api/users")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          email,
          password: "Jest123456789",
        });

      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("message", "User created successfuly!");
      expect(res.body.user).toHaveProperty("email", email);

      user = res.body.user;
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe("Get User Endpoint", () => {
  it("should get the user", async (done) => {
    const id = user.id;
    try {
      const res = await request
        .get("/api/users/" + id)
        .set({ Authorization: `Bearer ${token}` });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id", id);
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe("Update User Endpoint", () => {
  it("should update the user", async (done) => {
    const id = user.id;
    const email = `${Math.random().toString(36).substring(7)}@test.com`;
    try {
      const res = await request
        .put("/api/users/" + id)
        .set({ Authorization: `Bearer ${token}` })
        .send({ email });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        "User was updated successfuly"
      );
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id", id);
      user = res.body.user;
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe("Delete User Endpoint", () => {
  it("should delete the user", async (done) => {
    const id = user.id;
    const email = `${Math.random().toString(36).substring(7)}@test.com`;
    try {
      const res = await request
        .delete("/api/users/" + id)
        .set({ Authorization: `Bearer ${token}` });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body).toHaveProperty(
        "message",
        "User was deleted successfuly"
      );
      user = {};
      done();
    } catch (error) {
      done(error);
    }
  });
});
