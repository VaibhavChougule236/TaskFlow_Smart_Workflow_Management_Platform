import api from "../api/axios";

export const getProfile = () => {
  return api.get("/users/me");
};


export const updateProfile = (data) => {
  return api.put("/users/update-profile", data);
};

export const changePassword = (data) => {
  return api.post("/users/change-password", data);
};

export const forgotPassword = (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPassword = (token, password) => {
  return api.post(`/auth/reset-password/${token}`, { password });
};