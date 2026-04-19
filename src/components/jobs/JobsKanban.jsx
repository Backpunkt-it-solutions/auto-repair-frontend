import { useState } from "react";
import StatusBadge from "../common/StatusBadge";

const columns = ["Pending", "In Progress", "Completed"];

export default function JobsKanban({
  items = [],
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [activeColumn, setActiveColumn] = useState(null);

  return (
    <div className="grid-3">
      {columns.map((column) => {
        const list = items.filter((item) => item.status === column);

        return (
          <div
            key={column}
            className="card"
            onDragOver={(e) => {
              e.preventDefault();
              setActiveColumn(column);
            }}
            onDragLeave={() => setActiveColumn(null)}
            onDrop={() => {
              const dragged = items.find((item) => item.id === draggingId);
              if (dragged && dragged.status !== column) {
                onStatusChange?.(dragged, column);
              }
              setDraggingId(null);
              setActiveColumn(null);
            }}
            style={
              activeColumn === column
                ? {
                    outline: "1px solid rgba(79,140,255,0.4)",
                    background: "rgba(79,140,255,0.06)",
                  }
                : undefined
            }
          >
            <div className="card-head">
              <div>
                <h3 className="card-title" style={{ fontSize: 24 }}>
                  {column}
                </h3>
                <p className="card-subtitle">{list.length} jobs</p>
              </div>
            </div>

            <div className="mini-list">
              {list.map((job) => (
                <div
                  key={job.id}
                  className="mini-item"
                  draggable
                  onDragStart={() => setDraggingId(job.id)}
                  onDragEnd={() => {
                    setDraggingId(null);
                    setActiveColumn(null);
                  }}
                  style={{
                    alignItems: "flex-start",
                    cursor: "grab",
                    opacity: draggingId === job.id ? 0.7 : 1,
                    background: job._highlighted
                      ? "rgba(79,140,255,0.12)"
                      : undefined,
                    outline: job._highlighted
                      ? "1px solid rgba(79,140,255,0.35)"
                      : undefined,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p className="mini-item-title">{job.issue}</p>
                    <p className="mini-item-meta">
                      {job.vehicle} • {job.mechanic}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <StatusBadge value={job.priority} />
                      <StatusBadge value={job.status} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 8 }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onEdit?.(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => onDelete?.(job)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
