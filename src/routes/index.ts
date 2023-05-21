import express from "express";
import jobsRoute from "./jobs.route";
import postsRoute from "./posts.route";
import serverAdapter from "./bull-board";

const router = express.Router();

router.use("/jobs", jobsRoute);
router.use("/posts", postsRoute);
router.use("/admin/queues", serverAdapter.getRouter())

export default router;
