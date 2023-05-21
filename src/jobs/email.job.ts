/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Job } from "bullmq";

const emailJob = async (job: Job): Promise<void> => {
  // Define the processing logic for email jobs
  const { to, subject, body } = job.data; // Assuming the job data contains the recipient, subject, and body of the email

  try {
    // Perform email processing logic here
    console.log(`Sending email to ${to}: ${subject}`);
    console.log("Body:", body);

    // Simulating email sending time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error processing email:", error);
    throw new Error("Failed to process email"); // Throw an error if email processing fails
  }
};

export default emailJob;
