import axiosClient from "./axiosClient";

export const sendContactForm = async (payload) => {
  return axiosClient.post("/contact", payload);
};
