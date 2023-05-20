import Post from "../../src/models/post.model";

describe("Post model", () => {
  describe("validation", () => {
    test("should validate a post", async function () {
      await expect(
        new Post({
          title: "Lorem ipsum",
          content: "Lorem ipsum",
        }).validate()
      ).resolves.toBeUndefined();
    });
    test("should have a title", async () => {
      await expect(
        new Post({ title: undefined, content: "" }).validate()
      ).rejects.toThrow();
    });
    test("should have content", async () => {
      await expect(
        new Post({ title: "", content: undefined }).validate()
      ).rejects.toThrow();
    });
  });
});
