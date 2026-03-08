function RecentTasks({ tasks }) {

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">

      <h3 className="font-semibold mb-4">
        Recent Tasks
      </h3>

      <ul className="space-y-3">

        {tasks.slice(0,5).map(task => (

          <li
            key={task.id}
            className="flex justify-between border-b pb-2"
          >

            <span>{task.title}</span>

            <span className="text-sm text-gray-500">
              {task.dueDate}
            </span>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default RecentTasks;