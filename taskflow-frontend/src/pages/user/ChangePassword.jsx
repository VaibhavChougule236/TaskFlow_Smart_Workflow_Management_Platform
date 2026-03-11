import { useState } from "react";
import { changePassword } from "../../services/userService";
import { success, error } from "../../utils/toast";

function ChangePassword() {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleSubmit = async () => {
    try {

      await changePassword(form);

      success("Password changed");

      setForm({
        oldPassword: "",
        newPassword: ""
      });

    } catch {
      error("Password change failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">

      <h3 className="text-lg font-semibold mb-4">
        Change Password
      </h3>

      <input
        type="password"
        placeholder="Old password"
        value={form.oldPassword}
        onChange={(e) =>
          setForm({ ...form, oldPassword: e.target.value })
        }
        className="w-full border px-3 py-2 rounded mb-3"
      />

      <input
        type="password"
        placeholder="New password"
        value={form.newPassword}
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
        className="w-full border px-3 py-2 rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Change Password
      </button>

    </div>
  );
}

export default ChangePassword;