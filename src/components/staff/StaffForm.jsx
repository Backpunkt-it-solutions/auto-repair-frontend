export default function StaffForm({ initialData, onSubmit }) {
  const data = initialData || {
    name: "",
    role: "",
    phone: "",
    jobsToday: 0,
    utilization: 0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      name: form.get("name"),
      role: form.get("role"),
      phone: form.get("phone"),
      jobsToday: Number(form.get("jobsToday") || 0),
      utilization: Number(form.get("utilization") || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="name"
        defaultValue={data.name}
        placeholder="Staff name"
        required
      />
      <input name="role" defaultValue={data.role} placeholder="Role" required />
      <input
        name="phone"
        defaultValue={data.phone}
        placeholder="Phone"
        required
      />
      <input
        name="jobsToday"
        defaultValue={data.jobsToday}
        type="number"
        min="0"
        placeholder="Jobs today"
      />
      <input
        name="utilization"
        defaultValue={data.utilization}
        type="number"
        min="0"
        max="100"
        placeholder="Utilization %"
      />
      <button className="btn btn-primary" type="submit">
        Save Staff
      </button>
    </form>
  );
}
