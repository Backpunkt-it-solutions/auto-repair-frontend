export default function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <div style={{ fontWeight: 700 }}>{label}</div>
        <div style={{ color: "#94a3b8", fontSize: 14 }}>{description}</div>
      </div>

      <button
        type="button"
        onClick={() => onChange?.(!checked)}
        style={{
          width: 62,
          height: 34,
          borderRadius: 999,
          border: "1px solid rgba(148,163,184,0.14)",
          background: checked
            ? "linear-gradient(135deg,#4f8cff,#38bdf8)"
            : "rgba(255,255,255,0.08)",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "white",
            position: "absolute",
            top: 4,
            left: checked ? 32 : 4,
            transition: "0.2s ease",
          }}
        />
      </button>
    </div>
  );
}
