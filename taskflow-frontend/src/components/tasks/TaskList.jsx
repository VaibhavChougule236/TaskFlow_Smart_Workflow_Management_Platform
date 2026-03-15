import TaskRow from "./TaskRow";

function TaskList({ tasks, onToggle, onDelete, onEdit, onView }) {

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12 bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <p className="text-lg font-medium dark:text-slate-300">No tasks found</p>
        <p className="text-sm dark:text-slate-500">Try adjusting your filters or search keyword</p>
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