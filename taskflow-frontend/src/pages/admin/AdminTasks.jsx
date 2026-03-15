import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import TaskDetailModal from "../../components/tasks/TaskDetailModal";
import { Search, Trash2, Eye } from "lucide-react";
import { success, error } from "../../utils/toast";
import { deleteAdminTask } from "../../services/taskService";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [direction, setDirection] = useState("asc");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [page, keyword, sortBy, direction]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { page, size, keyword, sortBy, direction }
      });
      setTasks(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      error("Failed to load tasks");
    }
  };

  const handleDelete = (id) => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    toast((t) => (
      <div className={`min-w-[280px] ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
        <div className="flex items-start gap-3">
          <div className={`${isDarkMode ? "bg-red-900/20" : "bg-red-50"} p-2 rounded-full`}>
            <Trash2 size={18} className="text-red-600" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Admin: Delete Task</h3>
            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"} mt-1`}>
              This will remove the task for all users.
            </p>
          </div>
        </div>

        <div className={`flex justify-end gap-3 mt-5 pt-3 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}>
          <button
            onClick={() => toast.dismiss(t.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await deleteAdminTask(id); 
                fetchTasks();
                setTimeout(() => {
                  success("Task deleted by Admin");
                }, 150);
              } catch (err) {
                const msg = err.response?.data?.message || "Admin delete failed";
                error(msg);
              }
            }}
            className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
          >
            Delete Task
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: isDarkMode ? '#0f172a' : '#ffffff',
        padding: '16px',
        borderRadius: '16px',
        border: isDarkMode ? '1px solid #1e293b' : '1px solid #f1f5f9',
      },
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  return (
    <div className="p-4 md:p-0 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">All Tasks</h2>
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
          <input
            type="text" placeholder="Search tasks..." value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
            className="w-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-slate-900/50 text-gray-700 dark:text-slate-300">
              <tr>
                <th onClick={() => handleSort("title")} className="px-4 py-4 cursor-pointer">Title</th>
                <th onClick={() => handleSort("category")} className="px-4 py-4 cursor-pointer">Category</th>
                <th onClick={() => handleSort("priority")} className="px-4 py-4 cursor-pointer">Priority</th>
                <th className="px-4 py-4">Status</th>
                <th onClick={() => handleSort("dueDate")} className="px-4 py-4 cursor-pointer">Due Date</th>
                <th className="px-4 py-4">Added By</th> 
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td onClick={() => setSelectedTask(task)} className="px-4 py-4 font-medium cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
                    {task.title}
                  </td>
                  <td className="px-4 py-4 capitalize dark:text-slate-300">{task.category}</td>
                  <td className="px-4 py-4 capitalize dark:text-slate-300">{task.priority}</td>
                  <td className="px-4 py-4">
                    {task.done ? <span className="text-green-600 dark:text-green-400 font-bold">Completed</span> : <span className="text-yellow-600 dark:text-yellow-400 font-bold">Pending</span>}
                  </td>
                  <td className="px-4 py-4 dark:text-slate-300">{task.dueDate}</td>
                  <td className="px-4 py-4 text-gray-500 dark:text-slate-400 truncate max-w-[150px]">
                    {task.createdByEmail}
                  </td>
                  <td className="px-4 py-4 flex items-center justify-center gap-3">
                    <button onClick={() => setSelectedTask(task)} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"><Eye size={18}/></button>
                    <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-slate-700">
          {tasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-slate-400">No tasks found</div>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="p-4 space-y-3 dark:bg-slate-800">
                <div className="flex justify-between items-start">
                  <h4 onClick={() => setSelectedTask(task)} className="font-bold text-blue-600 dark:text-blue-400 text-lg leading-tight">{task.title}</h4>
                  <button onClick={() => handleDelete(task.id)} className="text-red-500 p-1"><Trash2 size={20}/></button>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-gray-500 dark:text-slate-400">Priority: <span className="text-gray-900 dark:text-slate-100 font-medium capitalize">{task.priority}</span></div>
                  <div className="text-gray-500 dark:text-slate-400 text-right">Status: <span className={task.done ? "text-green-600 dark:text-green-400 font-bold" : "text-yellow-600 dark:text-yellow-400 font-bold"}>{task.done ? "Done" : "Pending"}</span></div>
                  <div className="text-gray-500 dark:text-slate-400 italic text-xs truncate col-span-2">By: {task.createdByEmail}</div>
                  <div className="text-gray-900 dark:text-slate-100 font-semibold text-xs col-span-2">Due: {task.dueDate}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8 pb-10">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 0} 
          className="px-3 py-1.5 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-40 text-sm font-medium transition-colors"
        >
          Prev
        </button>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page === totalPages - 1} 
          className="px-3 py-1.5 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-200 disabled:opacity-40 text-sm font-medium transition-colors"
        >
          Next
        </button>
      </div>

      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

export default AdminTasks;