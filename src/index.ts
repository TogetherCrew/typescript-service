import app from "./app";
import { env } from "./config";

app.listen(env.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`);
});
