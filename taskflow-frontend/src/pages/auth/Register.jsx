import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

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
    if (user) {
      navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const res = await registerUser(formData);
      
      console.log("Backend Response:", res);

      if (res) {
        toast.success("Account created successfully!");
        navigate("/login", { 
          state: { message: "Registration successful! Please login." } 
        });
      } else {
        toast.error("Registration failed: No response from server");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Email already exists or server error.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="pt-2">
          <AuthButton text="Create Account" loading={loading} icon={<UserPlus size={18} />} />
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1.5 font-bold transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;