import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Table from "../components/common/Table";
import Drawer from "../components/common/Drawer";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import StaffWorkloadCards from "../components/staff/StaffWorkloadCards";
import StaffForm from "../components/staff/StaffForm";
import { useAppData } from "../context/AppDataContext";

export default function StaffPage() {
  const { staff, createStaff, updateStaff, deleteStaff } = useAppData();

  const [editing, setEditing] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  return (
    <div>
      <PageHeader
        title="Staff"
        description="Performance cards, technician workload, and team overview."
        actionLabel="+ Add Staff"
        secondaryActionLabel="Shift Planner"
        onAction={() => {
          setEditing(null);
          setDrawerOpen(true);
        }}
      />

      <StaffWorkloadCards items={staff} />

      <Table title="Staff Table" subtitle="Workshop mechanics and specialists">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Jobs Today</th>
              <th>Utilization</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.phone}</td>
                <td>{member.jobsToday}</td>
                <td>{member.utilization}%</td>
                <td>
                  <div className="row-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(member);
                        setDrawerOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setDeleteTarget(member)}
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
        title={editing ? "Edit Staff" : "Create Staff"}
      >
        <StaffForm
          initialData={editing}
          onSubmit={(payload) => {
            if (editing) {
              updateStaff(editing.id, payload);
            } else {
              createStaff(payload);
            }
            setEditing(null);
            setDrawerOpen(false);
          }}
        />
      </Drawer>

      <ConfirmDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete staff member"
        message={`Delete ${deleteTarget?.name || "this staff member"}?`}
        onConfirm={() => deleteStaff(deleteTarget.id)}
      />
    </div>
  );
}
