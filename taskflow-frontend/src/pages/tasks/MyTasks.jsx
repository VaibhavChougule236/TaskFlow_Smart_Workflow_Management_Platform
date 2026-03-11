import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ArrowUpDown, Plus, SlidersHorizontal } from "lucide-react";

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
        status: sidebarFilter
          ? sidebarFilter
          : filter === "all"
            ? undefined
            : filter,
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

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            My Tasks
          </h2>
          <p className="text-sm text-gray-500">Manage and track your daily productivity</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(0);
              }}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all w-full md:w-64"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <SlidersHorizontal size={16} className="ml-2 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(0);
              }}
              className="bg-transparent px-2 py-2 text-sm text-gray-600 outline-none cursor-pointer font-medium"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* Direction Toggle */}
          <button
            onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-medium transition-all text-sm active:scale-95"
          >
            <ArrowUpDown size={16} className={direction === "desc" ? "rotate-180 transition-transform" : "transition-transform"} />
            {direction === "asc" ? "Asc" : "Desc"}
          </button>

          {/* Add Task Button */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 font-bold text-sm active:scale-95"
          >
            <Plus size={18} />
            Add Task
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