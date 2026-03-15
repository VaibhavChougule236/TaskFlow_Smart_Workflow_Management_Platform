function StatsCards({ stats }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow border border-transparent dark:border-slate-700 transition-colors duration-300">
        <p className="text-gray-500 dark:text-slate-400">Total Users</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.users}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow border border-transparent dark:border-slate-700 transition-colors duration-300">
        <p className="text-gray-500 dark:text-slate-400">Total Tasks</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.tasks}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow border border-transparent dark:border-slate-700 transition-colors duration-300">
        <p className="text-gray-500 dark:text-slate-400">Completed Tasks</p>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {stats.completed}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;