import request from "supertest";
import app from "../src/app";
import { emailQueue, imageProcessingQueue } from "../src/queues";

describe("GET /", () => {

  afterAll(async () => {
    await emailQueue.close()
    await imageProcessingQueue.close()
  })

  it("should respond with 'Express + TypeScript Server'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Express + TypeScript Server");
  });
});
