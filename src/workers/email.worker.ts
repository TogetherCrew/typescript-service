/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Worker } from "bullmq";
import { emailQueue } from "../queues"; // Assuming you have already defined the emailQueue
import connection from "../queues/connection";
import emailJob from "../jobs/email.job";

// Create a new BullMQ worker instance for emailQueue
const emailWorker = new Worker(emailQueue.name, emailJob, { connection });

export default emailWorker;
