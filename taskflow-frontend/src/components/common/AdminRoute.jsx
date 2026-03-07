import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/y";

function AdminRoute({ children }) {

  const { user } = useContext(AuthContext);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;