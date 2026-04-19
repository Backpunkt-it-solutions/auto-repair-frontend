export default function InventoryAlerts({ items = [] }) {
  const low = items.filter((item) => item.status === "Low Stock");
  const ok = items.filter((item) => item.status === "Available");

  return (
    <div className="grid-3" style={{ marginBottom: 18 }}>
      <div className="card">
        <h3 className="card-title">Low Stock Alerts</h3>
        <p className="card-subtitle">Critical items that need reorder</p>
        <div className="stat-value" style={{ color: "#fca5a5" }}>
          {low.length}
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Available Items</h3>
        <p className="card-subtitle">Healthy stock count</p>
        <div className="stat-value" style={{ color: "#86efac" }}>
          {ok.length}
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Total SKUs</h3>
        <p className="card-subtitle">All inventory lines</p>
        <div className="stat-value">{items.length}</div>
      </div>
    </div>
  );
}
