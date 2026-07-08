import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

import {protect} from "../middleware/auth.js";

const router = express.Router();

// get all notifications
router.get("/", protect, getNotifications);

// mark one as read
router.put("/:id/read", protect, markAsRead);


export default router;