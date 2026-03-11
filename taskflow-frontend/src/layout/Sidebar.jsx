import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  ClipboardList, 
  Settings, 
  User as UserIcon, 
  ShieldCheck, 
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Briefcase,
  Home,
  GraduationCap,
  ChevronRight,
  Filter
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname + location.search === path;

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
      isActive(path)
        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20 font-medium"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800 overflow-y-auto custom-scrollbar">
      
      <div>
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">T</div>
          <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
        </div>

        {/* USER MENU */}
        {user?.role === "USER" && (
          <div className="space-y-6">
            {/* MAIN SECTION */}
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Main</p>
              <nav className="space-y-1">
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link to="/my-tasks" className={linkClass("/my-tasks")}>
                  <ClipboardList size={16} /> My Tasks
                </Link>
              </nav>
            </div>

            {/* TASK FILTERS SECTION */}
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Task Filters</p>
              <nav className="space-y-1">
                <Link to="/my-tasks?filter=all" className={linkClass("/my-tasks?filter=all")}>
                  <Filter size={16} /> All Tasks
                </Link>
                <Link to="/my-tasks?filter=pending" className={linkClass("/my-tasks?filter=pending")}>
                  <Clock size={16} /> Pending
                </Link>
                <Link to="/my-tasks?filter=completed" className={linkClass("/my-tasks?filter=completed")}>
                  <CheckCircle2 size={16} /> Completed
                </Link>
                <Link to="/my-tasks?filter=overdue" className={linkClass("/my-tasks?filter=overdue")}>
                  <AlertCircle size={16} /> Overdue
                </Link>
              </nav>
            </div>

            {/* CATEGORIES SECTION */}
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Categories</p>
              <nav className="space-y-1">
                <Link to="/my-tasks?category=work" className={linkClass("/my-tasks?category=work")}>
                  <Briefcase size={16} /> Work
                </Link>
                <Link to="/my-tasks?category=personal" className={linkClass("/my-tasks?category=personal")}>
                  <Home size={16} /> Personal
                </Link>
                <Link to="/my-tasks?category=study" className={linkClass("/my-tasks?category=study")}>
                  <GraduationCap size={16} /> Study
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* ADMIN MENU */}
        {user?.role === "ADMIN" && (
          <div className="space-y-6 mt-4">
            <div>
              <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Admin Panel</p>
              <nav className="space-y-1">
                <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                  <ShieldCheck size={16} /> Admin Dashboard
                </Link>
                <Link to="/admin/tasks" className={linkClass("/admin/tasks")}>
                  <ClipboardList size={16} /> All Tasks
                </Link>
                <Link to="/admin/users" className={linkClass("/admin/users")}>
                  <Users size={16} /> Users
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* USER PROFILE CARD */}
      <div className="border-t border-gray-800 pt-4 mt-4">
        <div className="px-2 mb-2">
           <Link to="/settings" className={linkClass("/settings")}>
              <Settings size={16} /> Settings
           </Link>
        </div>
        
        <Link 
          to="/profile" 
          className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
            location.pathname === "/profile" ? "bg-gray-800" : "hover:bg-gray-800/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm border border-blue-500 shadow-inner text-white">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate w-24">
                {user?.name}
              </p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">
                {user?.role}
              </p>
            </div>
          </div>
          <ChevronRight size={14} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;