import app from "./app";
import { env } from "./config";

app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT}`);
});
