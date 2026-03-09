import { FaCheck } from "react-icons/fa";

function TaskRow({ task, onToggle, onDelete }) {

  return (

    <div className="flex items-center justify-between bg-white shadow rounded-lg px-4 py-3">

      {/* Left Side */}

      <div className="flex items-center gap-4">

        {/* Toggle Circle */}

        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition
          ${
            task.done
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-400 hover:border-green-400"
          }`}
        >

          {task.done && <FaCheck size={12} />}

        </button>

        {/* Task Info */}

        <div>

          <p className={`font-medium ${task.done ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>

          <div className="text-sm text-gray-500 flex gap-3">

            <span className="capitalize">{task.category}</span>

            <span className="capitalize">{task.priority}</span>

            <span>{task.dueDate}</span>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex gap-3">

        <button
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default TaskRow;