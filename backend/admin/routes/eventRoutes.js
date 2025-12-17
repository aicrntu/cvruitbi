import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import { upload } from "../middlewares/upload.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyAdmin,
  upload.fields([
    { name: "title_img", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]),
  createEvent
);

router.get("/", getAllEvents);
router.get("/:id", getEventById);

router.put(
  "/update/:id",
  verifyAdmin,
  upload.fields([
    { name: "title_img", maxCount: 1 },
    { name: "images", maxCount: 10 }
  ]),
  updateEvent
);

router.delete("/delete/:id", verifyAdmin, deleteEvent);

export default router;
