import { useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import PageHeader from "../components/common/PageHeader";
import { createCustomer, deleteCustomer, getCustomers } from "../api/customerApi";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";


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

      const  data  = await getCustomers();
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
     if (!Array.isArray(customers)) return [];

    const q = search.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter((item) =>
      [item.name, item.email, item.phone, item.address, item.notes]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [customers, search]);

  console.log("customers:", customers);
  console.log("filteredCustomers:", filteredCustomers);
  console.log("search:", search);

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

      await createCustomer(form);
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
      await deleteCustomer(id);
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

      <ErrorState message={error}/>

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
      </div>

      <div className="card" style={{ padding: 18 }}>
        {loading ? (
          <Loader text="Loading customers..."/>
        ) : !filteredCustomers || filteredCustomers.length === 0? (
          <EmptyState message="No customers found."/>
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
