import { get } from "mongoose";
import { createContact, getAllContact } from "../services/contact.service.js";

export const submitContact = async (req, res) => {
  try {
    const saved = await createContact(req.body);
    res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContact();
    res.status(200).json({
      success: true,
      message: "Contacts fetched successfully.",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
