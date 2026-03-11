import { useState } from "react";
import { forgotPassword } from "../../services/userService";
import { success, error } from "../../utils/toast";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {

      const res = await forgotPassword(email);

      success(res.data.data);

    } catch {

      error("Failed to generate reset link");

    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">

      <h2 className="text-2xl font-semibold mb-6">
        Forgot Password
      </h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Send Reset Link
      </button>

    </div>
  );
}

export default ForgotPassword;