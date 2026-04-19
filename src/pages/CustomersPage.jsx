import { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import PageHeader from "../components/common/PageHeader";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/api/customers");
      setCustomers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((item) =>
      [item.name, item.email, item.phone, item.address, item.notes]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [customers, search]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.post("/api/customers", form);
      setForm(emptyForm);
      await fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create customer");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this customer?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/customers/${id}`);
      await fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete customer");
    }
  };

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage your workshop customers with tenant-safe live API data."
      />

      <div className="card" style={{ marginBottom: 18, padding: 18 }}>
        <form
          onSubmit={handleCreate}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          <input
            name="name"
            placeholder="Customer name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="input"
          />
          <input
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="input"
            style={{ gridColumn: "1 / -1" }}
          />

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Customer"}
            </button>

            <input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ maxWidth: 320 }}
            />
          </div>
        </form>

        {error ? (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 12,
              background: "rgba(220,38,38,0.12)",
              color: "#fecaca",
              border: "1px solid rgba(248,113,113,0.2)",
            }}
          >
            {error}
          </div>
        ) : null}
      </div>

      <div className="card" style={{ padding: 18 }}>
        {loading ? (
          <div>Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="empty-state">No customers found.</div>
        ) : (
          <div className="mini-list">
            {filteredCustomers.map((customer) => (
              <div
                key={customer._id}
                className="mini-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div>
                  <p className="mini-item-title">{customer.name}</p>
                  <p className="mini-item-meta">
                    {customer.email || "No email"} •{" "}
                    {customer.phone || "No phone"}
                  </p>
                  <p className="mini-item-meta">
                    {customer.address || "No address"}
                  </p>
                  {customer.notes ? (
                    <p className="mini-item-meta">{customer.notes}</p>
                  ) : null}
                </div>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => handleDelete(customer._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
