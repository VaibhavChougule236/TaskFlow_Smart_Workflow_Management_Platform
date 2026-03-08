function StatCard({ title, count, color }) {

  return (
    <div className={`p-4 rounded-lg shadow bg-white border-l-4 ${color}`}>

      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-2xl font-bold">
        {count}
      </p>

    </div>
  );
}

function TaskStats({ stats }) {

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">

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