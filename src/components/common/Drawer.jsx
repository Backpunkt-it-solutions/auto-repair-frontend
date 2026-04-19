export default function Drawer({
  open,
  title,
  onClose,
  children,
  width = 520,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,10,20,0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 1200,
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          width: "100%",
          maxWidth: width,
          borderRadius: 0,
          overflowY: "auto",
          padding: 20,
        }}
      >
        <div className="card-head">
          <div>
            <h3 className="card-title" style={{ fontSize: 24 }}>
              {title}
            </h3>
          </div>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
