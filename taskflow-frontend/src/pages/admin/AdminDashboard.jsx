import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/adminService";
import { Users, Layout, CheckCircle, Clock } from "lucide-react"; // Added icons

import StatsCards from "../../components/dashboard/StatsCards";
import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
import PriorityChart from "../../components/dashboard/PriorityChart";
import CategoryChart from "../../components/dashboard/CategoryChart";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (err) {
      console.error("Failed to fetch admin stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Industry-Ready Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">Real-time analytics and platform health metrics.</p>
        </div>
        <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Section */}
      <StatsCards stats={stats} />

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} /> Task Completion Rates
          </h3>
          <TaskStatusChart completed={stats.completed} pending={stats.pending} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="text-orange-500" size={20} /> Priority Distribution
          </h3>
          <PriorityChart data={stats.priority} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Layout className="text-blue-500" size={20} /> Tasks by Category
        </h3>
        <CategoryChart data={stats.category} />
      </div>
    </div>
  );
}

export default AdminDashboard;