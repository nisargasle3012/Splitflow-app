// api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true;

      // hard reset auth state
      window.location.href = "/users/login";
    }

    return Promise.reject(error);
  }
);

export default api;
