import express from "express";
import { signin, signup, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/update-user", authenticateUser, updateUser);

export default router;
