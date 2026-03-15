import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, Sun, Moon } from "lucide-react";
import AddTaskModal from "../components/tasks/AddTaskModal";
import { IMAGE_URL } from "../api/axios";

function Topbar({ onMenuClick }) {
  const [openModal, setOpenModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 md:px-8 py-3 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-slate-100 tracking-tight truncate">
          {user?.role === "ADMIN" ? "Admin Console" : "My Workspace"}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="hidden sm:block h-6 w-[1px] bg-gray-200 dark:bg-slate-700 mx-1"></div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/profile" className="group flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden shadow-md border-2 border-white dark:border-slate-700 group-hover:scale-105 transition-transform shrink-0">
              {(user?.imagePath || user?.image_path) ? (
                <img
                  src={`${IMAGE_URL}${user.imagePath || user.image_path}`}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-400 text-white flex items-center justify-center font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-bold text-gray-700 dark:text-slate-200 leading-none mb-1">{user?.name}</p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-tighter">View Profile</p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
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