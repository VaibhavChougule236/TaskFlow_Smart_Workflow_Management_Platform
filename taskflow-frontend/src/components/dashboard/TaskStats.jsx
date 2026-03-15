function StatCard({ title, count, color }) {
  return (
    <div className={`p-4 rounded-lg shadow bg-white dark:bg-slate-800 border-l-4 ${color} transition-all duration-300 hover:scale-[1.02] border-y border-r border-transparent dark:border-y-slate-700 dark:border-r-slate-700`}>
      <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 font-medium truncate">{title}</p>
      <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mt-1">
        {count}
      </p>
    </div>
  );
}

function TaskStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Total Tasks"
        count={stats.total}
        color="border-blue-500"
      />

      <StatCard
        title="Pending"
        count={stats.pending}
        color="border-yellow-500"
      />

      <StatCard
        title="Completed"
        count={stats.completed}
        color="border-green-500"
      />

      <StatCard
        title="Overdue"
        count={stats.overdue}
        color="border-red-500"
      />
    </div>
  );
}

export default TaskStats;