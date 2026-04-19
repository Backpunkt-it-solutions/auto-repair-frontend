export default function EmptyState({
  title = "No data found",
  description = "Nothing to show right now.",
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
