import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function TaskStatusChart({ completed, pending }) {

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  return (

    <div className="bg-white p-6 rounded-lg shadow">

      <h3 className="font-semibold mb-4">
        Task Status
      </h3>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}

          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default TaskStatusChart;