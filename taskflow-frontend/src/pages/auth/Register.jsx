import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus, Sparkles, AlertCircle } from "lucide-react";
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

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Enhanced Validation
    if (formData.name.trim().length < 3) {
      return toast.error("Please enter your full name (min 3 chars)");
    }
    
    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const res = await registerUser(formData);
      
      // If your backend returns res.success or similar, verify it here
      if (res) {
        toast.success("Account created successfully!", {
          icon: <Sparkles size={18} className="text-yellow-500" />,
          duration: 4000,
        });

        // Redirect to login with a welcome message in the state
        navigate("/login", { 
          state: { message: "Welcome to TaskFlow! Please sign in with your new account." } 
        });
      }
    } catch (err) {
      // Catch backend-specific errors like "Email already exists"
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg, {
        icon: <AlertCircle size={18} className="text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
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

        <AuthInput
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

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
            icon={!loading && <UserPlus size={18} />} 
          />
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account?
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-700 ml-1.5 font-bold transition-all hover:underline"
          >
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