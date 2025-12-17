import axiosClient from "./axiosClient";

export const submitApplyForm = async (formData) => {
  return axiosClient.post("/apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
