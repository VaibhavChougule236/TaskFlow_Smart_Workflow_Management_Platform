import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

  const [filter, setFilter] = useState("all");

  const [searchParams] = useSearchParams();

  const sidebarFilter = searchParams.get("filter");
  const sidebarCategory = searchParams.get("category");

  /* Fetch Tasks */

  const fetchTasks = async () => {

    setLoading(true);

    try {

      const res = await getMyTasks({
        page,
        size: 10,
        keyword,
        status: sidebarFilter || (filter === "all" ? null : filter),
        category: sidebarCategory || null,
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

  /* Fetch when state changes */

  useEffect(() => {
    fetchTasks();
  }, [page, keyword, sortBy, direction, filter, sidebarFilter, sidebarCategory]);

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
  

  return (

    <div>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h2 className="text-2xl font-semibold">
          My Tasks
        </h2>

        <div className="flex gap-3 items-center">

          {/* Search */}

          <div className="relative">

            <input
              type="text"
              placeholder="Search tasks..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(0);
              }}
              className="border pl-10 pr-4 py-2 rounded bg-gray-50"
            />

            <span className="absolute left-3 top-2 text-gray-400">
              🔍
            </span>

          </div>


          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(0);
            }}
            className="border px-3 py-2 rounded bg-white"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>


          {/* Direction */}

          <button
            onClick={() => {
              setDirection(direction === "asc" ? "desc" : "asc");
            }}
            className="px-3 py-2 border rounded bg-gray-100"
          >
            {direction === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>


          {/* Add Task */}

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Task
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="flex gap-3 mb-4 flex-wrap">

        <button
          onClick={() => {
            setFilter("all");
            setPage(0);
          }}
          className={`px-3 py-1 rounded ${filter === "all"
            ? "bg-gray-800 text-white"
            : "bg-gray-200"
            }`}
        >
          All
        </button>

        <button
          onClick={() => {
            setFilter("pending");
            setPage(0);
          }}
          className={`px-3 py-1 rounded ${filter === "pending"
            ? "bg-yellow-500 text-white"
            : "bg-yellow-100"
            }`}
        >
          Pending
        </button>

        <button
          onClick={() => {
            setFilter("completed");
            setPage(0);
          }}
          className={`px-3 py-1 rounded ${filter === "completed"
            ? "bg-green-600 text-white"
            : "bg-green-100"
            }`}
        >
          Completed
        </button>

        <button
          onClick={() => {
            setFilter("overdue");
            setPage(0);
          }}
          className={`px-3 py-1 rounded ${filter === "overdue"
            ? "bg-red-600 text-white"
            : "bg-red-100"
            }`}
        >
          Overdue
        </button>

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

          {Array.from({ length: totalPages }).map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded ${page === i
                ? "bg-blue-500 text-white"
                : "bg-white"
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