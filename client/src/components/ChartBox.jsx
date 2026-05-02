import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function ChartBox({ data }) {
  const total = Math.max(1, data.todo + data.inProgress + data.done);

  // normalize values (0 → 1 scale)
  const chartData = [
    {
      name: "Todo",
      value: data.todo / total,
      count: data.todo,
    },
    {
      name: "In Progress",
      value: data.inProgress / total,
      count: data.inProgress,
    },
    {
      name: "Done",
      value: data.done / total,
      count: data.done,
    },
  ];

  const COLORS = ["#6366f1", "#f59e0b", "#22c55e"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Task Distribution */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Task Distribution</h2>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              outerRadius={90}
              innerRadius={50}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[index] }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task Status (Normalized Bar Chart) */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Task Status</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            barCategoryGap="35%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickFormatter={(v) => `${v * 100}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value, name, props) => [
                `${props.payload.count} tasks`,
                props.payload.name,
              ]}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={45}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <Stat label="Todo" value={data.todo} color="#6366f1" />
          <Stat label="In Progress" value={data.inProgress} color="#f59e0b" />
          <Stat label="Done" value={data.done} color="#22c55e" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      <span className="text-gray-600">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
