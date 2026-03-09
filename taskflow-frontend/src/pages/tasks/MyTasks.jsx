import { useEffect, useState } from "react";
import {
  getMyTasks,
  deleteTask,
  toggleTaskDone
} from "../../services/taskService";

import TaskList from "../../components/tasks/TaskList";
import AddTaskModal from "../../components/tasks/AddTaskModal";

import { success, error } from "../../utils/toast";

function MyTasks() {

  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");

  const [sortBy, setSortBy] = useState("dueDate");
  const [direction, setDirection] = useState("asc");

  const [editingTask, setEditingTask] = useState(null);

  /* Fetch Tasks */

  const fetchTasks = async () => {

    setLoading(true);

    try {

      const res = await getMyTasks({
        page,
        size: 10,
        keyword,
        sortBy,
        direction
      });

      const data = res.data.data;

      setTasks(data.content);
      setTotalPages(data.totalPages);

    } catch (err) {

      console.error(err);
      error("Failed to load tasks");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchTasks();
  }, [page, keyword, sortBy, direction]);

  /* Delete */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {

      await deleteTask(id);

      success("Task deleted");

      fetchTasks();

    } catch (err) {

      console.error(err);
      error("Delete failed");

    }

  };

  /* Toggle Done */

  const handleToggle = async (id) => {

    try {

      await toggleTaskDone(id);

      fetchTasks();

    } catch {

      error("Failed to update task");

    }

  };

  /* Edit */

  const handleEdit = (task) => {

    setEditingTask(task);
    setOpenModal(true);

  };

  /* Sorting */

  const handleSort = (field) => {

    if (sortBy === field) {

      setDirection(direction === "asc" ? "desc" : "asc");

    } else {

      setSortBy(field);
      setDirection("asc");

    }

  };

  return (

    <div>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">

        <h2 className="text-xl font-semibold">
          My Tasks
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search tasks..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
            className="border border-gray-300 px-4 py-2 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            + Add Task
          </button>

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-center py-10 text-gray-500">
          Loading tasks...
        </div>

      ) : (

        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

      )}

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-2 mt-8">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded ${
                page === i ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>

          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>

        </div>

      )}

      {/* Modal */}

      <AddTaskModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingTask(null);
        }}
        onTaskCreated={fetchTasks}
        editTask={editingTask}
      />

    </div>

  );

}

export default MyTasks;