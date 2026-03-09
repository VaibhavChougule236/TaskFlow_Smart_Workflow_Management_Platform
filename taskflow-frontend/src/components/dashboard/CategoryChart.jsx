import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CategoryChart({ data }) {

  return (

    <div className="bg-white p-6 rounded-lg shadow">

      <h3 className="font-semibold mb-4">
        Tasks by Category
      </h3>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" fill="#8b5cf6" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default CategoryChart;