/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api"
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { emailQueue, imageProcessingQueue } from "../queues"

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(emailQueue), new BullMQAdapter(imageProcessingQueue)],
  serverAdapter,
});

export default serverAdapter