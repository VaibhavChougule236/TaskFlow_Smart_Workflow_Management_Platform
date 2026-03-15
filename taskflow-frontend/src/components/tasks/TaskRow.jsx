import { Pencil, Trash2, Calendar, Check } from "lucide-react";

function TaskRow({ task, onToggle, onDelete, onEdit, onView }) {
  const getCategoryColor = () => {
    switch (task.category) {
      case "work": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "personal": return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
      case "study": return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      default: return "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400";
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high": return "text-red-500 dark:text-red-400";
      case "medium": return "text-yellow-500 dark:text-yellow-400";
      case "low": return "text-green-500 dark:text-green-400";
      default: return "text-gray-500 dark:text-slate-500";
    }
  };

  return (
    <div 
      onClick={() => onView(task)} 
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg dark:hover:shadow-none dark:hover:border-slate-700 transition-all cursor-pointer group gap-4 mb-3"
    >
      <div className="flex items-center gap-4">
        {/* Checkbox Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
          ${task.done 
            ? "bg-green-500 border-green-500 text-white" 
            : "border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400"}`}
        >
          {task.done && <Check size={14} strokeWidth={3} />}
        </button>

        <div className="overflow-hidden">
          <p className={`font-semibold text-[15px] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate 
            ${task.done ? "line-through text-gray-400 dark:text-slate-600" : "text-gray-900 dark:text-slate-100"}`}>
            {task.title}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm mt-1.5">
            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getCategoryColor()}`}>
              {task.category}
            </span>
            <span className={`text-[11px] font-bold flex items-center gap-1 ${getPriorityColor()}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {task.priority}
            </span>
            <span className="text-gray-500 dark:text-slate-500 text-[11px] flex items-center gap-1 font-medium">
              <Calendar size={12} />
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t dark:border-slate-800 sm:border-0 pt-3 sm:pt-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
          title="Edit Task"
        >
          <Pencil size={17} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          title="Delete Task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

export default TaskRow;