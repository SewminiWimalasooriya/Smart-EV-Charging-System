import express from "express";
import {getAdminOverview} from "../controllers/adminDashboardController.js"
import {protect} from "../middleware/auth.js";
import {adminOnly} from "../middleware/adminMiddleware.js";


const router = express.Router();


router.get("/overview",protect,adminOnly,  getAdminOverview);



export default router;