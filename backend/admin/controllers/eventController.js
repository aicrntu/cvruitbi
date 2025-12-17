import Event from "../models/eventModel.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const data = req.body;

    // Handle images coming from multer
    if (req.files?.title_img?.[0]) {
      data.title_img = req.files.title_img[0].filename;
    }

    if (req.files?.images) {
      data.images = req.files.images.map((file) => file.filename);
    }

    const event = await Event.create(data);

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL EVENTS (search + date + pagination)
export const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 8, search = "", from = "", to = "" } = req.query;

    const query = {};

    // Search by event_name
    if (search) {
      query.event_name = { $regex: search, $options: "i" };
    }

    // Filter by date
    if (from && to) {
      query.event_date = { $gte: from, $lte: to };
    } else if (from) {
      query.event_date = { $gte: from };
    } else if (to) {
      query.event_date = { $lte: to };
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find(query).skip(skip).limit(Number(limit)).sort({ event_date: 1 }),

      Event.countDocuments(query),
    ]);

    return res.json({
      success: true,
      data: events,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    return res.json({ success: true, data: event });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    let updatedData = { ...req.body };

    // -------------------
    // Parse removed images
    // -------------------
    const removedImages = req.body.removed_images
      ? JSON.parse(req.body.removed_images)
      : [];

    // -------------------
    // TITLE IMAGE
    // -------------------
    if (req.files?.title_img?.[0]) {
      updatedData.title_img = req.files.title_img[0].filename;
    } else {
      updatedData.title_img = event.title_img; // keep old
    }

    // -------------------
    // IMAGES
    // -------------------
    // remove those images that user requested
    let oldImages = (event.images || []).filter(
      (img) => !removedImages.includes(img)
    );

    // add newly uploaded images
    let newImages = [];

    if (req.files?.images) {
      newImages = req.files.images.map((file) => file.filename);
    }

    updatedData.images = [...oldImages, ...newImages];

    // -------------------
    // Save
    // -------------------
    const updated = await Event.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.json({
      success: true,
      message: "Event updated successfully",
      data: updated,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });

    return res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
