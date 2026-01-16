import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import travelStoryRouter from "./routes/travelStory.route.js";

dotenv.config();

/* -------------------- PATH SETUP -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- DB CONNECTION -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* -------------------- APP INIT -------------------- */
const app = express();
const PORT = process.env.PORT || 3000;

/* -------------------- CORS CONFIG -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "http://memories-of-miles-frontend.s3-website.ap-south-1.amazonaws.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, health checks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ VERY IMPORTANT: handle preflight requests
app.options("*", cors());

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.status(200).send(`Server is running on port ${PORT}`);
});

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/travel-story", travelStoryRouter);

/* -------------------- ERROR HANDLER  -------------------- */
app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

/* -------------------- SERVER START WITH PM2  -------------------- */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT} 🎉`);
});