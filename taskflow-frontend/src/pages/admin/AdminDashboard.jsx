import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";

import StatsCards from "../../components/dashboard/StatsCards";
import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
import PriorityChart from "../../components/dashboard/PriorityChart";
import CategoryChart from "../../components/dashboard/CategoryChart";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    const res = await getAdminStats();

    const data = res.data.data;

    setStats({
      users: data.totalUsers,
      tasks: data.totalTasks,
      completed: data.completedTasks,
      pending: data.pendingTasks,
      priority: [
        { name: "Low", value: data.priorityStats.low },
        { name: "Medium", value: data.priorityStats.medium },
        { name: "High", value: data.priorityStats.high }
      ],
      category: [
        { name: "Work", value: data.categoryStats.work },
        { name: "Personal", value: data.categoryStats.personal },
        { name: "Study", value: data.categoryStats.study }
      ]
    });

  };

  if (!stats) return <p>Loading dashboard...</p>;

  return (

    <div className="space-y-8">

      <h2 className="text-2xl font-semibold">
        Admin Dashboard
      </h2>

      <StatsCards stats={stats} />

      <div className="grid md:grid-cols-2 gap-6">

        <TaskStatusChart
          completed={stats.completed}
          pending={stats.pending}
        />

        <PriorityChart data={stats.priority} />

      </div>

      <CategoryChart data={stats.category} />

    </div>

  );

}

export default AdminDashboard;