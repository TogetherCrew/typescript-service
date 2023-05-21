/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Worker } from 'bullmq';
import { imageProcessingQueue } from '../queues'; // Assuming you have already defined the imageProcessingQueue
import connection from '../queues/connection';

// Create a new BullMQ worker instance for imageProcessingQueue
const imageProcessingWorker = new Worker(imageProcessingQueue.name, async (job) => {
  // Define the processing logic for image processing jobs
  const { imageUrl } = job.data; // Assuming the job data contains the URL of the image to be processed

  try {
    // Perform image processing logic here
    console.log(`Processing image: ${imageUrl}`);

    // Simulating image processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Image processing completed');
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image'); // Throw an error if image processing fails
  }
}, { connection });

imageProcessingWorker.on('failed', (job, err) => {
  if (job !== undefined) {
    console.error(`Job ${job.id} failed with error:`, err);
  } else {
    console.error('The job was undefined.')
  }
});

imageProcessingWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

imageProcessingWorker.on('error', (error) => {
  console.error('Worker error:', error);
});

export default imageProcessingWorker