import { type Queue } from "bullmq";
import emailQueue from "./email.queue";
import imageProcessingQueue from "./imageProcessing.queue";

const queueByName = (name: string): Queue => {
  switch (name) {
    case emailQueue.name:
      return emailQueue;
    case imageProcessingQueue.name:
      return imageProcessingQueue;
    default:
      throw new Error(`No Queue called ${name}`);
  }
};

export default queueByName;
