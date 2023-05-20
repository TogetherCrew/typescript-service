import supertest from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import Post from "../../src/models/post.model";
import { env } from "../../src/config";

beforeEach(async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URL);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("/posts routes", () => {
  test("GET /posts", async () => {
    const post = await Post.create({
      title: "Post 1",
      content: "Lorem ipsum",
    });

    const res = await supertest(app).get("/posts").expect(200);

    expect(res.body.length).toEqual(1);
    expect(res.body[0]._id).toBe(post.id);
    expect(res.body[0].title).toBe(post.title);
    expect(res.body[0].content).toBe(post.content);
  });
});
