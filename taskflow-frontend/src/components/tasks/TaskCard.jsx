function TaskCard({ task, onToggle, onDelete }) {
  const priorityColor = {
    high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  };

  const categoryColor = {
    work: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    personal: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    study: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm flex justify-between items-center transition-colors duration-300">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="mt-1 accent-blue-500"
        />

        <div>
          <h3 className={`font-medium ${task.done ? "line-through text-gray-400 dark:text-gray-500" : "text-slate-900 dark:text-slate-100"}`}>
            {task.title}
          </h3>

          <div className="flex gap-2 mt-1 text-xs">
            <span className={`px-2 py-1 rounded font-medium ${priorityColor[task.priority]}`}>
              {task.priority}
            </span>

            <span className={`px-2 py-1 rounded font-medium ${categoryColor[task.category]}`}>
              {task.category}
            </span>
          </div>

          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
            Due: {task.dueDate}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;