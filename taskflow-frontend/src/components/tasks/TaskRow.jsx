import { Pencil, Trash2 } from "lucide-react";

function TaskRow({ task, onToggle, onDelete, onEdit }) {

  const getCategoryColor = () => {
    switch (task.category) {
      case "work":
        return "bg-blue-100 text-blue-700";
      case "personal":
        return "bg-purple-100 text-purple-700";
      case "study":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white border rounded-lg px-4 py-3 flex items-center justify-between hover:shadow-md transition">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Toggle */}
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border flex items-center justify-center
          ${task.done ? "bg-green-500 text-white" : "border-gray-400"}`}
        >
          {task.done && "✓"}
        </button>

        {/* Task Info */}
        <div>

          <p className={`font-medium ${task.done ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>

          <div className="flex items-center gap-2 text-sm mt-1">

            {/* Category */}
            <span className={`px-2 py-1 rounded text-xs ${getCategoryColor()}`}>
              {task.category}
            </span>

            {/* Priority */}
            <span className={`text-xs font-medium ${getPriorityColor()}`}>
              {task.priority}
            </span>

            {/* Due date */}
            <span className="text-gray-500 text-xs">
              {task.dueDate}
            </span>

          </div>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}

export default TaskRow;