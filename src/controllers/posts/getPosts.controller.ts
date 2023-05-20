import { type Request, type Response } from "express";
import Post from "../../models/post.model";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getPosts = async (_req: Request, res: Response) => {
  try {
    const query = Post.find({});
    const posts = await query.exec();
    res.send(posts);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default getPosts;
