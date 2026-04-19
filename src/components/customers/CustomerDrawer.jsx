import StatusBadge from "../common/StatusBadge";

export default function CustomerCards({ items = [], onOpen }) {
  return (
    <div className="grid-3">
      {items.map((item) => (
        <div className="card" key={item.id}>
          <div className="card-head">
            <div>
              <h3 className="card-title" style={{ fontSize: 24 }}>
                {item.name}
              </h3>
              <p className="card-subtitle">{item.email}</p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => onOpen?.(item)}
            >
              Details
            </button>
          </div>

          <div style={{ display: "grid", gap: 8, color: "#cbd5e1" }}>
            <div>Phone: {item.phone}</div>
            <div>Vehicles: {item.vehicles}</div>
            <div>Total spent: €{item.totalSpent}</div>
            <div>
              Loyalty: <StatusBadge value={item.loyalty} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
