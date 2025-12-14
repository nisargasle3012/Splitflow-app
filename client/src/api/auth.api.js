import api from "./client";

export const loginApi = (data) => api.post("/users/login", data);

export const signupApi = (data) => api.post("/users/register", data);

export const getMeApi = () => api.get("/user/me");
