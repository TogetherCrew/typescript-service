import { type RedisOptions } from "bullmq";
import { env } from "../config";

const connection: RedisOptions = {
  host: env.REDIS_QUEUE_HOST,
  port: env.REDIS_QUEUE_PORT,
};

export default connection;
