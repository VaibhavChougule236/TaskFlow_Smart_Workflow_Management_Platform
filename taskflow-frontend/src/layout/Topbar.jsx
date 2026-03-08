import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Topbar() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div className="flex items-center justify-between bg-white px-6 py-3 border-b">

      <h2 className="text-lg font-semibold">
        TaskFlow Dashboard
      </h2>

      <div className="flex items-center gap-4">

        {/* search */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="border px-3 py-1 rounded"
        />

        {/* add task */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Add Task
        </button>

        {/* user */}
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            className="text-red-500 text-sm"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Topbar;