/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { createJob, getJob } from "../controllers/jobs";

const router = express.Router();

router.post("/", createJob);
router.get("/:type/:jobId", getJob)

export default router;
