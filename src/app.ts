import express, { type Express, type Request, type Response } from "express";
import postsRoute from "./routes/posts.route";

const app: Express = express();

app.use("/posts", postsRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
