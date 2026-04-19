export default function InventoryForm({ initialData, onSubmit }) {
  const data = initialData || {
    item: "",
    category: "",
    stock: 0,
    supplier: "",
    status: "Available",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    onSubmit?.({
      item: form.get("item"),
      category: form.get("category"),
      stock: Number(form.get("stock") || 0),
      supplier: form.get("supplier"),
      status: form.get("status"),
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <input
        name="item"
        defaultValue={data.item}
        placeholder="Item name"
        required
      />
      <input
        name="category"
        defaultValue={data.category}
        placeholder="Category"
        required
      />
      <input
        name="stock"
        defaultValue={data.stock}
        type="number"
        min="0"
        placeholder="Stock"
      />
      <input
        name="supplier"
        defaultValue={data.supplier}
        placeholder="Supplier"
        required
      />
      <select name="status" defaultValue={data.status}>
        <option>Available</option>
        <option>Low Stock</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Save Item
      </button>
    </form>
  );
}
