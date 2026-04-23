import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Sparkles } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { customers, vehicles, jobs } = useAppData();

  const notifications = [
    "2 new appointments need confirmation",
    "1 invoice is still unpaid",
    "Brake Pads stock is low",
  ];

  const userName = auth?.user?.name || "User";
  const userEmail = auth?.user?.email || "";
  const userRole = auth?.user?.role || "user";
  const companyName = auth?.company?.name || "Company";

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const customerResults = customers
      .filter((item) =>
        [item.name, item.email, item.phone, item.id]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        id: `customer-${item.id}`,
        type: "Customer",
        title: item.name,
        subtitle: `${item.email} • ${item.phone}`,
        path: `/customers?highlight=${item.id}`,
      }));

    const vehicleResults = vehicles
      .filter((item) =>
        [item.brand, item.model, item.owner, item.plate, item.id]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        id: `vehicle-${item.id}`,
        type: "Vehicle",
        title: `${item.brand} ${item.model}`,
        subtitle: `${item.plate} • ${item.owner}`,
        path: `/vehicles?highlight=${item.id}`,
      }));

    const jobResults = jobs
      .filter((item) =>
        [item.issue, item.customer, item.vehicle, item.mechanic, item.id]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((item) => ({
        id: `job-${item.id}`,
        type: "Job",
        title: item.issue,
        subtitle: `${item.vehicle} • ${item.mechanic}`,
        path: `/jobs?highlight=${item.id}`,
      }));

    return [...customerResults, ...vehicleResults, ...jobResults].slice(0, 8);
  }, [query]);

  return (
    <header className="topbar" style={{ position: "relative" }}>
      <div>
        <h2 className="topbar-title">{companyName}</h2>
        <p className="topbar-subtitle">
          Manage workshop, vehicles, invoices, staff, and service workflow
        </p>
      </div>

      <div className="topbar-right" style={{ position: "relative" }}>
        <div style={{ position: "relative" }}>
          <form
            className="search-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              setShowSearchResults(true);
            }}
            style={{ minWidth: 360 }}
          >
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => {
                if (query.trim()) setShowSearchResults(true);
              }}
              placeholder="Search customers, vehicles, jobs..."
            />
          </form>

          {showSearchResults && query.trim() && (
            <div
              className="card"
              style={{
                position: "absolute",
                top: 60,
                left: 0,
                width: "100%",
                zIndex: 60,
                padding: 12,
              }}
            >
              <div className="card-head" style={{ marginBottom: 10 }}>
                <div>
                  <h3 className="card-title" style={{ fontSize: 18 }}>
                    Search Results
                  </h3>
                  <p className="card-subtitle">
                    {searchResults.length} match
                    {searchResults.length === 1 ? "" : "es"}
                  </p>
                </div>
              </div>

              {searchResults.length ? (
                <div className="mini-list">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      className="mini-item"
                      onClick={() => {
                        navigate(result.path);
                        setShowSearchResults(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        color: "inherit",
                        background: "rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      <div>
                        <p className="mini-item-title">
                          {result.title}
                          <span
                            style={{
                              marginLeft: 10,
                              fontSize: 12,
                              color: "#7dd3fc",
                              fontWeight: 700,
                            }}
                          >
                            {result.type}
                          </span>
                        </p>
                        <p className="mini-item-meta">{result.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: "20px 10px" }}>
                  No matches found.
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="icon-btn"
          type="button"
          onClick={() => alert("AI assistant opened.")}
        >
          <Sparkles size={18} />
        </button>

        <div style={{ position: "relative" }}>
          <button
            className="icon-btn"
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
              setShowSearchResults(false);
            }}
          >
            <Bell size={18} />
          </button>

          {showNotifications && (
            <div
              className="card"
              style={{
                position: "absolute",
                top: 56,
                right: 0,
                width: 320,
                zIndex: 50,
                padding: 14,
              }}
            >
              <div className="mini-list">
                {notifications.map((item, index) => (
                  <div key={index} className="mini-item">
                    <div
                      className="mini-item-meta"
                      style={{ margin: 0, color: "#e5ecf7" }}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="avatar"
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
              setShowSearchResults(false);
            }}
            style={{ border: "none", cursor: "pointer" }}
          >
            {initials}
          </button>

          {showProfileMenu && (
            <div
              className="card"
              style={{
                position: "absolute",
                top: 56,
                right: 0,
                width: 280,
                zIndex: 50,
                padding: 12,
              }}
            >
              <div
                style={{
                  padding: 12,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#ffffff",
                    marginBottom: 4,
                  }}
                >
                  {userName}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#94a3b8",
                    marginBottom: 4,
                  }}
                >
                  {userEmail}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#7dd3fc",
                  }}
                >
                  {companyName} • {userRole}
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/profile");
                  }}
                >
                  My Profile
                </button>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/settings");
                  }}
                >
                  Account Settings
                </button>

                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleLogout}
                  style={{
                    borderColor: "rgba(248,113,113,0.35)",
                    color: "#fca5a5",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
