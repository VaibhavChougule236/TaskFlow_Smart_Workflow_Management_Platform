import TaskRow from "./TaskRow";

function TaskList({ tasks, onToggle, onDelete, onEdit, onView }) {

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Try adjusting your filters or search keyword</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView} 
        />
      ))}
    </div>
  );
}

export default TaskList;