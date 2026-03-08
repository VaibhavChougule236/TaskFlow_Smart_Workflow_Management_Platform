function TaskProgress({ percentage }) {

  return (
    <div className="bg-white p-5 rounded-lg shadow mt-6">

      <h3 className="font-semibold mb-3">
        Productivity Progress
      </h3>

      <div className="w-full bg-gray-200 rounded h-3">

        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="text-sm mt-2 text-gray-600">
        {percentage}% tasks completed
      </p>

    </div>
  );
}

export default TaskProgress;