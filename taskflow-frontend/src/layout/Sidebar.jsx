import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {

  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700"
    }`;

  return (

    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">

      {/* TOP SECTION */}
      <div>

        <h1 className="text-xl font-bold mb-6">TaskFlow</h1>

        {/* USER MENU */}
        {user?.role === "USER" && (
          <>
            <p className="text-xs text-gray-400 mb-2">MAIN</p>

            <nav className="space-y-2 mb-6">

              <Link to="/dashboard" className={linkClass("/dashboard")}>
                📊 Dashboard
              </Link>

              <Link to="/my-tasks" className={linkClass("/my-tasks")}>
                📋 My Tasks
              </Link>

            </nav>

            {/* TASK FILTERS */}

            <p className="text-xs text-gray-400 mb-2">TASK FILTERS</p>

            <nav className="space-y-2 mb-6">

              <Link to="/my-tasks?filter=all" className="block px-4 py-2 hover:bg-gray-700 rounded">
                📁 All Tasks
              </Link>

              <Link to="/my-tasks?filter=pending" className="block px-4 py-2 hover:bg-gray-700 rounded">
                ⏳ Pending
              </Link>

              <Link to="/my-tasks?filter=completed" className="block px-4 py-2 hover:bg-gray-700 rounded">
                ✅ Completed
              </Link>

              <Link to="/my-tasks?filter=overdue" className="block px-4 py-2 hover:bg-gray-700 rounded">
                ⚠️ Overdue
              </Link>

            </nav>

            {/* CATEGORIES */}

            <p className="text-xs text-gray-400 mb-2">CATEGORIES</p>

            <nav className="space-y-2">

              <Link to="/my-tasks?category=work" className="block px-4 py-2 hover:bg-gray-700 rounded">
                💼 Work
              </Link>

              <Link to="/my-tasks?category=personal" className="block px-4 py-2 hover:bg-gray-700 rounded">
                🏠 Personal
              </Link>

              <Link to="/my-tasks?category=study" className="block px-4 py-2 hover:bg-gray-700 rounded">
                📚 Study
              </Link>

            </nav>
          </>
        )}

        {/* ADMIN MENU */}

        {user?.role === "ADMIN" && (
          <>
            <p className="text-xs text-gray-400 mb-2">ADMIN PANEL</p>

            <nav className="space-y-2">

              <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                📊 Admin Dashboard
              </Link>

              <Link to="/admin/tasks" className={linkClass("/admin/tasks")}>
                📋 All Tasks
              </Link>

              <Link to="/admin/users" className={linkClass("/admin/users")}>
                👥 Users
              </Link>

            </nav>
          </>
        )}

      </div>

      {/* USER PROFILE */}

      <div className="border-t border-gray-700 pt-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="text-sm">

            <p className="font-medium">
              {user?.name}
            </p>

            <p className="text-gray-400 text-xs">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Sidebar;