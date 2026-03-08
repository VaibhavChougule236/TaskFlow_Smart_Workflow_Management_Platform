function TaskRow({ task, onToggle, onDelete }) {

  const priorityColor = {
    high: "text-red-500",
    medium: "text-amber-500",
    low: "text-green-500"
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded hover:shadow">

      <div className="flex items-center gap-4">

        {/* checkbox */}
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        {/* priority dot */}
        <span className={`w-2 h-2 rounded-full ${priorityColor[task.priority]} bg-current`} />

        {/* task title */}
        <div>
          <p className={`${task.done ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>

          <p className="text-xs text-gray-500">
            {task.category}
          </p>
        </div>

      </div>

      {/* right side */}
      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-500">
          {task.dueDate}
        </span>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskRow;