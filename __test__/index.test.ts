/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";
import app from "../src/app";
import "../src/workers";

// Mock console.error and console.log
console.error = jest.fn();
console.log = jest.fn();

// Mock mongoose.connect and app.listen
jest.mock("mongoose", () => ({
  set: jest.fn(),
  connect: jest.fn(),
}));
jest.mock("../src/app", () => ({
  listen: jest.fn(),
}));
jest.mock("../src/config", () => ({
  env: {
    MONGODB_URL: "mocked-mongodb-url",
    PORT: 3000,
  },
}));
jest.mock("../src/workers");

describe("main", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to MongoDB and start the server", async () => {
    await expect(require("../src/index").main()).resolves.not.toThrow();

    expect(mongoose.set).toHaveBeenCalledWith("strictQuery", true);
    expect(mongoose.connect).toHaveBeenCalledWith("mocked-mongodb-url");
    expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
    expect(console.error).not.toHaveBeenCalled();
  });

  it("should handle errors and log them", async () => {
    const error = new Error("Connection failed");
    mongoose.connect = jest.fn().mockRejectedValueOnce(error);
    await expect(require("../src/index").main()).rejects.toThrow(error);

    expect(mongoose.connect).toHaveBeenCalledWith("mocked-mongodb-url");
    expect(app.listen).not.toHaveBeenCalled();
    expect(console.log).not.toHaveBeenCalled();
  });
});
