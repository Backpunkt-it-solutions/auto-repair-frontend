import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import PageToolbar from "../components/common/PageToolbar";
import StatCard from "../components/common/StatCard";
import Modal from "../components/common/Modal";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import JobsKanban from "../components/jobs/JobsKanban";
import JobForm from "../components/jobs/JobForm";
import { useAppData } from "../context/AppDataContext";
import { createJob, deleteJob, getJobs, updateJob } from "../api/jobApi";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [params] = useSearchParams();

  const highlightId = params.get("highlight");

  // fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs();
      setJobs(data || [])
    } catch (err) {
      console.error(err);
      if(err.response?.status === 404 ){
        console.warn("Jobs API not ready yet")
        setJobs([])
      } else {
        setError(err.response?.data?.message || "Failed to load jobs")
      }
            
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs();
  },[])

  //filter
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

  //highlight
  useEffect(() => {
    if (!highlightId) return;
    const element = document.getElementById(`job-${highlightId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId, filtered]);

  //create/update
  const handleSubmit = async (payload) => {
    try {
      if (editing) {
        await updateJob(editing._id,payload);
      } else {
        await createJob(payload);
      }
      await fetchJobs()
      setShowForm(false)
      setEditing(null)
    } catch (err) {
      setError(err.response?.data?.message || "Operation Failed" )
    }
  }

  //delete
  const handleDelete = async () => {
    try {
      await deleteJob(deleteTarget._id)
      await fetchJobs();
      setDeleteTarget(null)
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed")
    }
  }

  //loading
  if(loading) {
    return <Loader text="Loading jobs..."/>
  }

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

      <ErrorState message={error}/>

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

     {filtered.length === 0 ? (
        <EmptyState message="No jobs found."/>
      ) : (
        <JobsKanban
          items={filtered.map((item) => ({
            ...item,
            _highlighted: highlightId === item._id,
          }))}
          onEdit={(item) => {
            setEditing(item);
            setShowForm(true);
          }}
          onDelete={(item) => setDeleteTarget(item)}
          onStatusChange={async (item, status) => {
            try {
              await updateJob(item._id, { status });
              await fetchJobs();
            } catch {
              setError("Failed to update status");
            }
          }}
        />
      )}

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editing ? "Edit Job" : "Create Job"}
      >
        <JobForm
          initialData={editing}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete job"
        message={`Delete "${deleteTarget?.issue || "this job"}"?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
