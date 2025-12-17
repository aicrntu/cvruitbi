import mongoose from "mongoose";

const eventSchma = new mongoose.Schema({
  event_code: { type: String },
  event_name: { type: String },
  event_desc: { type: String },
  objective: { type: String },
  event_date: { type: String },
  venue: { type: String },
  key_speaker: { type: String },
  targeted_audience: { type: String },
  organizer: { type: String },
  title_img: { type: String },
  images: { type: [String] },
  isPress: { type: Number, default: 0 }
});

export default mongoose.model("Event", eventSchma);