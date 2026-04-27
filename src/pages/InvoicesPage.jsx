import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import StatCard from "../components/common/StatCard";
import Table from "../components/common/Table";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import InvoiceDrawer from "../components/invoices/InvoiceDrawer";
import InvoiceForm from "../components/invoices/InvoiceForm";
import { useAppData } from "../context/AppDataContext";
import { createInvoice, deleteInvoice, getInvoices, updateInvoice } from "../api/invoiceApi";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);


  //fetch invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getInvoices();
      setInvoices(Array.isArray(data) ? data : [])
    } catch (err) {
      if(err.response?.status === 404 ){
        console.warn("Invoices API not ready yet")
        setInvoices([])
      } else {
        setError(err.response?.data?.message || "Failed to Load invoices")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  },[])

  //filtering
  const filtered = useMemo(() => {
    return invoices.filter((item) => {
      const matchesSearch = [item._id, item.customer]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : item.status.toLowerCase() === filter;

      return matchesSearch && matchesFilter;
    });
  }, [invoices, search, filter]);

  //create/update
  const handleSubmit = async (payload) => {
    try {
      if(editing) {
        await updateInvoice(editing._id,payload)
      } else {
        await createInvoice(payload)
      }
      await fetchInvoices()
      setEditing(null)
      setDrawerOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed")
    }
  }

  //delete
  const handleDelete = async () => {
    try {
      await deleteInvoice(deleteTarget._id);
      await fetchInvoices()
      setDeleteTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed")
    }
  }

  if (loading) {
    return <Loader text="Loading invoices..."/>
  }

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Payment summaries, billing states, invoice preview, and edit drawer."
        actionLabel="+ Create Invoice"
        secondaryActionLabel="Download PDFs"
        onAction={() => {
          setEditing(null);
          setDrawerOpen(true);
        }}
      />

       <ErrorState message={error}/>

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <StatCard
          title="All Invoices"
          value={invoices.length}
          note="Issued billing documents"
        />
        <StatCard
          title="Paid"
          value={invoices.filter((i) => i.status === "Paid").length}
          note="Completed payments"
        />
        <StatCard
          title="Unpaid"
          value={invoices.filter((i) => i.status === "Unpaid").length}
          note="Outstanding balances"
        />
        <StatCard
          title="Revenue"
          value={`€${invoices.reduce((sum, i) => sum + Number(i.amount || 0), 0)}`}
          note="Gross billed value"
        />
      </div>

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={[
          { label: "All Statuses", value: "all" },
          { label: "Paid", value: "paid" },
          { label: "Unpaid", value: "unpaid" },
        ]}
      />

       <Table title="Invoice Table" subtitle="Click preview or edit">
        {filtered.length === 0 ? (
          <EmptyState message="No invoices found"/>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.customer}</td>
                  <td>€{item.amount}</td>
                  <td>{item.date}</td>
                  <td>
                    <StatusBadge value={item.status} />
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelected(item)}
                      >
                        Preview
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditing(item);
                          setDrawerOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setDeleteTarget(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Table>

      <InvoiceDrawer
        open={!!selected}
        invoice={selected}
        onClose={() => setSelected(null)}
      />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Invoice" : "Create Invoice"}
      >
        <InvoiceForm
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete invoice"
        message={`Delete invoice ${deleteTarget?.id || ""}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
