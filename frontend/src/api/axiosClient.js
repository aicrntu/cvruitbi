import axios from "axios";

const axiosClient = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error handler
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default axiosClient;
