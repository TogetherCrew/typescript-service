/* eslint-disable @typescript-eslint/restrict-template-expressions */
import mongoose from "mongoose";
import app from "./app";
import { env } from "./config";
import './workers'

mongoose.set("strictQuery", true);

main().catch((err) => {
  console.error(err);
});

export async function main(): Promise<void> {
  await mongoose.connect(env.MONGODB_URL);
  app.listen(env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${env.PORT}`
    );
  });
}
