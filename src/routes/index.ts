import express from "express";
import jobsRoute from "./jobs.route"
import postsRoute from "./posts.route"

const router = express.Router();

router.use("/jobs", jobsRoute)
router.use("/posts", postsRoute)

export default router