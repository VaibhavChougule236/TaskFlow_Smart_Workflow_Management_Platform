import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ children, role }) {

  const { user } = useContext(AuthContext);

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;