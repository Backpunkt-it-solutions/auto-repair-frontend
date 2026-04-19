import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import StatCard from "../components/common/StatCard";
import Table from "../components/common/Table";
import Drawer from "../components/common/Drawer";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import VehicleForm from "../components/vehicles/VehicleForm";
import { useAppData } from "../context/AppDataContext";

export default function VehiclesPage() {
  const { vehicles, createVehicle, updateVehicle, deleteVehicle } =
    useAppData();

  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [params] = useSearchParams();

  const highlightId = params.get("highlight");

  const filtered = useMemo(() => {
    return vehicles.filter((item) =>
      [item.brand, item.model, item.owner, item.plate, item.id]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [vehicles, search]);

  useEffect(() => {
    if (!highlightId) return;
    const element = document.getElementById(`vehicle-${highlightId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId, filtered]);

  return (
    <div>
      <PageHeader
        title="Vehicles"
        description="Vehicle records with owner visibility, service history, and maintenance context."
        actionLabel="+ Add Vehicle"
        secondaryActionLabel="Export History"
        onAction={() => {
          setEditing(null);
          setDrawerOpen(true);
        }}
      />

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <StatCard
          title="Vehicles"
          value={vehicles.length}
          note="Registered records"
        />
        <StatCard
          title="Average Mileage"
          value={`${Math.round(
            vehicles.reduce((sum, v) => sum + Number(v.mileage || 0), 0) /
              Math.max(vehicles.length, 1),
          ).toLocaleString()} km`}
          note="Across registered units"
        />
        <StatCard
          title="Due Services"
          value={vehicles.length}
          note="Check service planning"
        />
        <StatCard
          title="Owners"
          value={new Set(vehicles.map((v) => v.owner)).size}
          note="Unique vehicle owners"
        />
      </div>

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        rightAction={<button className="btn btn-secondary">Service Due</button>}
      />

      <Table title="Vehicle Records" subtitle="Row actions open edit drawer">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Plate</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Owner</th>
              <th>Last Service</th>
              <th>Mileage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const highlighted = highlightId === item.id;
              return (
                <tr
                  key={item.id}
                  id={`vehicle-${item.id}`}
                  style={
                    highlighted
                      ? {
                          background: "rgba(79,140,255,0.12)",
                          outline: "1px solid rgba(79,140,255,0.3)",
                        }
                      : undefined
                  }
                >
                  <td>{item.id}</td>
                  <td>{item.plate}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{item.owner}</td>
                  <td>{item.lastService}</td>
                  <td>{Number(item.mileage || 0).toLocaleString()} km</td>
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
              );
            })}
          </tbody>
        </table>
      </Table>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Vehicle" : "Create Vehicle"}
      >
        <VehicleForm
          initialData={editing}
          onSubmit={(payload) => {
            if (editing) {
              updateVehicle(editing.id, payload);
            } else {
              createVehicle(payload);
            }
            setEditing(null);
            setDrawerOpen(false);
          }}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete vehicle"
        message={`Delete ${deleteTarget?.brand || ""} ${deleteTarget?.model || ""}?`}
        onConfirm={() => deleteVehicle(deleteTarget.id)}
      />
    </div>
  );
}
