import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <aside className="w-64 bg-[#1E1E1E] text-white p-6">

      <h1 className="text-xl font-bold mb-8">
        TaskFlow
      </h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className="block hover:text-blue-400"
        >
          All Tasks
        </NavLink>

        <NavLink
          to="/dashboard?filter=today"
          className="block hover:text-blue-400"
        >
          Today
        </NavLink>

        <NavLink
          to="/dashboard?filter=completed"
          className="block hover:text-blue-400"
        >
          Completed
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;