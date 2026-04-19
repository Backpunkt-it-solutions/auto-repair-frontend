export default function CustomerForm({ initialData, onSubmit }) {
  const data = initialData || {
    name: "",
    email: "",
    phone: "",
    vehicles: 0,
    totalSpent: 0,
    loyalty: "Silver",
    notes: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      vehicles: Number(form.get("vehicles")),
      totalSpent: Number(form.get("totalSpent")),
      loyalty: form.get("loyalty"),
      notes: form.get("notes"),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="name"
        defaultValue={data.name}
        placeholder="Customer name"
        required
      />
      <input
        name="email"
        defaultValue={data.email}
        placeholder="Email"
        required
      />
      <input
        name="phone"
        defaultValue={data.phone}
        placeholder="Phone"
        required
      />
      <input
        name="vehicles"
        type="number"
        min="0"
        defaultValue={data.vehicles}
        placeholder="Vehicles"
      />
      <input
        name="totalSpent"
        type="number"
        min="0"
        defaultValue={data.totalSpent}
        placeholder="Total spent"
      />
      <select name="loyalty" defaultValue={data.loyalty}>
        <option>Gold</option>
        <option>Silver</option>
        <option>Standard</option>
      </select>
      <textarea
        name="notes"
        defaultValue={data.notes}
        placeholder="Notes"
        rows={4}
      />
      <button className="btn btn-primary" type="submit">
        Save Customer
      </button>
    </form>
  );
}
