import { type Job } from "bullmq";

/* eslint-disable @typescript-eslint/restrict-template-expressions */
const imageProcessingJob = async function (job: Job): Promise<void> {
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
}

export default imageProcessingJob