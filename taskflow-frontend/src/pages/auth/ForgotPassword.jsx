import { useState } from "react";
import { forgotPassword } from "../../services/authService";
import { success, error } from "../../utils/toast";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      success(res.data.data || "Reset link sent to your email!");
      setEmail("");
    } catch (err) {
      error("Failed to generate reset link. Is the email correct?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 transition-all">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
            <p className="text-gray-500 dark:text-slate-400 mt-2">No worries, we'll send you reset instructions.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:dark:text-slate-500"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:bg-blue-300 dark:disabled:bg-blue-900/50"
            >
              {loading ? "Sending..." : <><Send size={18} /> Send Reset Link</>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft size={16} /> Back to Log In
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;