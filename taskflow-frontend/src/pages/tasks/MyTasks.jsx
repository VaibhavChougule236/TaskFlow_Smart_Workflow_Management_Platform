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
        status: statusParam, // Cleaned parameter
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
      <div className="min-w-[280px] bg-white">
        <div className="flex items-start gap-3">
          <div className="bg-red-50 p-2 rounded-full">
            <Trash2 size={18} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Delete Task</h3>
            <p className="text-xs text-slate-500 mt-1">
              Are you sure? This action is permanent.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5 pt-3 border-t border-slate-100">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
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
            className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-100 transition-all active:scale-95"
          >
            Delete Task
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#ffffff',
        padding: '16px',
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
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
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">My Tasks</h2>
          <p className="text-sm text-gray-500">Manage and track your daily productivity</p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <div className="relative group w-full md:w-64">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text" placeholder="Search tasks..." value={keyword}
              onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center flex-1 md:flex-none bg-white border border-gray-200 rounded-xl px-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <SlidersHorizontal size={16} className="ml-2 text-gray-400" />
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(0); }} className="bg-transparent px-2 py-2 text-sm text-gray-600 outline-none cursor-pointer font-medium w-full">
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>

          <button onClick={() => setDirection(direction === "asc" ? "desc" : "asc")} className="flex items-center justify-center gap-2 p-2.5 md:px-4 md:py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-medium transition-all text-sm">
            <ArrowUpDown size={16} className={direction === "desc" ? "rotate-180 transition-transform" : "transition-transform"} />
            <span className="hidden md:inline">{direction === "asc" ? "Asc" : "Desc"}</span>
          </button>

          <button onClick={() => setOpenModal(true)} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 font-bold text-sm flex-1 md:flex-none">
            <Plus size={18} /> <span className="whitespace-nowrap">Add Task</span>
          </button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: "all", label: "All", color: "bg-gray-800", light: "bg-gray-100" },
          { id: "pending", label: "Pending", color: "bg-yellow-500", light: "bg-yellow-100" },
          { id: "completed", label: "Completed", color: "bg-green-600", light: "bg-green-100" },
          { id: "overdue", label: "Overdue", color: "bg-red-600", light: "bg-red-100" }
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => { setFilter(btn.id); setPage(0); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === btn.id ? `${btn.color} text-white` : `${btn.light} text-gray-600 hover:bg-opacity-70`
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium">Loading your tasks...</p>
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 md:gap-2 mt-8 pb-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-40 text-sm font-medium hover:bg-gray-50 transition-colors"
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
                  className={`min-w-[32px] h-8 border rounded-lg text-sm font-bold transition-all ${page === i ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
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
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white disabled:opacity-40 text-sm font-medium hover:bg-gray-50 transition-colors"
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