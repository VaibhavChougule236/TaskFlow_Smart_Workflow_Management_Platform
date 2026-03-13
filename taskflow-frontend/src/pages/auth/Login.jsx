import { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      window.history.replaceState({}, document.title);
    }

    if (user) {
      navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData);
      if (res.success) {
        toast.success(`Welcome, ${res.data.name}!`);
        login(res.data);
      } else {
        toast.error(res.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 min-h-screen flex items-center justify-center bg-slate-50">
      <AuthLayout title="Welcome Back">
        <div className="mb-8 text-center">
          <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="pt-2">
            <AuthButton text="Sign In" loading={loading} icon={<LogIn size={18} />} />
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Don't have an account?
            <Link to="/register" className="text-blue-600 hover:text-blue-700 ml-1.5 font-bold transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </AuthLayout>
    </div>
  );
}

export default Login;