import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {LogOut} from "lucide-react";
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
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-3 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          {user?.role === "ADMIN" ? "Admin Console" : "My Workspace"}
        </h2>
      </div>

      
      <div className="flex items-center gap-6">



        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-4">
          <Link to="/profile" className="group flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 text-white flex items-center justify-center font-bold shadow-md border-2 border-white group-hover:scale-105 transition-transform">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-gray-700 leading-none mb-1">{user?.name}</p>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">View Profile</p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut size={20} />
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