import { Worker } from 'bullmq'
import { emailQueue } from '../../src/queues';
import connection from '../../src/queues/connection';

jest.mock('bullmq', () => ({
  ...jest.requireActual("bullmq"),
  Worker: jest.fn().mockImplementation((queueName, processingFunction, options) => {
    const workerMock = {
      on: jest.fn(),
    };
    return workerMock;
  }),
}));

describe('email.worker', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new BullMQ worker for emailQueue', async () => {
    require('../../src/workers/email.worker')
    expect(Worker).toHaveBeenCalledWith(
      emailQueue.name,
      expect.any(Function),
      { connection }
    );
  });
});
