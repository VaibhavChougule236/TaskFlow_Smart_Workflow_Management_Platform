import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function TaskStatusChart({ completed, pending }) {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-transparent dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">
        Task Status
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label={{ fill: isDarkMode ? '#f1f5f9' : '#1e293b', fontSize: 12 }}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1e293b' : '#fff', 
              borderColor: isDarkMode ? '#334155' : '#e2e880',
              color: isDarkMode ? '#f1f5f9' : '#1e293b'
            }} 
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskStatusChart;