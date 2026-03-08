import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {

  const { user } = useContext(AuthContext);   // ✅ inside component

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-xl font-bold mb-8">TaskFlow</h1>

      <nav className="space-y-4">

        {/* USER MENU */}
        {user?.role === "USER" && (
          <>
            <Link to="/dashboard" className="block hover:text-blue-400">
              Dashboard
            </Link>

            <Link to="/my-tasks" className="block hover:text-blue-400">
              My Tasks
            </Link>
          </>
        )}

        {/* ADMIN MENU */}
        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin/dashboard" className="block hover:text-blue-400">
              Admin Dashboard
            </Link>

            <Link to="/admin/tasks" className="block hover:text-blue-400">
              All Tasks
            </Link>

            <Link to="/admin/users" className="block hover:text-blue-400">
              Users
            </Link>
          </>
        )}

      </nav>

      <div className="absolute bottom-5 text-sm">
        Logged in as <b>{user?.name}</b>
      </div>

    </div>
  );
}

export default Sidebar;