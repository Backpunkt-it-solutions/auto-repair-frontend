import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CarFront,
  Wrench,
  Boxes,
  ReceiptText,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/vehicles", label: "Vehicles", icon: CarFront },
  { to: "/jobs", label: "Repair Jobs", icon: Wrench },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/invoices", label: "Invoices", icon: ReceiptText },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/staff", label: "Staff", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-box">
        <div className="brand-top">
          <div className="brand-logo">
            <Wrench size={24} />
          </div>
          <div>
            <h2 className="brand-title">WerkstattPro</h2>
            <p className="brand-subtitle">Premium Auto Repair Suite</p>
          </div>
        </div>
      </div>

      <div className="sidebar-section-label">Navigation</div>

      <nav className="nav-list">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon className="nav-icon" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
