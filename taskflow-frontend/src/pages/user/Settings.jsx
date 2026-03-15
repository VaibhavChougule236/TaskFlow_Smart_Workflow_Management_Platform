import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfile, deleteAccount } from "../../services/userService";
import { User, Lock, CheckCircle, Loader2, ShieldAlert, Camera, Trash2, LogOut, Save, X } from "lucide-react";
import { success, error } from "../../utils/toast";
import { AuthContext } from "../../context/AuthContext";
import api, { IMAGE_URL } from "../../api/axios";

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
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const res = await api.put("/users/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        login({ ...res.data.data, token: storedUser?.token });
        success("Profile updated!");
        setIsEditing(false);
        setSelectedFile(null);
        fetchProfile();
      }
    } catch (err) {
      error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = () => {
    if (user?.role === "ADMIN") {
      error("Admin accounts cannot be deleted.");
      return;
    }
    toast((t) => (
      <div className="bg-white dark:bg-slate-900 p-2">
        <p className="text-sm font-bold text-slate-900 dark:text-white">Delete Account?</p>
        <p className="text-xs text-slate-500 mt-1 text-pretty">This will permanently remove your tasks and profile.</p>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => toast.dismiss(t.id)} className="text-xs font-bold text-slate-500">Cancel</button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const res = await deleteAccount();
                if (res.success) { success("Account deleted"); logout(); navigate("/login"); }
              } catch (err) { error("Failed to delete"); }
            }}
            className="text-xs font-bold text-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    ));
  };

  if (!user) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your profile and account preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-200 dark:shadow-none">
            <User size={18} /> General
          </button>
          <button onClick={() => navigate("/change-password")} className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all font-medium">
            <Lock size={18} /> Security
          </button>
        </aside>

        <main className="md:col-span-3 space-y-6">
          {/* Profile Section */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-bold uppercase tracking-widest text-slate-500">
              Personal Details
            </div>
            
            <div className="p-6 space-y-8">
              {/* Avatar Update */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                      {selectedFile ? (
                        <img src={URL.createObjectURL(selectedFile)} className="w-full h-full object-cover" alt="preview" />
                      ) : user.imagePath ? (
                        <img src={`${IMAGE_URL}${user.imagePath}`} className="w-full h-full object-cover" alt="profile" />
                      ) : (
                        <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">{user.name.charAt(0)}</div>
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer shadow-md hover:text-blue-600">
                      <Camera size={16} />
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                    </label>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Profile Photo</p>
                    <p className="text-xs text-slate-500">Update your avatar image</p>
                  </div>
                </div>

                {selectedFile && (
                  <button 
                    onClick={handleSave} 
                    disabled={isUpdating}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Save size={14} /> {isUpdating ? "Saving..." : "Save Image"}
                  </button>
                )}
              </div>

              {/* Name Update */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end gap-4">
                <div className="flex-1 max-w-sm">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 block">Display Name</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white outline-none focus:border-blue-500"
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)} 
                    />
                  ) : (
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400"><X size={18} /></button>
                      <button onClick={handleSave} disabled={isUpdating} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700">Save Name</button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                  )}
                </div>
              </div>

              {/* Email (Read Only) */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1 block">Email Address</label>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                  {user.email} <CheckCircle size={14} className="text-green-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Account Management Section */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Account Management</h3>
            <div className="space-y-4">
              <button 
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800 group"
              >
                <div className="flex items-center gap-3">
                  <LogOut size={18} className="text-slate-400 group-hover:text-slate-600" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Logout from account</span>
                </div>
                <span className="text-xs text-slate-400">Sign out</span>
              </button>

              {user?.role !== "ADMIN" && (
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border border-slate-100 dark:border-slate-800 group"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-slate-400 group-hover:text-red-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Delete account permanently</span>
                  </div>
                  <span className="text-xs text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Delete</span>
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Settings;