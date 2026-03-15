import { useState } from "react";
import { changePassword } from "../../services/userService";
import { success, error } from "../../utils/toast";
import { KeyRound, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword(form);
      success("Password updated successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      error(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 transition-colors duration-300">
      {/* Back Button */}
      <Link 
        to="/settings" 
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-all font-medium group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Settings
      </Link>
      
      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
        {/* Icon Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl">
            <KeyRound size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Password</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Security & Protection</p>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
          Ensure your account is using a long, random password to stay secure.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">
              Old Password
            </label>
            <input
              type="password"
              required
              value={form.oldPassword}
              onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder:dark:text-slate-600"
              placeholder="••••••••"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 dark:text-white placeholder:dark:text-slate-600"
              placeholder="••••••••"
            />
          </div>

          {/* Action Button */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:bg-blue-300 dark:disabled:bg-blue-900/50 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} /> Save New Password
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;