import api from "../api/axios";

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const sendOtp = async (email) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data; 
};

export const forgotPassword = async (email) => {
  return await api.post("/auth/forgot-password", { email });
};

export const resetPasswordWithToken = async (token, newPassword) => {
  return await api.post("/auth/reset-password", { token, newPassword });
};

export const verifyOtp = async (email, otp) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data; 
};