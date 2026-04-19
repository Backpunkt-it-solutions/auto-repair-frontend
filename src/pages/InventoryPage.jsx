import { useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import Table from "../components/common/Table";
import StatusBadge from "../components/common/StatusBadge";
import Drawer from "../components/common/Drawer";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import InventoryAlerts from "../components/inventory/InventoryAlerts";
import InventoryForm from "../components/inventory/InventoryForm";
import { useAppData } from "../context/AppDataContext";

export default function InventoryPage() {
  const {
    inventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  } = useAppData();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = [item.item, item.category, item.supplier]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : item.status.toLowerCase() === filter;

      return matchesSearch && matchesFilter;
    });
  }, [inventory, search, filter]);

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Stock widgets, supplier visibility, and low-stock alert monitoring."
        actionLabel="+ Add Item"
        secondaryActionLabel="Reorder Plan"
        onAction={() => {
          setEditing(null);
          setDrawerOpen(true);
        }}
      />

      <InventoryAlerts items={inventory} />

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={[
          { label: "All Statuses", value: "all" },
          { label: "Low Stock", value: "low stock" },
          { label: "Available", value: "available" },
        ]}
      />

      <Table title="Inventory Table" subtitle="Live stock overview">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Supplier</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.supplier}</td>
                <td>
                  <StatusBadge value={item.status} />
                </td>
                <td>
                  <div className="row-actions">
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

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Inventory Item" : "Create Inventory Item"}
      >
        <InventoryForm
          initialData={editing}
          onSubmit={(payload) => {
            if (editing) {
              updateInventoryItem(editing.id, payload);
            } else {
              createInventoryItem(payload);
            }
            setEditing(null);
            setDrawerOpen(false);
          }}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete inventory item"
        message={`Delete ${deleteTarget?.item || "this item"}?`}
        onConfirm={() => deleteInventoryItem(deleteTarget.id)}
      />
    </div>
  );
}
