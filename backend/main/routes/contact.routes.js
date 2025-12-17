import express from "express";
import { submitContact, fetchAllContacts } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contact", submitContact);
router.get("/contact", fetchAllContacts);

export default router;
