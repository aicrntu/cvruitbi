import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/dbConfig.js";
import path from "path";
import express from "express";

// Connect DB
await connectDB();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle system errors
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION");
  console.error(err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION");
  console.error(err);
  process.exit(1);
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
