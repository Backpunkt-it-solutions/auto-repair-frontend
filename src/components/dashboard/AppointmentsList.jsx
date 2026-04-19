import { appointments } from "../../data/mockData";
import StatusBadge from "../common/StatusBadge";

export default function AppointmentsList() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h3 className="card-title">Upcoming Appointments</h3>
          <p className="card-subtitle">Scheduled customer bookings</p>
        </div>
      </div>

      <div className="mini-list">
        {appointments.map((item) => (
          <div key={item.id} className="mini-item">
            <div>
              <p className="mini-item-title">{item.customer}</p>
              <p className="mini-item-meta">
                {item.vehicle} • {item.service}
              </p>
            </div>
            <StatusBadge value={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
