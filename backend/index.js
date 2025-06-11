import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"

// Configure dotenv to load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, ".env") })

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// Set security-related HTTP response headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.pexels.com https://localhost:3000;"
  );
  next();
});

// Enable CORS for frontend (Replace with your frontend URL)
app.use(
  cors({
    origin: "http://localhost:5173", //frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow CRUD operations
    credentials: true, // Allow cookies & authorization headers
  })
)

app.use(cookieParser())

// for allowing json object in req body
app.use(express.json())

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/travel-story", travelStoryRoutes)

// server static files from the uploads and assets directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/assets", express.static(path.join(__dirname, "assets")))

// Add this before your error handler middleware
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Travel Diary API Server", 
    endpoints: ["/api/auth", "/api/user", "/api/travel-story"] 
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
