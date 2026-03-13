import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/userService";
import { User, Lock, CheckCircle, Loader2, ShieldAlert, Camera } from "lucide-react";
import { success, error } from "../../utils/toast";
import { AuthContext } from "../../context/AuthContext";
import api, { IMAGE_URL} from "../../api/axios";

function Settings() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const { logout, login } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
      setNewName(res.data.data.name);
    } catch (err) {
      error("Could not load profile");
    }
  };

  const handleSave = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("name", newName);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      // Use 'api' which we just imported
      const res = await api.put("/users/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        // 1. Retrieve current token from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const currentToken = storedUser?.token;

        // 2. Update Context with NEW user data + OLD token
        // This is the key to NOT being redirected to login
        login({ ...res.data.data, token: currentToken });

        success("Profile updated successfully!");
        setIsEditing(false);
        setSelectedFile(null);

        // Refresh local state if necessary
        if (typeof fetchProfile === 'function') {
          fetchProfile();
        }
      }
    } catch (err) {
      console.error("Update Error:", err);
      error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-500 font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500">Manage account information and security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-2">
          <nav className="flex flex-col space-y-1">
            <button className="flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-semibold text-left border border-blue-100">
              <User size={18} /> General
            </button>
            <button
              onClick={() => navigate("/change-password")}
              className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all text-left"
            >
              <Lock size={18} /> Security
            </button>
          </nav>
        </aside>

        <div className="md:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 font-bold text-gray-700">
              Account Information
            </div>

            <div className="p-6 space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                    {selectedFile ? (
                      <img src={URL.createObjectURL(selectedFile)} alt="preview" className="w-full h-full object-cover" />
                    ) : user.imagePath ? (
                      <img src={`${IMAGE_URL}${user.imagePath}`} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-1 -right-1 p-1.5 bg-white border border-gray-200 rounded-full cursor-pointer shadow-sm hover:bg-gray-50">
                    <Camera size={14} className="text-blue-600" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">Profile Picture</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>

              <div className="flex justify-between items-start pt-4 border-t border-gray-50">
                <div className="space-y-1 w-full max-w-xs">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                  {isEditing ? (
                    <input
                      className="w-full border-2 border-blue-100 rounded-lg px-3 py-2 text-gray-700 focus:border-blue-500 outline-none"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold text-lg">{user.name}</p>
                  )}
                </div>

                {(isEditing || selectedFile) && (
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                )}
                {!isEditing && !selectedFile && (
                  <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-blue-600">Edit Name</button>
                )}
              </div>

              <div className="space-y-1 pt-4 border-t border-gray-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  {user.email} <CheckCircle size={16} className="text-green-500" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-red-50/50 border-2 border-red-100 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h4 className="text-red-900 font-bold">Logout Session</h4>
                  <p className="text-red-700/70 text-sm font-medium">End your session and clear local data.</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full md:w-auto bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 font-bold">
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;