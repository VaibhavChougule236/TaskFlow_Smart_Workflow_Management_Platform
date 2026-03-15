import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";
import { Link } from "react-router-dom";
import { Mail, Calendar, Shield, Settings, User } from "lucide-react";
import { IMAGE_URL } from "../../api/axios";

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-slate-500 animate-pulse font-medium">Loading profile...</p>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your identity and security settings</p>
        </div>
        <Link
          to="/settings"
          className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-5 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-gray-700 dark:text-slate-200 shadow-sm"
        >
          <Settings size={18} />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 flex flex-col items-center text-center sticky top-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl mb-6 border-4 border-white dark:border-slate-800 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                {user.imagePath ? (
                  <img 
                    src={`${IMAGE_URL}${user.imagePath}`} 
                    alt="profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center text-5xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
            <span className="mt-2 px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest">
              {user.role}
            </span>
            
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 w-full">
              <p className="text-slate-400 dark:text-slate-500 text-sm italic leading-relaxed">
                "Productivity is being able to do things that you were never able to do before."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 flex items-center gap-2">
              <User size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-gray-800 dark:text-slate-200 uppercase text-xs tracking-widest">Personal Information</h3>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-tighter mb-1">Email Address</p>
                  <p className="text-gray-900 dark:text-slate-200 font-semibold break-all">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-tighter mb-1">Member Since</p>
                  <p className="text-gray-900 dark:text-slate-200 font-semibold">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                  <Shield size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-tighter mb-1">Account Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-green-600 dark:text-green-400 font-bold text-sm">Verified Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg shadow-blue-500/20">
            <div>
              <h4 className="font-bold text-lg">Keep your account secure</h4>
              <p className="text-blue-100 text-sm">Update your password regularly to prevent unauthorized access.</p>
            </div>
            <Link 
              to="/change-password" 
              className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all whitespace-nowrap active:scale-95"
            >
              Update Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;