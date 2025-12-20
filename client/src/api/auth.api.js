// import api from "./axios";

// export const loginApi = (data) => api.post("/api/users/login", data);
// export const registerApi = (data) => api.post("/api/users/register", data);
// export const getMeApi = () => api.get("/api/users/me");
// export const logoutApi = () => api.post("/api/users/logout");

// api/auth.api.js
import api from "./client";

export const registerApi = (data) => {
  return api.post("/api/users/register", data);
};

export const loginApi = (data) => {
  return api.post("/api/users/login", data);
};

export const logoutApi = () => {
  return api.post("/api/users/logout");
};



