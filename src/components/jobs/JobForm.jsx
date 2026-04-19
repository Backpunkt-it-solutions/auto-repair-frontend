export default function JobForm({ initialData, onSubmit }) {
  const data = initialData || {
    customer: "",
    vehicle: "",
    issue: "",
    mechanic: "",
    status: "Pending",
    priority: "Medium",
    laborCost: 0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      customer: form.get("customer"),
      vehicle: form.get("vehicle"),
      issue: form.get("issue"),
      mechanic: form.get("mechanic"),
      status: form.get("status"),
      priority: form.get("priority"),
      laborCost: Number(form.get("laborCost")),
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
        name="vehicle"
        defaultValue={data.vehicle}
        placeholder="Vehicle"
        required
      />
      <input
        name="issue"
        defaultValue={data.issue}
        placeholder="Issue"
        required
      />
      <input
        name="mechanic"
        defaultValue={data.mechanic}
        placeholder="Mechanic"
        required
      />
      <select name="status" defaultValue={data.status}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select name="priority" defaultValue={data.priority}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input
        name="laborCost"
        type="number"
        min="0"
        defaultValue={data.laborCost}
        placeholder="Labor cost"
      />
      <button className="btn btn-primary" type="submit">
        Save Job
      </button>
    </form>
  );
}
