import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    tasks: 0,
    completed: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res = await getAdminStats();

      const data = res.data.data;

      setStats({
        users: data.totalUsers,
        tasks: data.totalTasks,
        completed: data.completedTasks
      });

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500 text-sm">Total Tasks</h3>
          <p className="text-2xl font-bold">{stats.tasks}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500 text-sm">Completed Tasks</h3>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;