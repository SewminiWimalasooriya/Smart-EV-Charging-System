import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; 
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import apartmentRequestRoutes from "./routes/apartmentRequestRoutes.js";
import adminAuthRoutes from './routes/adminAuthRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/uploads", express.static("uploads"));

//routes
app.use('/api/auth',authRoutes);
app.use('/api/apartment', apartmentRequestRoutes);

//slote manage
app.use('/api/slot', slotRoutes);
app.use('/api/user',bookingRoutes);
app.use('/api/notification',notificationRoutes);

//admin routes
app.use('/api/auth/admin',adminAuthRoutes);


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
