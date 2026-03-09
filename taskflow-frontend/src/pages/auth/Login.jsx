import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

function Login() {

    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {

        if (user) {

            if (user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }

        }

    }, [user]);

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

            const res = await loginUser(formData);

            console.log(res); // debug

            if (res.success) {

                const userData = res.data;
                login(userData);

                if (userData.role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/dashboard");
                }

            } else {

                setError(res.message);

            }

        } catch (err) {

            console.error(err);
            setError("Login failed. Please try again.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <AuthLayout title="Login to TaskFlow">

            {error && (
                <p className="text-red-500 mb-3 text-center">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

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

                <AuthButton text="Login" loading={loading} />

            </form>

            <p className="text-sm text-center mt-4">

                Don't have an account?

                <Link
                    to="/register"
                    className="text-blue-500 ml-1"
                >
                    Register
                </Link>

            </p>

        </AuthLayout>

    );
}

export default Login;