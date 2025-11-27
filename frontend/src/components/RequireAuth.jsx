import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children, allowedRoles = [] }) {
  const { user } = useContext(AuthContext);
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}
