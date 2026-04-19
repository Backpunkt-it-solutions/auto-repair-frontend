export default function InvoiceForm({ initialData, onSubmit }) {
  const data = initialData || {
    customer: "",
    amount: 0,
    date: "",
    status: "Unpaid",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      customer: form.get("customer"),
      amount: Number(form.get("amount") || 0),
      date: form.get("date"),
      status: form.get("status"),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="customer"
        defaultValue={data.customer}
        placeholder="Customer"
        required
      />
      <input
        name="amount"
        defaultValue={data.amount}
        type="number"
        min="0"
        placeholder="Amount"
      />
      <input name="date" defaultValue={data.date} type="date" />
      <select name="status" defaultValue={data.status}>
        <option>Paid</option>
        <option>Unpaid</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Save Invoice
      </button>
    </form>
  );
}
