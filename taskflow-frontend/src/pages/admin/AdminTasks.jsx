import { useEffect, useState } from "react";
import api from "../../api/axios";
import { success, error } from "../../utils/toast";
import TaskDetailModal from "../../components/tasks/TaskDetailModal"; // Added

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [direction, setDirection] = useState("asc");
  const [selectedTask, setSelectedTask] = useState(null); // Added

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      success("Task deleted successfully");
      fetchTasks();
    } catch {
      error("Failed to delete task");
    }
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Tasks</h2>
        <div className="relative w-72">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">🔍</span>
          <input
            type="text" placeholder="Search tasks..." value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
            className="w-full border border-gray-300 bg-gray-50 text-gray-800 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th onClick={() => handleSort("title")} className="px-4 py-3 cursor-pointer">Title</th>
              <th onClick={() => handleSort("category")} className="px-4 py-3 cursor-pointer">Category</th>
              <th onClick={() => handleSort("priority")} className="px-4 py-3 cursor-pointer">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th onClick={() => handleSort("dueDate")} className="px-4 py-3 cursor-pointer">Due Date</th>
              <th className="px-4 py-3">Added By</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-6 text-gray-500">No tasks found</td></tr>
            ) : (
              tasks.map(task => (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td onClick={() => setSelectedTask(task)} className="px-4 py-3 font-medium cursor-pointer text-blue-600 hover:underline">
                    {task.title}
                  </td>
                  <td className="px-4 py-3 capitalize">{task.category}</td>
                  <td className="px-4 py-3 capitalize">{task.priority}</td>
                  <td className="px-4 py-3">
                    {task.done ? <span className="text-green-600 font-medium">Completed</span> : <span className="text-yellow-600 font-medium">Pending</span>}
                  </td>
                  <td className="px-4 py-3">{task.dueDate}</td>
                  <td className="px-4 py-3 text-gray-600">{task.createdByEmail || "System"}</td>
                  <td className="px-4 py-3 text-center flex items-center justify-center gap-2">
                    <button onClick={() => setSelectedTask(task)} className="text-blue-500 hover:underline mr-2">View</button>
                    <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">🗑 Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 border rounded ${page === i ? "bg-blue-500 text-white" : ""}`}>{i + 1}</button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
      </div>

      {/* Popup Modal */}
      <TaskDetailModal 
        task={selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />
    </div>
  );
}

export default AdminTasks;