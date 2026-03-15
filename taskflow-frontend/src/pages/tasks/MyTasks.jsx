import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ArrowUpDown, Plus, SlidersHorizontal, Trash2 } from "lucide-react";
import { getMyTasks, deleteTask, toggleTaskDone } from "../../services/taskService";
import TaskList from "../../components/tasks/TaskList";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TaskDetailModal from "../../components/tasks/TaskDetailModal";
import toast from "react-hot-toast";
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchParams] = useSearchParams();

  const sidebarFilter = searchParams.get("filter");
  const sidebarCategory = searchParams.get("category");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const activeStatus = sidebarFilter || filter;
      const statusParam = (activeStatus === "all") ? null : activeStatus;

      const res = await getMyTasks({
        page,
        size: 10,
        keyword,
        status: statusParam,
        category: sidebarCategory || null,
        sortBy,
        direction
      });

      const data = res.data.data;
      setTasks(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, keyword, sortBy, direction, filter, sidebarFilter, sidebarCategory]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="min-w-[300px] bg-white dark:bg-slate-900 transition-colors">
        <div className="flex items-start gap-3">
          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
            <Trash2 size={18} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Delete Task</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Are you sure? This action is permanent.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteTask(id);
                fetchTasks();
                setTimeout(() => {
                  success("Task deleted successfully");
                }, 150);
              } catch (err) {
                error("Could not delete task");
              }
            }}
            className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-100 dark:shadow-none transition-all active:scale-95"
          >
            Delete Task
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: 'transparent', // Let the inner div handle it
        padding: '0px',
        borderRadius: '16px',
        border: 'none',
      },
    });
  };

  const handleToggle = async (id) => {
    try {
      await toggleTaskDone(id);
      success("Status updated");
      fetchTasks();
    } catch {
      error("Failed to update task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Tasks</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage and track your daily productivity</p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          {/* Search Box */}
          <div className="relative group w-full md:w-64">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text" placeholder="Search tasks..." value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:dark:text-slate-600"
            />
          </div>

          {/* Sort Select */}
          <div className="flex items-center flex-1 md:flex-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <SlidersHorizontal size={16} className="ml-2 text-gray-400" />
            <select 
              value={sortBy} 
              onChange={(e) => { setSortBy(e.target.value); setPage(0); }} 
              className="bg-transparent px-2 py-2.5 text-sm text-gray-600 dark:text-slate-300 outline-none cursor-pointer font-medium w-full"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* Asc/Desc Button */}
          <button 
            onClick={() => setDirection(direction === "asc" ? "desc" : "asc")} 
            className="flex items-center justify-center gap-2 p-2.5 md:px-4 md:py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 font-medium transition-all text-sm"
          >
            <ArrowUpDown size={16} className={direction === "desc" ? "rotate-180 transition-transform" : "transition-transform"} />
            <span className="hidden md:inline">{direction === "asc" ? "Asc" : "Desc"}</span>
          </button>

          {/* Add Task Button */}
          <button 
            onClick={() => setOpenModal(true)} 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none font-bold text-sm flex-1 md:flex-none active:scale-95"
          >
            <Plus size={18} /> <span className="whitespace-nowrap">Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: "all", label: "All", active: "bg-slate-900 dark:bg-white text-white dark:text-slate-900", inactive: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400" },
          { id: "pending", label: "Pending", active: "bg-yellow-500 text-white", inactive: "bg-yellow-50 dark:bg-yellow-900/10 text-yellow-600 dark:text-yellow-500" },
          { id: "completed", label: "Completed", active: "bg-green-600 text-white", inactive: "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-500" },
          { id: "overdue", label: "Overdue", active: "bg-red-600 text-white", inactive: "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500" }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => { setFilter(btn.id); setPage(0); }}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              filter === btn.id ? btn.active : `${btn.inactive} hover:opacity-80`
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Task List Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium animate-pulse">Syncing tasks...</p>
        </div>
      ) : (
        <div className="min-h-[400px]">
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={setSelectedTask}
          />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 md:gap-2 mt-8 pb-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 disabled:opacity-40 text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              if (totalPages > 5 && Math.abs(page - i) > 1 && i !== 0 && i !== totalPages - 1) return null;
              return (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`min-w-[40px] h-10 border rounded-xl text-sm font-bold transition-all ${
                    page === i 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none" 
                      : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className="px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-400 disabled:opacity-40 text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      <AddTaskModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setEditingTask(null); }}
        onTaskCreated={() => { fetchTasks(); }}
        editTask={editingTask}
      />

      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}

export default MyTasks;