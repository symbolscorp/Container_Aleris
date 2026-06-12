import axios from "axios";
import.meta.env.VITE_API_URL
const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
  //baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Error de conexión con el servidor";
    return Promise.reject(new Error(message));
  }
);

export default api;
