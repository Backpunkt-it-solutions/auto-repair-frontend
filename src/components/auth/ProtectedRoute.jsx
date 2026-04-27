import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { auth, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
        }}
      >
        Checking session...
      </div>
    );
  }

  if (!auth?.token || !auth?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}