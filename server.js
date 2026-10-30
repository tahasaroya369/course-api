
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);

// Test course route
app.get("/test-course", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Course route is working!"
  });
});

// Test category route
app.get("/test-category", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Category route is working!"
  });
});

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Course API is running!"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.originalUrl
  });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
      console.log("Authentication routes loaded!");
      console.log("Category routes loaded!");
      console.log("Course routes loaded!");
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
}

startServer();
