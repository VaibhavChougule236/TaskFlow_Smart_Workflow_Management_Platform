import TaskCard from "./TaskCard";

function TaskList({ tasks, loading, onToggle, onDelete }) {

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading tasks...
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks found
      </div>
    );
  }

  return (
    <div className="grid gap-4">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default TaskList;