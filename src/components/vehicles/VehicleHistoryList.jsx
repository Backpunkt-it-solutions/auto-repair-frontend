export default function VehicleHistoryList({ items = [] }) {
  return (
    <div className="grid-2">
      {items.map((vehicle) => (
        <div className="card" key={vehicle.id}>
          <div className="card-head">
            <div>
              <h3 className="card-title" style={{ fontSize: 24 }}>
                {vehicle.brand} {vehicle.model}
              </h3>
              <p className="card-subtitle">
                {vehicle.plate} • {vehicle.owner}
              </p>
            </div>
            <div className="badge neutral">
              {vehicle.mileage.toLocaleString()} km
            </div>
          </div>

          <div className="mini-list">
            {vehicle.history.map((entry, index) => (
              <div className="mini-item" key={index}>
                <div>
                  <p className="mini-item-title">{entry.title}</p>
                  <p className="mini-item-meta">{entry.date}</p>
                </div>
                <strong>€{entry.amount}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
