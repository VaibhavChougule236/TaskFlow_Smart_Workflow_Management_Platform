function RecentTasks({ tasks }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 md:p-5 rounded-lg shadow mt-6 border border-transparent dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-slate-100">
        Recent Tasks
      </h3>

      <ul className="space-y-3">
        {tasks.slice(0, 5).map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 gap-4"
          >
            <span className="truncate text-gray-700 dark:text-slate-300 font-medium">
              {task.title}
            </span>

            <span className="text-xs md:text-sm text-gray-500 dark:text-slate-400 shrink-0">
              {task.dueDate}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTasks;