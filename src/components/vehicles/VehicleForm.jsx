export default function VehicleForm({ initialData, onSubmit }) {
  const data = initialData || {
    plate: "",
    brand: "",
    model: "",
    owner: "",
    lastService: "",
    mileage: 0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      plate: form.get("plate"),
      brand: form.get("brand"),
      model: form.get("model"),
      owner: form.get("owner"),
      lastService: form.get("lastService"),
      mileage: Number(form.get("mileage") || 0),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="plate"
        defaultValue={data.plate}
        placeholder="Plate number"
        required
      />
      <input
        name="brand"
        defaultValue={data.brand}
        placeholder="Brand"
        required
      />
      <input
        name="model"
        defaultValue={data.model}
        placeholder="Model"
        required
      />
      <input
        name="owner"
        defaultValue={data.owner}
        placeholder="Owner"
        required
      />
      <input name="lastService" defaultValue={data.lastService} type="date" />
      <input
        name="mileage"
        defaultValue={data.mileage}
        type="number"
        min="0"
        placeholder="Mileage"
      />
      <button className="btn btn-primary" type="submit">
        Save Vehicle
      </button>
    </form>
  );
}
