import { type Job } from 'bullmq';
import imageProcessingJob from '../../src/jobs/imageProcessing.job';

describe('imageProcessingJob', () => {
  it('should process the image successfully', async () => {
    const imageUrl = 'https://example.com/image.jpg';
    const jobData = { imageUrl };
    const job: Partial<Job> = {
      id: 'job-id',
      name: 'image-processing',
      data: jobData,
      // Mock other attributes as needed
    };

    await expect(imageProcessingJob(job as Job)).resolves.toBeUndefined();
  });
});
