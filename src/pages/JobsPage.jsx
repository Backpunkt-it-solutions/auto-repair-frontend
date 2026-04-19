import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import StatCard from "../components/common/StatCard";
import Modal from "../components/common/Modal";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import JobsKanban from "../components/jobs/JobsKanban";
import JobForm from "../components/jobs/JobForm";
import { useAppData } from "../context/AppDataContext";

export default function JobsPage() {
  const { jobs, createJob, updateJob, deleteJob } = useAppData();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [params] = useSearchParams();

  const highlightId = params.get("highlight");

  const filtered = useMemo(() => {
    return jobs.filter((item) => {
      const matchesSearch = [
        item.customer,
        item.vehicle,
        item.issue,
        item.mechanic,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : item.priority.toLowerCase() === filter;

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  useEffect(() => {
    if (!highlightId) return;
    const element = document.getElementById(`job-${highlightId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId, filtered]);

  return (
    <div>
      <PageHeader
        title="Repair Jobs"
        description="Kanban repair workflow, progress states, and quick edit interactions."
        actionLabel="+ Create Job"
        secondaryActionLabel="Board Filters"
        onAction={() => {
          setEditing(null);
          setShowForm(true);
        }}
      />

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <StatCard
          title="All Jobs"
          value={jobs.length}
          note="Total tracked repair jobs"
        />
        <StatCard
          title="Pending"
          value={jobs.filter((j) => j.status === "Pending").length}
          note="Not started yet"
        />
        <StatCard
          title="In Progress"
          value={jobs.filter((j) => j.status === "In Progress").length}
          note="Active workshop load"
        />
        <StatCard
          title="Completed"
          value={jobs.filter((j) => j.status === "Completed").length}
          note="Finished tasks"
        />
      </div>

      <PageToolbar
        search={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        filterOptions={[
          { label: "All Priorities", value: "all" },
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ]}
      />

      <JobsKanban
        items={filtered.map((item) => ({
          ...item,
          _highlighted: highlightId === item.id,
        }))}
        onEdit={(item) => {
          setEditing(item);
          setShowForm(true);
        }}
        onDelete={(item) => setDeleteTarget(item)}
        onStatusChange={(item, status) => updateJob(item.id, { status })}
      />

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? "Edit Job" : "Create Job"}
      >
        <JobForm
          initialData={editing}
          onSubmit={(payload) => {
            if (editing) {
              updateJob(editing.id, payload);
            } else {
              createJob(payload);
            }
            setShowForm(false);
            setEditing(null);
          }}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete job"
        message={`Delete "${deleteTarget?.issue || "this job"}"?`}
        onConfirm={() => deleteJob(deleteTarget.id)}
      />
    </div>
  );
}
