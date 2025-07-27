import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is a response with a data object, use that
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    // Otherwise, create a generic error object
    return Promise.reject({
      message: error.message || "An unknown error occurred",
    });
  },
);

export default api;
