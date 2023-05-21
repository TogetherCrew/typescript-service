import { type Job } from 'bullmq';
import emailJob from '../../src/jobs/email.job';

describe('emailJob', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    consoleErrorSpy = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should process email job successfully', async () => {
    const jobData = {
      to: 'example@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
    };

    const job: Partial<Job> = {
      id: 'jobId',
      data: jobData,
      name: 'emailJob',
    };

    await emailJob(job as Job);

    expect(consoleLogSpy).toHaveBeenCalledWith(`Sending email to ${jobData.to}: ${jobData.subject}`);
    expect(consoleLogSpy).toHaveBeenCalledWith('Body:', jobData.body);
    expect(consoleLogSpy).toHaveBeenCalledWith('Email sent successfully');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

});
