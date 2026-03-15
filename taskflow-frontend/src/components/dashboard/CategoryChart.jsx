import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function CategoryChart({ data }) {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">
        Tasks by Category
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: isDarkMode ? '#1e293b' : '#f8fafc' }}
            contentStyle={{
              backgroundColor: isDarkMode ? '#0f172a' : '#fff',
              borderColor: isDarkMode ? '#334155' : '#e2e8f0',
              borderRadius: '8px',
              color: isDarkMode ? '#f1f5f9' : '#1e293b'
            }}
          />

          <Bar
            dataKey="value"
            fill={isDarkMode ? "#a78bfa" : "#8b5cf6"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;