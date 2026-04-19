export default function StatCard({ title, value, note, icon }) {
  const Icon = icon;

  return (
    <div className="card stat-card">
      <div className="stat-top">
        <p className="stat-title">{title}</p>
        {Icon ? (
          <div className="stat-icon">
            <Icon size={20} />
          </div>
        ) : null}
      </div>

      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-note">{note}</div>
      </div>
    </div>
  );
}
