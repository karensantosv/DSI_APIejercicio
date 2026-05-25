import { describe, test, expect, beforeEach } from 'vitest';
import request from "supertest";
import { app } from "../src/app.js";
import { defaultRouter } from "../src/routers/default.js";

describe("POST /random", () => {
  test("Should successfully create a new user", async () => {
    await request(app)
      .post("/random")
      .send()
      .expect(501);
  });
});