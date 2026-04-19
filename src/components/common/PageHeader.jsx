export default function PageHeader({
  title,
  description,
  actionLabel,
  secondaryActionLabel,
  onAction,
  onSecondaryAction,
}) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="section-actions">
        {secondaryActionLabel ? (
          <button className="btn btn-secondary" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </button>
        ) : null}

        {actionLabel ? (
          <button className="btn btn-primary" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
