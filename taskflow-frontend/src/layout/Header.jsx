import { LayoutDashboard, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl w-full mx-auto">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">T</div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">TaskFlow</h1>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                                className="flex items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors text-sm"
                            >
                                <LayoutDashboard size={18} />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="font-semibold text-sm hover:text-blue-600 transition-colors">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;