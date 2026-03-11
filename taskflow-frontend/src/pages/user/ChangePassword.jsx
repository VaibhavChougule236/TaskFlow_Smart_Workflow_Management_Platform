import { useState } from "react";
import { changePassword } from "../../services/userService";
import { success, error } from "../../utils/toast";
import { KeyRound, ArrowLeft } from "lucide-react";
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
    <div className="max-w-md mx-auto py-12 px-4">
      <Link to="/settings" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-all">
        <ArrowLeft size={16} /> Back to Settings
      </Link>
      
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl mb-6">
          <KeyRound size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Password</h2>
        <p className="text-gray-500 text-sm mb-8">Ensure your account is using a long, random password to stay secure.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Old Password</label>
            <input
              type="password"
              required
              value={form.oldPassword}
              onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-all shadow-md disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Save New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;