import { useEffect, useState } from "react";
import TaskList from "../../components/tasks/TaskList";
import { getTasks, updateTaskStatus, deleteTask } from "../../services/taskService";
import AppLayout from "../../layout/AppLayout";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {

    setLoading(true);

    try {

      const res = await getTasks({
        page: 0,
        size: 10
      });

      setTasks(res.data.content);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (id) => {
    await updateTaskStatus(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (

    <AppLayout>

      <h1 className="text-2xl font-bold mb-6">
        My Tasks
      </h1>

      <TaskList
        tasks={tasks}
        loading={loading}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

    </AppLayout>

  );
}

export default Dashboard;