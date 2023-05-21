/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Worker } from 'bullmq';
import { emailQueue } from '../queues'; // Assuming you have already defined the emailQueue
import connection from '../queues/connection';

// Create a new BullMQ worker instance for emailQueue
const emailWorker = new Worker(emailQueue.name, async (job) => {
  // Define the processing logic for email jobs
  const { to, subject, body } = job.data; // Assuming the job data contains the recipient, subject, and body of the email

  try {
    // Perform email processing logic here
    console.log(`Sending email to ${to}: ${subject}`);
    console.log('Body:', body);

    // Simulating email sending time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error processing email:', error);
    throw new Error('Failed to process email'); // Throw an error if email processing fails
  }
}, { connection });

emailWorker.on('failed', (job, err) => {
  if (job !== undefined) {
    console.error(`Job ${job.id} failed with error:`, err);
  } else {
    console.error('The job was undefined.')
  }
});

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on('error', (error) => {
  console.error('Worker error:', error);
});

export default emailWorker