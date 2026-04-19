export default function Table({ title, subtitle, children, action = null }) {
  return (
    <section className="card table-shell">
      <div className="card-head">
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
        </div>
        {action}
      </div>

      <div className="table-wrap">{children}</div>
    </section>
  );
}
