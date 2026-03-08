import { useEffect, useState } from "react";
import { getMyTasks } from "../../services/taskService";
import api from "../../api/axios";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import TaskStats from "../../components/dashboard/TaskStats";
import TaskProgress from "../../components/dashboard/TaskProgress";
import RecentTasks from "../../components/dashboard/RecentTasks";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    let res;

    if (user.role === "ADMIN") {
      res = await api.get("/tasks", {
        params: { page: 0, size: 10 }
      });
    } else {
      res = await getMyTasks(0, 10);
    }

    setTasks(res.data.data.content);

  } catch (error) {
    console.error(error);
  }
};
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    overdue: tasks.filter(t => !t.done && new Date(t.dueDate) < new Date()).length
  };

  const completionPercentage =
    stats.total === 0
      ? 0
      : Math.round((stats.completed / stats.total) * 100);

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-4">
        Dashboard
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <UserProfileCard />

        <TaskProgress percentage={completionPercentage} />

      </div>

      <TaskStats stats={stats} />

      <RecentTasks tasks={tasks} />

    </div>
  );
}

export default Dashboard;