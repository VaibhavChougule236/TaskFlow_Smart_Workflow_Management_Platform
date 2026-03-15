import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTasks } from "../../services/taskService";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import TaskStats from "../../components/dashboard/TaskStats";
import TaskProgress from "../../components/dashboard/TaskProgress";
import RecentTasks from "../../components/dashboard/RecentTasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getMyTasks(0, 10);
      setTasks(res.data.data.content);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    overdue: tasks.filter((t) => !t.done && t.dueDate && new Date(t.dueDate) < new Date()).length,
  };

  const completionPercentage =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="min-h-full transition-colors duration-300">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Workspace
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Welcome back! Manage and track your daily productivity.
        </p>
      </div>

      <div className="space-y-6">
        {/* Top Row: User Info and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-1 shadow-sm transition-all hover:shadow-md">
              <UserProfileCard />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">
              <TaskProgress percentage={completionPercentage} />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full">
          <TaskStats stats={stats} />
        </div>

        {/* Recent Tasks Section */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Recent Activity
            </h3>
            <Link 
              to="/my-tasks" 
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All Tasks
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <RecentTasks tasks={tasks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;