import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600 tracking-tighter">
          TaskFlow
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}
                className="flex items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-all shadow-sm border border-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Manage work <br />
          <span className="text-blue-600">without the chaos.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
          TaskFlow is a modern management system designed to help you organize
          tasks, secure your data with JWT, and track your productivity in
          real-time.
        </p>
        <Link
          to={user ? "/dashboard" : "/register"}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
        >
          {user ? "Back to Dashboard" : "Start for Free"}{" "}
          <ArrowRight size={20} />
        </Link>
      </header>

      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Smart CRUD</h3>
          <p className="text-slate-500 leading-relaxed">
            Create, categorize, and track tasks with our highly intuitive and
            responsive interface.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">JWT Security</h3>
          <p className="text-slate-500 leading-relaxed">
            Your data is locked tight with industry-standard Spring Security and
            JWT tokenization.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <BarChart3 size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3">Admin Analytics</h3>
          <p className="text-slate-500 leading-relaxed">
            Gain deep insights into productivity trends with our comprehensive
            admin dashboard.
          </p>
        </div>
      </section>

      <footer className="text-center py-10 text-slate-400 text-sm font-medium">
        © 2026 TaskFlow • Built by Vaibhav Chougule
      </footer>
    </div>
  );
}

export default Home;