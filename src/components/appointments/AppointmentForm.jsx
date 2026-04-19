export default function AppointmentForm({ initialData, onSubmit }) {
  const data = initialData || {
    customer: "",
    vehicle: "",
    service: "",
    date: "",
    status: "Pending",
    mechanic: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="customer"
        defaultValue={data.customer}
        placeholder="Customer name"
      />
      <input name="vehicle" defaultValue={data.vehicle} placeholder="Vehicle" />
      <input name="service" defaultValue={data.service} placeholder="Service" />
      <input name="date" defaultValue={data.date} type="datetime-local" />
      <input
        name="mechanic"
        defaultValue={data.mechanic}
        placeholder="Mechanic"
      />
      <select name="status" defaultValue={data.status}>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Completed</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Save Appointment
      </button>
    </form>
  );
}
