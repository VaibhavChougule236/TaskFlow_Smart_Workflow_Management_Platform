import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userService";
import { success, error } from "../../utils/toast";

function ProfileSettings() {

  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch {
      error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile({ name: user.name });
      success("Profile updated");
    } catch {
      error("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Profile Settings
      </h2>

      <div className="bg-white p-6 rounded shadow">

        <label className="block mb-2 text-sm text-gray-600">
          Name
        </label>

        <input
          value={user.name}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <label className="block mb-2 text-sm text-gray-600">
          Email
        </label>

        <input
          value={user.email}
          disabled
          className="w-full border px-3 py-2 rounded mb-4 bg-gray-100"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>

      </div>

    </div>
  );
}

export default ProfileSettings;