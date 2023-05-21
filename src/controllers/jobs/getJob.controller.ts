/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from "express";
import { Job, type Queue } from "bullmq";
import { queueByName } from "../../queues";

const getJob = async function (req: Request, res: Response) {
  try {
    const { type, jobId } = req.params; // Assuming the jobId is passed as a route parameter

    let queue: Queue
    try {
      queue = queueByName(type)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error });
    }

    // Fetch the job by its id
    const job = await Job.fromId(queue, jobId);

    if (job == null) {
      return res.status(404).json({ error: 'Job not found' });
    }

    return res.json({
      id: job.id,
      name: job.name,
      status: await job.getState(),
      progress: job.progress,
      data: job.data,
    });
  } catch (error) {
    console.error('Error getting job status:', error);
    return res.status(500).json({ error: 'Failed to get job status' });
  }
}

export default getJob