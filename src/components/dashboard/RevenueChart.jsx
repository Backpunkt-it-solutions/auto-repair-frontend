import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData } from "../../data/mockData";

export default function RevenueChart() {
  return (
    <div className="card" style={{ minWidth: 0 }}>
      <div className="card-head">
        <div>
          <h3 className="card-title">Revenue Overview</h3>
          <p className="card-subtitle">Animated monthly revenue trend</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 320,
          minWidth: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8cff" stopOpacity={0.65} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
              </linearGradient>
            </defs>

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
            <Area
              type="monotone"
              dataKey="value"
              stroke="#59a6ff"
              strokeWidth={3}
              fill="url(#revenueFill)"
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
