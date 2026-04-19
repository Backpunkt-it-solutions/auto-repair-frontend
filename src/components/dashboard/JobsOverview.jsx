import { jobs } from "../../data/mockData";
import StatusBadge from "../common/StatusBadge";

export default function JobsOverview() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <h3 className="card-title">Live Repair Queue</h3>
          <p className="card-subtitle">Active workshop jobs today</p>
        </div>
      </div>

      <div className="mini-list">
        {jobs.map((job) => (
          <div key={job.id} className="mini-item">
            <div>
              <p className="mini-item-title">{job.issue}</p>
              <p className="mini-item-meta">
                {job.vehicle} • {job.mechanic}
              </p>
            </div>
            <StatusBadge value={job.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
