import { useNavigate } from "react-router-dom";
import { Euro, Car, Wrench, UserCog } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import AppointmentsList from "../components/dashboard/AppointmentsList";
import JobsOverview from "../components/dashboard/JobsOverview";
import { stats } from "../data/mockData";

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    navigate("/reports");
  };

  const handleNewAppointment = () => {
    navigate("/appointments");
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Monitor revenue, workshop activity, appointments, and repair operations in real time."
        actionLabel="+ New Appointment"
        secondaryActionLabel="Generate Report"
        onAction={handleNewAppointment}
        onSecondaryAction={handleGenerateReport}
      />

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <StatCard
          title="Today Revenue"
          value={`€${stats.revenueToday}`}
          note="Workshop billing updated live"
          icon={Euro}
        />
        <StatCard
          title="Vehicles in Service"
          value={stats.vehiclesInService}
          note="Cars currently in the garage"
          icon={Car}
        />
        <StatCard
          title="Pending Jobs"
          value={stats.pendingJobs}
          note="Need assignment or approval"
          icon={Wrench}
        />
        <StatCard
          title="Active Mechanics"
          value={stats.activeMechanics}
          note="Available on shift today"
          icon={UserCog}
        />
      </div>

      <div className="grid-2">
        <RevenueChart />
        <AppointmentsList />
      </div>

      <div style={{ height: 18 }} />

      <JobsOverview />
    </div>
  );
}
