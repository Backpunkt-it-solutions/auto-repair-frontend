import Modal from "../common/Modal";
import StatusBadge from "../common/StatusBadge";

export default function InvoiceDrawer({ open, invoice, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={invoice?.id || "Invoice Preview"}
      width={760}
    >
      {invoice ? (
        <div style={{ display: "grid", gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 22 }}>
                  {invoice.customer}
                </div>
                <div style={{ color: "#94a3b8" }}>{invoice.date}</div>
              </div>
              <StatusBadge value={invoice.status} />
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.label}</td>
                    <td>€{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <span>Total</span>
              <span>€{invoice.amount}</span>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
