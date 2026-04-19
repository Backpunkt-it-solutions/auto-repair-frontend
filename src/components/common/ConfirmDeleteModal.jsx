import Modal from "./Modal";

export default function ConfirmDeleteModal({
  open,
  title = "Delete item",
  message = "Are you sure?",
  onClose,
  onConfirm,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} width={520}>
      <div style={{ display: "grid", gap: 16 }}>
        <p style={{ color: "#94a3b8", margin: 0 }}>{message}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
