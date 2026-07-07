import express from "express";
import { getDashboardStats,getRecentActivities,getBookingAnalytics} from "../controllers/ownerDashboardController.js";

import {protect} from "../middleware/auth.js";
import { ownerOnly } from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

router.get("/stats",protect,ownerOnly,getDashboardStats);

router.get("/activities",protect,ownerOnly,getRecentActivities);

router.get("/analytics",protect,ownerOnly,getBookingAnalytics);

export default router;