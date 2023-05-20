import { type Request, type Response } from "express";
import Post from "../../../src/models/post.model";
import { getPosts } from "../../../src/controllers/posts";

// Mocking the Post model
jest.mock("../../../src/models/post.model", () => ({
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
}));

describe("post controller", () => {
  describe("getPosts", () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
      res = {
        send: jest.fn(),
        sendStatus: jest.fn(),
      } as unknown as Response;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should retrieve and send posts", async () => {
      const posts = [{ title: "Post 1" }, { title: "Post 2" }];

      // Mocking the Post.find().exec() method to return posts
      (Post.find().exec as jest.Mock).mockResolvedValue(posts);

      await getPosts(req, res);

      expect(res.send).toHaveBeenCalledWith(posts);
      expect(res.sendStatus).not.toHaveBeenCalled();
    });

    test("should send 500 status on error", async () => {
      const errorMessage = "Internal server error";

      // Mocking the Post.find().exec() method to throw an error
      (Post.find().exec as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await getPosts(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(500);
      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
