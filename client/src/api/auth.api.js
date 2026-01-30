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

export const getMeApi = () => {
  return api.get("/api/users/me");
};



