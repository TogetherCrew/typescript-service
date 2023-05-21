/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { type Request, type Response } from "express";
import { type Queue } from "bullmq";
import { queueByName } from "../../../src/queues";
import createJob from "../../../src/controllers/jobs/createJob.controller";

console.error = jest.fn();

// Mock the queueByName function
jest.mock("../../../src/queues", () => ({
  queueByName: jest.fn(),
}));

// Mock the queue's add method
const addMock = jest.fn();

// Create a mock queue object
const queueMock = {
  add: addMock,
} as unknown as Queue;

describe("createJob", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {
        type: "email",
        data: { key: "value" },
      },
    } as Request;
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add the job to the appropriate queue and return the jobId", async () => {
    // Mock the queueByName function to return the queue
    (queueByName as jest.Mock).mockReturnValueOnce(queueMock);

    // Mock the queue's add method to return a job
    const jobId = "job123";
    const job = { id: jobId };
    addMock.mockResolvedValueOnce(job);

    await createJob(req, res);

    expect(queueByName).toHaveBeenCalledWith("email");
    expect(addMock).toHaveBeenCalledWith("email", { key: "value" });
    expect(res.json).toHaveBeenCalledWith({ jobId });
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should handle error when queueByName throws an error", async () => {
    const error = new Error("No Queue called unknownQueue");

    // Mock the queueByName function to throw an error
    (queueByName as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    await createJob(req, res);

    expect(queueByName).toHaveBeenCalledWith("email");
    expect(addMock).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error });
    expect(console.error).toHaveBeenCalled();
  });

  it("should handle error when the queue's add method throws an error", async () => {
    const error = new Error("Failed to add job");
    addMock.mockRejectedValueOnce(error);

    // Mock the queueByName function to return the queue
    (queueByName as jest.Mock).mockReturnValueOnce(queueMock);

    await createJob(req, res);

    expect(queueByName).toHaveBeenCalledWith("email");
    expect(addMock).toHaveBeenCalledWith("email", { key: "value" });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to create job" });
    expect(console.error).toHaveBeenCalledWith("Error creating job:", error);
  });
});
