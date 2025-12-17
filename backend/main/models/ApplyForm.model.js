import mongoose from "mongoose";

const applyFormSchema = new mongoose.Schema({
  founderName: String,
  startupName: String,
  email: String,
  contact: String,
  city: String,
  stage: String,
  category: String,
  sectors: [String],
  website: String,
  description: String,
  referral: String,
  fileUrl: String, // Cloudinary URL
}, { timestamps: true });

export default mongoose.model("ApplyForm", applyFormSchema);
