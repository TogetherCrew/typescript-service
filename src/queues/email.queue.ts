import { Queue } from "bullmq";
import connection from "./connection";

const emailQueue = new Queue("email", { connection });

export default emailQueue;
