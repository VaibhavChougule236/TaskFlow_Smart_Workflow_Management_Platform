function TaskCard({ task, onToggle, onDelete }) {

  const priorityColor = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600"
  };

  const categoryColor = {
    work: "bg-blue-100 text-blue-600",
    personal: "bg-purple-100 text-purple-600",
    study: "bg-indigo-100 text-indigo-600"
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center">

      {/* Left side */}
      <div className="flex items-start gap-3">

        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="mt-1"
        />

        <div>

          <h3 className={`font-medium ${task.done ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </h3>

          <div className="flex gap-2 mt-1 text-xs">

            <span className={`px-2 py-1 rounded ${priorityColor[task.priority]}`}>
              {task.priority}
            </span>

            <span className={`px-2 py-1 rounded ${categoryColor[task.category]}`}>
              {task.category}
            </span>

          </div>

          <p className="text-xs text-gray-400 mt-1">
            Due: {task.dueDate}
          </p>

        </div>

      </div>


      {/* Right side */}
      <div className="flex gap-2">

        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;