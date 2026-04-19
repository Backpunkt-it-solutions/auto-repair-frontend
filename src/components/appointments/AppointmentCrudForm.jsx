export default function AppointmentCrudForm({ initialData, onSubmit }) {
  const data = initialData || {
    customer: "",
    vehicle: "",
    service: "",
    date: "",
    status: "Pending",
    mechanic: "",
  };

  const normalizedDate =
    data.date && String(data.date).includes("T")
      ? String(data.date).slice(0, 16)
      : data.date;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      customer: form.get("customer"),
      vehicle: form.get("vehicle"),
      service: form.get("service"),
      date: form.get("date"),
      status: form.get("status"),
      mechanic: form.get("mechanic"),
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
        name="service"
        defaultValue={data.service}
        placeholder="Service"
        required
      />
      <input
        name="date"
        type="datetime-local"
        defaultValue={normalizedDate}
        required
      />
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
