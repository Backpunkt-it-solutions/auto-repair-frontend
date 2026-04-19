import StatusBadge from "../common/StatusBadge";

export default function CustomerCard({
  items = [],
  onOpen,
  onEdit,
  onDelete,
  highlightId,
}) {
  return (
    <div className="grid-3">
      {items.map((item) => {
        const highlighted = highlightId === item.id;

        return (
          <div
            className="card"
            key={item.id}
            id={`customer-${item.id}`}
            style={
              highlighted
                ? {
                    background: "rgba(79,140,255,0.12)",
                    outline: "1px solid rgba(79,140,255,0.35)",
                  }
                : undefined
            }
          >
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

            <div
              style={{
                display: "grid",
                gap: 8,
                color: "#cbd5e1",
                marginBottom: 14,
              }}
            >
              <div>Phone: {item.phone}</div>
              <div>Vehicles: {item.vehicles}</div>
              <div>Total spent: €{item.totalSpent}</div>
              <div>
                Loyalty: <StatusBadge value={item.loyalty} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn btn-secondary"
                onClick={() => onEdit?.(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onDelete?.(item)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
