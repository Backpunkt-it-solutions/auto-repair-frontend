import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Diagnostics", value: 28 },
  { name: "Brakes", value: 22 },
  { name: "Oil Service", value: 31 },
  { name: "AC", value: 19 },
];

const colors = ["#4f8cff", "#38bdf8", "#22c55e", "#f59e0b"];

export default function ReportsSummaryChart() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h3 className="card-title">Service Mix</h3>
          <p className="card-subtitle">Most common workshop categories</p>
        </div>
      </div>

      <div style={{ height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "#09111e",
                border: "1px solid rgba(148,163,184,0.14)",
                borderRadius: 14,
                color: "white",
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
