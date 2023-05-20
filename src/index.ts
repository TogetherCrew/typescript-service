import mongoose from "mongoose";
import app from "./app";
import { env } from "./config";

mongoose.set('strictQuery', true)

main().catch(err => { console.error(err) })

async function main (): Promise<void> {
  await mongoose.connect(env.MONGODB_URL)
  app.listen(env.PORT, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`)
  })
}