import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData } from "../../data/mockData";

export default function RevenueTrendChart() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h3 className="card-title">Revenue Trend</h3>
          <p className="card-subtitle">Monthly workshop income</p>
        </div>
      </div>

      <div style={{ height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={revenueData}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#8da3c1"
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#8da3c1" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#09111e",
                border: "1px solid rgba(148,163,184,0.14)",
                borderRadius: 14,
                color: "white",
              }}
            />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              fill="#4f8cff"
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
