import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react"; // Added Menu
import AddTaskModal from "../components/tasks/AddTaskModal";

function Topbar({ onMenuClick }) { // Receive toggle function
  const [openModal, setOpenModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 md:px-8 py-3 border-b border-gray-100">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - Visible on lg:hidden */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight truncate">
          {user?.role === "ADMIN" ? "Admin Console" : "My Workspace"}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:block h-6 w-[1px] bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/profile" className="group flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 text-white flex items-center justify-center font-bold shadow-md border-2 border-white group-hover:scale-105 transition-transform shrink-0">
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
            <LogOut size={18} className="md:w-5" />
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