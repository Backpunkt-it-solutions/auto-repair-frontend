import StatusBadge from "../common/StatusBadge";

export default function AppointmentCalendarBoard({
  items = [],
  onEdit,
  onDelete,
}) {
  const groups = items.reduce((acc, item) => {
    const day = new Date(item.date).toLocaleDateString();
    acc[day] = acc[day] || [];
    acc[day].push(item);
    return acc;
  }, {});

  return (
    <div className="grid-2">
      {Object.entries(groups).map(([day, dayItems]) => (
        <div className="card" key={day}>
          <div className="card-head">
            <div>
              <h3 className="card-title" style={{ fontSize: 24 }}>
                {day}
              </h3>
              <p className="card-subtitle">Service schedule</p>
            </div>
          </div>

          <div className="mini-list">
            {dayItems.map((item) => (
              <div className="mini-item" key={item.id}>
                <div>
                  <p className="mini-item-title">{item.customer}</p>
                  <p className="mini-item-meta">
                    {item.vehicle} • {item.service} •{" "}
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
                  <StatusBadge value={item.status} />
                  <div style={{ display: "flex", gap: 8 }}>
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
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
