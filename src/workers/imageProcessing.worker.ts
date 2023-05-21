/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Worker } from "bullmq";
import { imageProcessingQueue } from "../queues"; // Assuming you have already defined the imageProcessingQueue
import connection from "../queues/connection";
import imageProcessingJob from "../jobs/imageProcessing.job";

// Create a new BullMQ worker instance for imageProcessingQueue
const imageProcessingWorker = new Worker(
  imageProcessingQueue.name,
  imageProcessingJob,
  { connection }
);

export default imageProcessingWorker;
