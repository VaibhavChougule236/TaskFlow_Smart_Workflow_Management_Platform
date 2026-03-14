import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordWithToken } from "../../services/authService";
import { success, error } from "../../utils/toast";
import { Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      error("No reset token found in the link.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordWithToken(token, password);
      success("Password updated! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      error("Reset link expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Set New Password</h2>
            <p className="text-gray-500 mt-2 text-sm">Create a secure password to protect your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-green-200 disabled:bg-green-300"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;