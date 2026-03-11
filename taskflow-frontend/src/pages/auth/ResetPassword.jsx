import { useParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../services/userService";
import { success, error } from "../../utils/toast";

function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {

      await resetPassword(token, password);

      success("Password updated");

    } catch {

      error("Reset failed");

    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">

      <h2 className="text-2xl font-semibold mb-6">
        Reset Password
      </h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Reset Password
      </button>

    </div>
  );
}

export default ResetPassword;