import { Queue } from "bullmq";
import connection from "./connection";

const imageProcessingQueue = new Queue("imageProcessing", { connection });

export default imageProcessingQueue;
