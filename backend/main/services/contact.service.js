import Contact from "../models/Contact.model.js";

export const createContact = async (data) => {
  return await Contact.create(data);
};

export const getAllContact = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};
