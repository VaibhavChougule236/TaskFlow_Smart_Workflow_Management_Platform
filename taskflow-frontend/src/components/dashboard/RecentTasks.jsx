function RecentTasks({ tasks }) {
  return (
    <div className="bg-white p-4 md:p-5 rounded-lg shadow mt-6">
      <h3 className="font-semibold mb-4 text-gray-800">
        Recent Tasks
      </h3>

      <ul className="space-y-3">
        {tasks.slice(0, 5).map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b pb-2 gap-4"
          >
            {/* truncate prevents text from wrapping and breaking the flex layout */}
            <span className="truncate text-gray-700 font-medium">{task.title}</span>

            <span className="text-xs md:text-sm text-gray-500 shrink-0">
              {task.dueDate}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTasks;