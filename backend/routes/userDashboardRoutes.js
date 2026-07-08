import express from "express";
import { getUserDashboard } from "../controllers/userDashboardController.js";
import { userOnly} from "../middleware/roleCheckMiddleware.js";
import {protect} from "../middleware/auth.js";

const router = express.Router();

router.get("/stats",protect, userOnly, getUserDashboard);

export default router;