import api from "../api/axios";

export const getMyTasks = (params) => {

  return api.get("/my-tasks", {
    params: {
      page: params.page,
      size: params.size,
      keyword: params.keyword,
      status: params.status,
      category: params.category,   
      sortBy: params.sortBy,
      direction: params.direction
    }
  });

};

export const getAllTasks = (page = 0, size = 10) => {
  return api.get("/tasks", {
    params: { page, size }
  });
};

export const createTask = (task) => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "ADMIN") {
    return api.post("/tasks", task);
  }

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

export const updateTask = (id, task) => {
  return api.put(`/my-tasks/${id}`, task);
};