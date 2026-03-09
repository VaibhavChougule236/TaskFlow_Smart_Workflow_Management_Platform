import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "../components/tasks/AddTaskModal";

function Topbar() {

  const [openModal, setOpenModal] = useState(false);
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

       

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Task
        </button>

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

      <AddTaskModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
}

export default Topbar;