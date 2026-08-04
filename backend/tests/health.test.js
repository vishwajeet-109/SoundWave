// tests/integration/genre.test.js

import request from "supertest";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./setupTestDB.js";
import { buildTestApp, signTestToken } from "./testApp.js";
import genreRoutes from "../routes/genreRoutes.js";
import User from "../models/User.js";
import Genre from "../models/Genre.js";
import { ROLES } from "../constants/roles.js";
import { clearCache } from "../middleware/cacheMiddleware.js";

process.env.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "test-secret";

const app = buildTestApp({ "/api/v1/genres": genreRoutes });

const createUser = (role) =>
  User.create({
    name: "Test User",
    email: `${role.toLowerCase()}-${Date.now()}-${Math.random()}@test.com`,
    password: "hashedpassword",
    role,
    status: "ACTIVE",
  });

beforeAll(connectTestDB);
afterEach(async () => {
  await clearTestDB();
  clearCache();
});
afterAll(disconnectTestDB);

describe("GET /api/v1/genres", () => {
  test("Success: returns only ACTIVE genres, no auth required", async () => {
    await Genre.create([
      { name: "Pop", slug: "pop-1", status: "ACTIVE" },
      { name: "Archived Genre", slug: "archived-1", status: "INACTIVE" },
    ]);

    const res = await request(app).get("/api/v1/genres");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Pop");
  });
});

describe("POST /api/v1/genres", () => {
  test("Unauthorized: no token", async () => {
    const res = await request(app).post("/api/v1/genres").send({ name: "Rock" });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("Forbidden: USER role cannot create genres", async () => {
    const user = await createUser(ROLES.USER);
    const token = signTestToken(user._id, process.env.ACCESS_TOKEN_SECRET);

    const res = await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Rock" });

    expect(res.status).toBe(403);
  });

  test("Validation Error: missing name", async () => {
    const admin = await createUser(ROLES.ADMIN);
    const token = signTestToken(admin._id, process.env.ACCESS_TOKEN_SECRET);

    const res = await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(422);
  });

  test("Success: ADMIN creates a genre", async () => {
    const admin = await createUser(ROLES.ADMIN);
    const token = signTestToken(admin._id, process.env.ACCESS_TOKEN_SECRET);

    const res = await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Jazz" });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Jazz");
  });

  test("Conflict: duplicate genre name (case-insensitive)", async () => {
    const admin = await createUser(ROLES.ADMIN);
    const token = signTestToken(admin._id, process.env.ACCESS_TOKEN_SECRET);

    await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Blues" });

    const res = await request(app)
      .post("/api/v1/genres")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "blues" });

    expect(res.status).toBe(409);
  });
});
