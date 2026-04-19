import { useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import StatCard from "../components/common/StatCard";
import Modal from "../components/common/Modal";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import AppointmentCalendarBoard from "../components/appointments/AppointmentCalendarBoard";
import AppointmentCrudForm from "../components/appointments/AppointmentCrudForm";
import { useAppData } from "../context/AppDataContext";

export default function AppointmentsPage() {
  const {
    appointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppData();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch = [item.customer, item.vehicle, item.service]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ? true : item.status.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  return (
    <div>
      <PageHeader
        title="Appointments"
        description="Calendar-style planning, booking filters, and quick repair actions."
        actionLabel="+ Create Appointment"
        secondaryActionLabel="Calendar Sync"
        onAction={() => {
          setEditing(null);
          setOpen(true);
        }}
      />

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <StatCard
          title="All Bookings"
          value={appointments.length}
          note="Upcoming workshop reservations"
        />
        <StatCard
          title="Pending"
          value={appointments.filter((i) => i.status === "Pending").length}
          note="Awaiting confirmation"
        />
        <StatCard
          title="Confirmed"
          value={appointments.filter((i) => i.status === "Confirmed").length}
          note="Approved jobs"
        />
        <StatCard
          title="Completed"
          value={appointments.filter((i) => i.status === "Completed").length}
          note="Finished visits"
        />
      </div>

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={[
          { label: "All Statuses", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Confirmed", value: "confirmed" },
          { label: "Completed", value: "completed" },
        ]}
        rightAction={
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Quick Add
          </button>
        }
      />

      <AppointmentCalendarBoard
        items={filtered}
        onEdit={(item) => {
          setEditing(item);
          setOpen(true);
        }}
        onDelete={(item) => setDeleteTarget(item)}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Appointment" : "Create Appointment"}
      >
        <AppointmentCrudForm
          initialData={editing}
          onSubmit={(payload) => {
            if (editing) {
              updateAppointment(editing.id, payload);
            } else {
              createAppointment(payload);
            }
            setOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete appointment"
        message={`Delete appointment for ${deleteTarget?.customer || "this customer"}?`}
        onConfirm={() => deleteAppointment(deleteTarget.id)}
      />
    </div>
  );
}
