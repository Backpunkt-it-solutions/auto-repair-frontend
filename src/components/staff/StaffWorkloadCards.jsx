export default function StaffWorkloadCards({ items = [] }) {
  return (
    <div className="grid-3" style={{ marginBottom: 18 }}>
      {items.map((member) => (
        <div className="card" key={member.id}>
          <div className="card-head">
            <div>
              <h3 className="card-title" style={{ fontSize: 24 }}>
                {member.name}
              </h3>
              <p className="card-subtitle">{member.role}</p>
            </div>
            <div className="badge neutral">{member.jobsToday} jobs</div>
          </div>

          <div style={{ marginBottom: 10, color: "#94a3b8" }}>Workload</div>
          <div className="kpi-track">
            <div
              className="kpi-fill"
              style={{ width: `${member.utilization}%` }}
            />
          </div>
          <div style={{ marginTop: 10, color: "#cbd5e1" }}>
            {member.utilization}% utilization
          </div>
        </div>
      ))}
    </div>
  );
}
