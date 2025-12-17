import express from "express";
import upload from "../../middlewares/upload.js"; // multer
import { submitApplyForm, fetchAllApplyForms } from "../controllers/applyForm.controller.js";

const router = express.Router();

router.post("/apply", upload.single("file"), submitApplyForm);
router.get("/apply-form", fetchAllApplyForms);


export default router;
