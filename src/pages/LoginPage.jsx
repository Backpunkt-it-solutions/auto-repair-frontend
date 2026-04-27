import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, authLoading } = useAuth();

  const [form, setForm] = useState({
    slug: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.name === "slug" ? e.target.value.toLowerCase() : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanedForm = {
      slug: form.slug.trim(),
      email: form.email.trim(),
      password: form.password.trim()
    }

    if(!cleanedForm.slug || !cleanedForm.email || !cleanedForm.password){
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await login(cleanedForm);
      navigate("/");
    } catch (err) {
        setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={styles.loadingCard}>Checking session...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.wrapper}>
        <div style={styles.leftPanel}>
          <div style={styles.brandBadge}>Auto Repair SaaS</div>
          <h1 style={styles.heading}>Manage your workshop with confidence.</h1>
          <p style={styles.description}>
            Handle appointments, customers, vehicles, jobs, invoices, inventory,
            and staff from one professional dashboard.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              ✔ Multi-tenant garage management
            </div>
            <div style={styles.featureItem}>✔ Secure login by company</div>
            <div style={styles.featureItem}>
              ✔ Clean workflow for staff and jobs
            </div>
          </div>
        </div>

        <form style={styles.card} onSubmit={handleSubmit}>
          <div style={styles.cardTop}>
            <p style={styles.cardEyebrow}>Welcome back</p>
            <h2 style={styles.cardTitle}>Sign in</h2>
            <p style={styles.cardSubtitle}>
              Enter your company slug, email, and password.
            </p>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Company Slug</label>
            <input
              style={styles.input}
              name="slug"
              placeholder="e.g. autofix-duisburg"
              value={form.slug}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              name="email"
              type="email"
              placeholder="owner@autofix.de"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error ? <div style={styles.errorBox}>{error}</div> : null}

          <button style={styles.button} type="submit" disabled={loading|| !form.slug || !form.email || !form.password}>
            {loading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loadingWrap: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0f172a",
  },
  loadingCard: {
    background: "#fff",
    padding: "20px 24px",
    borderRadius: "16px",
    fontWeight: 600,
  },
  page: {
    minHeight: "100vh",
    position: "relative",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 45%, #1e293b 100%)",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(59,130,246,0.12), transparent 30%)",
  },
  wrapper: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    alignItems: "center",
    gap: "48px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  leftPanel: {
    color: "#e5eefc",
    paddingRight: "24px",
  },
  brandBadge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(59,130,246,0.14)",
    border: "1px solid rgba(147,197,253,0.22)",
    color: "#bfdbfe",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "22px",
  },
  heading: {
    fontSize: "52px",
    lineHeight: 1.05,
    margin: "0 0 18px",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  },
  description: {
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#cbd5e1",
    maxWidth: "620px",
    marginBottom: "28px",
  },
  featureList: {
    display: "grid",
    gap: "12px",
  },
  featureItem: {
    color: "#dbeafe",
    fontSize: "16px",
    fontWeight: 500,
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    justifySelf: "end",
    background: "rgba(255,255,255,0.96)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
    border: "1px solid rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    display: "grid",
    gap: "18px",
  },
  cardTop: {
    marginBottom: "6px",
  },
  cardEyebrow: {
    margin: 0,
    color: "#2563eb",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  cardTitle: {
    margin: "8px 0 6px",
    fontSize: "34px",
    lineHeight: 1.1,
    color: "#0f172a",
  },
  cardSubtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.6,
  },
  fieldGroup: {
    display: "grid",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#334155",
  },
  input: {
    height: "52px",
    border: "1px solid #cbd5e1",
    borderRadius: "14px",
    padding: "0 14px",
    fontSize: "15px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
  },
  errorBox: {
    background: "#fef2f2",
    color: "#b91c1c",
    border: "1px solid #fecaca",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 500,
  },
  button: {
    height: "54px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 12px 28px rgba(37,99,235,0.32)",
  },
};
