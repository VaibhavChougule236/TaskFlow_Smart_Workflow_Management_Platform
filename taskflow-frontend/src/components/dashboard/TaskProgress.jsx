function TaskProgress({ percentage }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow mt-6 border border-transparent dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">
        Productivity Progress
      </h3>

      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded h-3">
        <div
          className="bg-green-500 h-3 rounded transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm mt-2 text-gray-600 dark:text-slate-400">
        {percentage}% tasks completed
      </p>
    </div>
  );
}

export default TaskProgress;