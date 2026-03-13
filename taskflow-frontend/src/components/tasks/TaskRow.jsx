import { Pencil, Trash2 } from "lucide-react";

function TaskRow({ task, onToggle, onDelete, onEdit, onView }) {
  const getCategoryColor = () => {
    switch (task.category) {
      case "work": return "bg-blue-100 text-blue-700";
      case "personal": return "bg-purple-100 text-purple-700";
      case "study": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div 
      onClick={() => onView(task)} 
      className="bg-white border rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition cursor-pointer group gap-4"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center
          ${task.done ? "bg-green-500 text-white" : "border-gray-400"}`}
        >
          {task.done && "✓"}
        </button>

        <div className="overflow-hidden">
          <p className={`font-medium transition-colors group-hover:text-blue-600 truncate ${task.done ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
            <span className={`px-2 py-0.5 rounded text-[10px] md:text-xs ${getCategoryColor()}`}>
              {task.category}
            </span>
            <span className={`text-[10px] md:text-xs font-medium ${getPriorityColor()}`}>
              {task.priority}
            </span>
            <span className="text-gray-500 text-[10px] md:text-xs">
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t sm:border-0 pt-3 sm:pt-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(task); }}
          className="text-blue-500 hover:text-blue-700 p-1"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskRow;