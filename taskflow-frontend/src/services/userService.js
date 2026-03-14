import api from "../api/axios";

export const getProfile = () => {
  return api.get("/users/me");
};

export const updateProfile = (formData) => {
  return api.put("/users/update-profile", formData);
};
export const deleteAccount = async () => {
  const res = await api.delete("/users/delete-account");
  return res.data;
};

export const changePassword = (data) => {
  return api.post("/users/change-password", data);
};


export const resetPassword = (token, password) => {
  return api.post(`/auth/reset-password/${token}`, { password });
};