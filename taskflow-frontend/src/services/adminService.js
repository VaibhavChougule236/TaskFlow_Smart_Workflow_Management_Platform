import api from "../api/axios";

export const getAdminStats = () => {
  return api.get("/admin/dashboard");
};

export const getUsers = (page = 0, size = 20) => {
  return api.get("/admin/users", {
    params: { page, size }
  });
};

export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`);
};