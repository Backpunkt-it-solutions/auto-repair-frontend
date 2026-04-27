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
import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from "../api/vehicleApi";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

export default function VehiclesPage() {
  // const { vehicles, createVehicle, updateVehicle, deleteVehicle } =
  //   useAppData();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false);
  const [error,setError] = useState("")
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [params] = useSearchParams();

  const highlightId = params.get("highlight");

  //fetch vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await getVehicles()

      if (!Array.isArray(data)) {
        throw new Error("Invalid vehicles data");
      }

      setVehicles(data)

    } catch (err) {
      if(err.response?.status === 404 ){
        console.warn("Vehicles API not ready yet")
        setVehicles([])
      } else {
        setError(err.response?.data?.message || "Failed to load vehicles")
      }      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles();
  },[]);

  //search filter
  const filtered = useMemo(() => {
    return vehicles.filter((item) =>
      [item.brand, item.model, item.owner, item.plate, item._id]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [vehicles, search]);
  
  //highlight scroll
  useEffect(() => {
    if (!highlightId) return;
    const element = document.getElementById(`vehicle-${highlightId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId, filtered]);

  //create/update
  const handleSubmit = async (payload) => {
    try {
      setActionLoading(true)
      setError("")

      if (editing) {
        await updateVehicle(editing._id,payload)
      } else {
        await createVehicle(payload)
      }
      await fetchVehicles();
      setEditing(null)
      setDrawerOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed")
    } finally {
      setActionLoading(false)
    }
  }

  //delete
  const handleDelete = async () => {
    try {
      setActionLoading(true)
      setError("")

      await deleteVehicle(deleteTarget._id)
      await fetchVehicles();
      setDeleteTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed")
    } finally {
      setActionLoading(false)
    }
  }

  if(loading) {
    return <Loader text="Loading Vehicles..."/>
  }

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

      <ErrorState message={error}/>

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
        {filtered.length === 0 ? (
          <EmptyState 
            message={
              vehicles.length === 0
                ? "No vehicles added yet."
                : "No vehicles match your search."
            }/>
        ) : (
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
                const highlighted = highlightId === item._id;

                return (
                  <tr
                    key={item._id}
                    id={`vehicle-${item._id}`}
                    style={
                      highlighted
                        ? {
                            background: "rgba(79,140,255,0.12)",
                            outline: "1px solid rgba(79,140,255,0.3)",
                          }
                        : undefined
                    }
                  >
                    <td>{item._id}</td>
                    <td>{item.plate}</td>
                    <td>{item.brand}</td>
                    <td>{item.model}</td>
                    <td>{item.owner}</td>
                    <td>{item.lastService}</td>
                    <td>
                      {Number(item.mileage || 0).toLocaleString()} km
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
                );
              })}
            </tbody>
          </table>
        )}
      </Table>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Edit Vehicle" : "Create Vehicle"}
      >
        <VehicleForm
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete vehicle"
        message={`Delete ${deleteTarget?.brand || ""} ${deleteTarget?.model || ""}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
