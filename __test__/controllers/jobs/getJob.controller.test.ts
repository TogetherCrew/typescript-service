/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response } from "express";
import { Job, type Queue } from "bullmq";
import { queueByName } from "../../../src/queues";
import getJob from "../../../src/controllers/jobs/getJob.controller";

// Mock the queueByName function
jest.mock("../../../src/queues", () => ({
  queueByName: jest.fn(),
}));

// Mock the Job class
jest.mock("bullmq", () => ({
  Job: {
    fromId: jest.fn(),
  },
}));

describe("getJob", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      params: {}
    } as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return job details if job exists", async () => {
    const jobId = "job123";
    const queue = {} as Queue;
    const job = {
      id: jobId,
      name: "Test Job",
      getState: jest.fn().mockResolvedValue("completed"),
      progress: 100,
      data: { key: "value" },
    } as unknown as Job;

    // Mock the queueByName function to return the queue
    (queueByName as jest.Mock).mockReturnValueOnce(queue);

    // Mock the Job.fromId function to return the job
    (Job.fromId as jest.Mock).mockResolvedValueOnce(job);

    await getJob(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: job.id,
      name: job.name,
      status: "completed",
      progress: job.progress,
      data: job.data,
    });
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 404 error if job does not exist", async () => {
    const queue = {} as Queue;

    // Mock the queueByName function to return the queue
    (queueByName as jest.Mock).mockReturnValueOnce(queue);

    // Mock the Job.fromId function to return null
    (Job.fromId as jest.Mock).mockResolvedValueOnce(null);

    await getJob(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Job not found" });
  });

  it("should handle error when queueByName throws an error", async () => {
    const error = new Error("No Queue called unknownQueue");

    // Mock the queueByName function to throw an error
    (queueByName as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    await getJob(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error });
  });

  it("should handle error when Job.fromId throws an error", async () => {
    const queue = {} as Queue;
    const error = new Error("Failed to fetch job");

    // Mock the queueByName function to return the queue
    (queueByName as jest.Mock).mockReturnValueOnce(queue);

    // Mock the Job.fromId function to throw an error
    (Job.fromId as jest.Mock).mockRejectedValueOnce(error);

    await getJob(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to get job status" });
  });
});
