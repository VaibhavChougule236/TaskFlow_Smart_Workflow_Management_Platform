import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, sendOtp, verifyOtp } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus, Sparkles, AlertCircle, CheckCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function Register() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      {/* Restored the exact original layout structure */}
      <AuthLayout title="Create Account">
        <div className="mb-8 text-center">
          <p className="text-slate-500 font-medium">Join TaskFlow to start managing work</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <AuthInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={isVerified}
              required
            />
            {isVerified && <CheckCircle className="absolute right-3 top-2.5 text-green-500" size={18} />}
          </div>

          {/* Verification Code Button - Styled to match your blue branding */}
          {!isVerified && (
            <button
              type="button"
              onClick={handleRequestOtp}
              disabled={otpLoading || timer > 0}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-50 text-blue-600 text-[13px] font-semibold hover:bg-blue-100 disabled:opacity-60 transition-all border border-blue-100 mb-2"
            >
              <Send size={14} />
              {timer > 0 ? `Resend in ${timer}s` : (otpSent ? "Resend Verification Code" : "Send Verification Code")}
            </button>
          )}

          {/* Inline OTP Input */}
          {otpSent && !isVerified && (
            <div className="flex gap-2 animate-in fade-in duration-300">
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="flex-grow border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold"
              >
                Verify
              </button>
            </div>
          )}

          <AuthInput
            type="password"
            name="password"
            placeholder="Create Password (Min. 6 chars)"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="pt-2">
            <AuthButton 
              text={loading ? "Registering..." : "Create Account"} 
              loading={loading} 
              disabled={!isVerified}
              icon={!loading && <UserPlus size={18} />} 
            />
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1.5 font-bold transition-all hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </AuthLayout>

      <Footer />
    </div>
  );
}

export default Register;