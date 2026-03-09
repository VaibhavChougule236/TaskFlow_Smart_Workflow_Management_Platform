function StatsCards({ stats }) {

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Total Users</p>
        <p className="text-2xl font-bold">{stats.users}</p>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Total Tasks</p>
        <p className="text-2xl font-bold">{stats.tasks}</p>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Completed Tasks</p>
        <p className="text-2xl font-bold text-green-600">
          {stats.completed}
        </p>
      </div>

    </div>

  );

}

export default StatsCards;