import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "User alresdy exists" });

    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hash });

    return res.json({ message: "Admin register successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Compare password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send success response
    return res.json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
