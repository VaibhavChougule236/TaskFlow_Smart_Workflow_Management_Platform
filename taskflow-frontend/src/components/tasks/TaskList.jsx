import TaskRow from "./TaskRow";

function TaskList({ tasks, onToggle, onDelete, onEdit  }) {

  if (!tasks.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No tasks found
      </div>
    );
  }

  return (

    <div className="space-y-3">

      {tasks.map(task => (

        <TaskRow
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </div>

  );
}

export default TaskList;