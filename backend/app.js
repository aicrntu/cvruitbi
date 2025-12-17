import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import contactRoutes from "./main/routes/contact.routes.js";
import applyRoutes from "./main/routes/applyForm.routes.js";

import adminRoutes from "./admin/routes/adminRoutes.js";
import eventRoutes from "./admin/routes/eventRoutes.js";

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Main routes
app.use("/api", contactRoutes);
app.use("/api", applyRoutes);

// Admin & event routes
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);

export default app;
