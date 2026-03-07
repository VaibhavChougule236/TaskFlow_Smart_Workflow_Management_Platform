import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      await registerUser(formData);

      navigate("/");

    } catch (err) {

      setError("Registration failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <AuthLayout title="Create Account">

      {error && (
        <p className="text-red-500 mb-3 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <AuthInput
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <AuthInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <AuthButton text="Register" loading={loading} />

      </form>

      <p className="text-sm text-center mt-4">

        Already have an account?

        <Link
          to="/"
          className="text-blue-500 ml-1"
        >
          Login
        </Link>

      </p>

    </AuthLayout>

  );
}

export default Register;