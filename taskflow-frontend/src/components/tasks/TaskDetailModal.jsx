import { X, Calendar, Tag, AlertCircle, AlignLeft } from "lucide-react";

function TaskDetailModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                task.done ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {task.done ? "Completed" : "Pending"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex gap-3">
            <AlignLeft size={18} className="text-gray-400 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Description</p>
              <p className="text-gray-700 mt-1">{task.description || "No description provided."}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Tag size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Category</p>
                <p className="text-gray-700 capitalize">{task.category}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <AlertCircle size={18} className="text-gray-400 mt-1" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Priority</p>
                <p className="text-gray-700 capitalize">{task.priority}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t pt-4">
            <Calendar size={18} className="text-gray-400 mt-1" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Due Date</p>
              <p className="text-gray-700">{task.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 text-white rounded-xl font-bold text-sm hover:bg-gray-900 transition-all"
          >
            Close
          </button>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}

export default TaskDetailModal;