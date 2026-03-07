import api from "../api/axios";

// GET tasks with pagination / filter
export const getTasks = (params) => {
  return api.get("/tasks", { params });
};

// CREATE new task
export const createTask = (data) => {
  return api.post("/tasks", data);
};

// TOGGLE task done / pending
export const updateTaskStatus = (id) => {
  return api.patch(`/tasks/${id}/done`);
};

// DELETE task
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

// UPDATE task
export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};