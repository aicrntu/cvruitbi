import multer from "multer";
import path from "path";

// Helper: make string URL-safe
function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")   // replace special chars with -
    .replace(/^-+|-+$/g, "");      // trim - at start and end
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {

    // get event name from body if exists
    const eventName = req.body.event_name || "file";

    // get extension
    const ext = path.extname(file.originalname);

    // make filename
    const fileName = `${Date.now()}-${slugify(eventName)}${ext}`;

    cb(null, fileName);
  }
});

export default multer({ storage });
