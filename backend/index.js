import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.routes.js"
dotenv.config()
// Fix: Use MONGODB_URI instead of MONGO_URI to match your .env file
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })
const app = express()
// Enhanced CORS configuration with logging
app.use(
  cors({
    origin: (origin, callback) => {
      console.log('CORS request from origin:', origin);
      const allowedOrigins = [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "http://127.0.0.1:5173", 
        "http://127.0.0.1:5174"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked for origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
)

// Handle preflight requests
app.options('*', cors())

app.use(cookieParser())

// Remove CSP headers from backend
// CSP should be handled by your frontend, not backend API

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// for allowing json object in req body
app.use(express.json())
// Fix: Define routes BEFORE starting the server
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
// Add a test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" })
})
// Add root route to handle GET /
app.get("/", (req, res) => {
  res.json({ 
    message: "Travel Diary API Server", 
    status: "Running",
    endpoints: {
      auth: "/api/auth",
      user: "/api/user", 
      travelStory: "/api/travel-story",
      test: "/api/test"
    }
  })
})
// Handle favicon requests - return 204 No Content  
app.get("/favicon.ico", (req, res) => {
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(204).end();
})

// server static files from the uploads and assets directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/assets", express.static(path.join(__dirname, "assets")))

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

// Fix: Start server AFTER all middleware and routes are defined
app.listen(3000, () => {
  console.log("✅ Server is running at: http://localhost:3000");
});
