import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { auth, logout, setAuth } = useAuth();

  const user = auth?.user || {};
  const company = auth?.company || {};

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const initials = useMemo(() => {
    const name = profileForm.name || user?.name || "User";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profileForm.name, user?.name]);

  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();

    setAuth((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        name: profileForm.name,
      },
    }));

    setProfileMessage("Profile UI updated locally. Connect backend save next.");
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordMessage("Please fill all password fields.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New password and confirm password do not match.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage("New password must be at least 6 characters.");
      return;
    }

    setPasswordMessage("Password UI is ready. Connect backend API next.");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your account details, branding preview, and password settings."
      />

      <div className="grid-2">
        <section className="card" style={{ padding: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: 24,
                color: "#fff",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 12px 28px rgba(37,99,235,0.28)",
              }}
            >
              {initials}
            </div>

            <div>
              <h2 style={{ margin: 0 }}>{profileForm.name || "User"}</h2>
              <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleProfileSave}
            style={{ display: "grid", gap: 14 }}
          >
            <div style={fieldGroup}>
              <label style={labelStyle}>Full Name</label>
              <input
                className="input"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                placeholder="Enter full name"
              />
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>Email Address</label>
              <input
                className="input"
                value={user?.email || ""}
                disabled
                style={{ opacity: 0.8, cursor: "not-allowed" }}
              />
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>Role</label>
              <input
                className="input"
                value={user?.role || ""}
                disabled
                style={{ opacity: 0.8, cursor: "not-allowed" }}
              />
            </div>

            {profileMessage ? (
              <div style={successBox}>{profileMessage}</div>
            ) : null}

            <div>
              <button className="btn btn-primary" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </section>

        <section className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 18 }}>
            Company Branding Preview
          </h3>

          <div
            style={{
              borderRadius: 18,
              padding: 18,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(2,6,23,0.96))",
              border: "1px solid rgba(148,163,184,0.16)",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  background: company?.primaryColor || "#2563eb",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                {initials}
              </div>

              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>
                  {company?.name || "Company Name"}
                </div>
                <div style={{ color: "#94a3b8", marginTop: 4 }}>
                  {company?.slug || "company-slug"}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            <ProfileRow label="Company Name" value={company?.name} />
            <ProfileRow label="Slug" value={company?.slug} />
            <ProfileRow label="Plan" value={company?.plan} />
            <ProfileRow
              label="Primary Color"
              value={company?.primaryColor || "#2563eb"}
            />
            <ProfileRow
              label="Secondary Color"
              value={company?.secondaryColor || "#0f172a"}
            />
          </div>
        </section>
      </div>

      <div style={{ height: 18 }} />

      <div className="grid-2">
        <section className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 18 }}>Change Password</h3>

          <form
            onSubmit={handlePasswordSave}
            style={{ display: "grid", gap: 14 }}
          >
            <div style={fieldGroup}>
              <label style={labelStyle}>Current Password</label>
              <input
                className="input"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
              />
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>New Password</label>
              <input
                className="input"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>Confirm New Password</label>
              <input
                className="input"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </div>

            {passwordMessage ? (
              <div style={infoBox}>{passwordMessage}</div>
            ) : null}

            <div>
              <button className="btn btn-primary" type="submit">
                Update Password
              </button>
            </div>
          </form>
        </section>

        <section className="card" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0, marginBottom: 18 }}>Enabled Modules</h3>

          <div className="grid-2" style={{ marginBottom: 18 }}>
            <FeatureCard
              title="Appointments"
              enabled={!!company?.features?.appointments}
            />
            <FeatureCard
              title="Inventory"
              enabled={!!company?.features?.inventory}
            />
            <FeatureCard
              title="Invoices"
              enabled={!!company?.features?.invoices}
            />
            <FeatureCard
              title="Reports"
              enabled={!!company?.features?.reports}
            />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => navigate("/settings")}
            >
              Open Settings
            </button>

            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "170px 1fr",
        gap: 12,
        paddingBottom: 12,
        borderBottom: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      <span style={{ color: "#94a3b8", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "#e5ecf7", wordBreak: "break-word" }}>
        {value || "—"}
      </span>
    </div>
  );
}

function FeatureCard({ title, enabled }) {
  return (
    <div
      className="card"
      style={{
        padding: 16,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div
        style={{
          color: enabled ? "#86efac" : "#fca5a5",
          fontWeight: 600,
        }}
      >
        {enabled ? "Enabled" : "Disabled"}
      </div>
    </div>
  );
}

const fieldGroup = {
  display: "grid",
  gap: 8,
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 700,
  color: "#cbd5e1",
};

const successBox = {
  background: "rgba(34,197,94,0.12)",
  color: "#bbf7d0",
  border: "1px solid rgba(34,197,94,0.22)",
  padding: "12px 14px",
  borderRadius: 12,
  fontSize: 14,
};

const infoBox = {
  background: "rgba(59,130,246,0.12)",
  color: "#bfdbfe",
  border: "1px solid rgba(59,130,246,0.22)",
  padding: "12px 14px",
  borderRadius: 12,
  fontSize: 14,
};
