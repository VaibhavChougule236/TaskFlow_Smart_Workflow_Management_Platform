import { useEffect, useState } from "react";
import api from "../../api/axios";
import {deleteTask, toggleTaskDone } from "../../services/taskService";

import TaskList from "../../components/tasks/TaskList";
import AddTaskModal from "../../components/tasks/AddTaskModal";

function MyTasks() {

  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { page: 0, size: 10 }
      });

      setTasks(res.data.data.content);

    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTaskDone(id);
    fetchTasks();
  };

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          My Tasks
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Task
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <AddTaskModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onTaskCreated={fetchTasks}
      />

    </div>
  );
}

export default MyTasks;