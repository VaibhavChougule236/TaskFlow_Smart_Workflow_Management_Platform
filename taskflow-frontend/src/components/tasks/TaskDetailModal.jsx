import { X, Calendar, Tag, AlertCircle, AlignLeft } from "lucide-react";

function TaskDetailModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      {/* Background overlay click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b flex justify-between items-start bg-slate-50/50">
          <div>
            <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${
              task.done ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}>
              {task.done ? "✓ Completed" : "• Pending"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex gap-4">
            <div className="mt-1 bg-slate-100 p-2 rounded-lg text-slate-500 shrink-0">
              <AlignLeft size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Description</p>
              <p className="text-slate-600 mt-1 leading-relaxed">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Grid: 1 col on mobile, 2 cols on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="mt-1 bg-blue-50 p-2 rounded-lg text-blue-500 shrink-0">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
                <p className="text-slate-700 font-semibold capitalize">{task.category}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 bg-purple-50 p-2 rounded-lg text-purple-500 shrink-0">
                <AlertCircle size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Priority</p>
                <p className="text-slate-700 font-semibold capitalize">{task.priority}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-50">
            <div className="mt-1 bg-rose-50 p-2 rounded-lg text-rose-500 shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
              <p className="text-slate-700 font-semibold">{task.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t flex gap-3">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;