import { createApplyForm, getAllForms, getFilteredForms} from "../services/applyForm.service.js";

export const submitApplyForm = async (req, res) => {
  try {
    const fileUrl = req.file ? req.file.path : null;

    const saved = await createApplyForm({
      ...req.body,
      fileUrl,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchAllApplyForms = async (req, res) => {
  
  try {
    const { stage, year } = req.query;

    let filters = {};

    if (stage) {
      filters.stage = { $regex: new RegExp(`^${stage}$`, "i") };
    }

    // Year filter using $expr
    if (year) {
      filters.$expr = {
        $eq: [{ $year: "$createdAt" }, Number(year)],
      };
    }

    const forms = await getFilteredForms(filters);

    res.status(200).json({
      success: true,
      message: "Filtered apply forms fetched successfully.",
      data: forms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
