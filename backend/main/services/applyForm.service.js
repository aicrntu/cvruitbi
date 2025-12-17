import ApplyForm from "../models/ApplyForm.model.js";

export const createApplyForm = async (data) => {
  return await ApplyForm.create(data);
};

export const getAllForms = async () => {
  return await ApplyForm.find().sort({ createdAt: -1 });
};

export const getFilteredForms = async (filters) => {
  return ApplyForm.find(filters).sort({ createdAt: -1 });
};
