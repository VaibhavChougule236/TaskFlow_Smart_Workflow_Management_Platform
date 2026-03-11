import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/userService";
import { User, Lock, CheckCircle, LogOut, Loader2, ShieldAlert } from "lucide-react"; 
import { success, error } from "../../utils/toast";
import { AuthContext } from "../../context/AuthContext";

function Settings() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      error("Name cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ name: newName });
      success("Name updated successfully");
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      error("Update failed");
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
              <div className="flex justify-between items-start">
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
                <button 
                  onClick={isEditing ? handleUpdateName : () => setIsEditing(true)}
                  disabled={isUpdating}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800"
                >
                  {isUpdating ? "Saving..." : isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  {user.email} <CheckCircle size={16} className="text-green-500" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">User Role</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
                  {user.role}
                </span>
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
              <button 
                onClick={handleLogout}
                className="w-full md:w-auto bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 font-bold shadow-lg shadow-red-200"
              >
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