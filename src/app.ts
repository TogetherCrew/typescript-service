import express, { type Express, type Request, type Response } from "express";
import routes from "./routes";

const app: Express = express();
app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
