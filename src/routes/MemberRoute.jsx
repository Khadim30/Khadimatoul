import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MemberRoute({ children }) {
  const { user, role } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role === "admin") return <Navigate to="/admin/dashboard" />;

  return children;
}