import { useEffect, useState } from "react";

import { getMyTasks, deleteTask, toggleTaskDone } from "../../services/taskService";

import TaskList from "../../components/tasks/TaskList";

function MyTasks() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const res = await getMyTasks({
        page: 0,
        size: 10
      });

      setTasks(res.data.data.content);

    } catch (error) {

      console.error("Error fetching tasks", error);

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (id) => {

    await deleteTask(id);

    fetchTasks();
  };

  const handleToggle = async (id) => {

    await toggleTaskDone(id);

    fetchTasks();
  };

  return (

    <div>

      {/* header */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          My Tasks
        </h2>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Add Task
        </button>

      </div>

      {/* loading */}
      {loading ? (

        <p>Loading tasks...</p>

      ) : (

        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

      )}

    </div>
  );
}

export default MyTasks;