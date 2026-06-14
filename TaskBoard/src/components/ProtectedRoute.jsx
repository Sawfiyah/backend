// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/authService";

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return children;
}
