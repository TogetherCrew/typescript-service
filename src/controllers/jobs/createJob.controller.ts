import { type Request, type Response } from "express";
import { type Queue } from "bullmq";
import { queueByName } from "../../queues";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const createJob = async function (req: Request, res: Response) {
  try {
    const { type, data } = req.body; // Assuming you send the job type and data in the request body

    let queue: Queue;
    try {
      queue = queueByName(type);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }

    const job = await queue.add(type, data); // Add the job to the appropriate queue

    return res.json({ jobId: job.id });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Failed to create job" });
  }
};

export default createJob;
