import { LayoutDashboard, LogOut, Sun, Moon } from "lucide-react"; 
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react"; 
import { Link } from "react-router-dom";

function Header() {
    const { user, logout } = useContext(AuthContext);
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

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl w-full mx-auto">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">T</div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TaskFlow</h1>
                </Link>

                <div className="flex items-center gap-4">
                    
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                                className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors text-sm"
                            >
                                <LayoutDashboard size={18} />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100 dark:border-red-900/30"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;