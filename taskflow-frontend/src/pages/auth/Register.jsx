import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, sendOtp, verifyOtp } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus, Sparkles, CheckCircle, Send, Eye, EyeOff } from "lucide-react"; 
import toast from "react-hot-toast";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function Register() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (user) {
      navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error("Please enter a valid email");

    setOtpLoading(true);
    try {
      await sendOtp(formData.email);
      setOtpSent(true);
      setTimer(60);
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) return toast.error("Enter 6-digit OTP");
    setOtpLoading(true);
    try {
      const res = await verifyOtp(formData.email, otpCode);
      if (res.success) {
        setIsVerified(true);
        toast.success("Email Verified ✅");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) return toast.error("Please verify your email first");
    
    setLoading(true);
    try {
      const res = await registerUser(formData);
      if (res) {
        toast.success("Account created successfully!", { icon: <Sparkles size={18} className="text-yellow-500" /> });
        navigate("/login", { state: { message: "Account verified! Please sign in." } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 transition-all">
          
          {/* Top Icon and Header Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-gray-500 dark:text-slate-400 mt-2 text-sm">Join us to start managing your projects.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Vaibhav Chougule"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:dark:text-slate-500"
              />
            </div>

            {/* Email Field & OTP Request */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isVerified}
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:dark:text-slate-500 disabled:opacity-60"
                />
                {isVerified && <CheckCircle className="absolute right-4 top-3.5 text-green-500" size={18} />}
              </div>
            </div>

            {!isVerified && (
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={otpLoading || timer > 0}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[13px] font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 disabled:opacity-60 transition-all border border-blue-100 dark:border-blue-800/50"
              >
                <Send size={14} />
                {timer > 0 ? `Resend in ${timer}s` : (otpSent ? "Resend OTP" : "Send Verification Code")}
              </button>
            )}

            {/* OTP Input Section */}
            {otpSent && !isVerified && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpLoading}
                  className="bg-slate-900 dark:bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-all"
                >
                  {otpLoading ? "..." : "Verify"}
                </button>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:dark:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              disabled={loading || !isVerified}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none disabled:bg-blue-300 dark:disabled:bg-blue-900/50 active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
              Already have an account? 
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline ml-1 font-bold transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;