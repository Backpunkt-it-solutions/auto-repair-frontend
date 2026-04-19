import { useMemo, useState } from "react";
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

export default function InvoicesPage() {
  const { invoices, createInvoice, updateInvoice, deleteInvoice } =
    useAppData();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return invoices.filter((item) => {
      const matchesSearch = [item.id, item.customer]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : item.status.toLowerCase() === filter;

      return matchesSearch && matchesFilter;
    });
  }, [invoices, search, filter]);

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
              <tr key={item.id}>
                <td>{item.id}</td>
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
          onSubmit={(payload) => {
            const finalPayload = editing
              ? payload
              : {
                  ...payload,
                  items: [
                    {
                      label: "Workshop service",
                      amount: Number(payload.amount || 0),
                    },
                  ],
                };

            if (editing) {
              updateInvoice(editing.id, finalPayload);
            } else {
              createInvoice(finalPayload);
            }
            setEditing(null);
            setDrawerOpen(false);
          }}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete invoice"
        message={`Delete invoice ${deleteTarget?.id || ""}?`}
        onConfirm={() => deleteInvoice(deleteTarget.id)}
      />
    </div>
  );
}
