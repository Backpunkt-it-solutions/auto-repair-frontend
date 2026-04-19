export default function StatusBadge({ value }) {
  const safeValue = value ?? "Unknown";
  const normalized = String(safeValue).toLowerCase();

  let className = "badge neutral";

  if (
    [
      "paid",
      "confirmed",
      "completed",
      "available",
      "active",
      "gold",
      "silver",
    ].includes(normalized)
  ) {
    className = "badge success";
  } else if (["pending", "unpaid", "medium"].includes(normalized)) {
    className = "badge warning";
  } else if (
    ["low stock", "high", "cancelled", "overdue"].includes(normalized)
  ) {
    className = "badge danger";
  } else if (["in progress"].includes(normalized)) {
    className = "badge info";
  }

  return <span className={className}>{safeValue}</span>;
}
