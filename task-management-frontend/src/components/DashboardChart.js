/*import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
function DashboardChart({ data }) {
  const chartData = [
    {
      name: "Pending",
      value: data.pending || 0,
    },
    {
      name: "Completed",
      value: data.completed || 0,
    },
    {
      name: "In Progress",
      value: data.inProgress || 0,
    },
  ];

  const COLORS = [
    "#f4b400",
    "#ff4fa0",
    "#6c63ff",
  ];

  return (
    <div className="chart-card">
      <h3>Task Analytics</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;*/