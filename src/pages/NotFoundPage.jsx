import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      className="card"
      style={{ maxWidth: 640, margin: "60px auto", textAlign: "center" }}
    >
      <h1 style={{ fontSize: 72, marginBottom: 8 }}>404</h1>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p className="card-subtitle" style={{ marginBottom: 24 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}
