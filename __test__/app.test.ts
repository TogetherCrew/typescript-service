import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
  it("should respond with 'Express + TypeScript Server'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Express + TypeScript Server");
  });
});
