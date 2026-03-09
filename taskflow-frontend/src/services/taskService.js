import api from "../api/axios";

export const getMyTasks = (page = 0, size = 10) => {
  return api.get("/my-tasks", {
    params: { page, size }
  });
};

export const getAllTasks = (page = 0, size = 10) => {
  return api.get("/tasks", {
    params: { page, size }
  });
};

export const createTask = (task) => {
  return api.post("/my-tasks", task);
};

export const toggleTaskDone = (id) => {
  return api.patch(`/my-tasks/${id}/done`);
};

export const deleteTask = (id) => {
  return api.delete(`/my-tasks/${id}`);
};

export const createAdminTask = (task) => {
  return api.post("/tasks", task);
};