// import authenticateUser from "../middlewares/auth.js";

import express from "express";
import {
  createJob,
  getAllJob,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobsController.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/stats", showStats);
router.get("/all-jobs", getAllJob);
router.delete("/delete-job/:id", deleteJob);
router.get("/get-single-job/:id", getSingleJob);
router.patch("/update-job/:id", updateJob);

export default router;
