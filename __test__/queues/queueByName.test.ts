import emailQueue from "../../src/queues/email.queue";
import imageProcessingQueue from "../../src/queues/imageProcessing.queue";
import queueByName from "../../src/queues/queueByName";

describe("queueByName", () => {

  afterAll(async () => {
    await emailQueue.close()
    await imageProcessingQueue.close()
  })

  it("should return emailQueue for name 'email'", () => {
    expect(queueByName("email")).toBe(emailQueue);
  });

  it("should return imageProcessingQueue for name 'imageProcessing'", () => {
    expect(queueByName("imageProcessing")).toBe(imageProcessingQueue);
  });

  it("should throw an error for unknown queue name", () => {
    const unknownName = "unknownQueue";
    const expectedErrorMessage = `No Queue called ${unknownName}`;
    expect(() => queueByName(unknownName)).toThrowError(expectedErrorMessage);
  });
});
