import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";
import { Link } from "react-router-dom";
import { User, Mail, Calendar, Shield, Settings, Briefcase } from "lucide-react"; // Optional: npm install lucide-react

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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Format the date professionally
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
          <p className="text-gray-500">Manage your profile and account settings</p>
        </div>
        <Link
          to="/settings"
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium"
        >
          <Settings size={16} />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Basic Info */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-400 text-white flex items-center justify-center rounded-full text-4xl font-bold mb-4 shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <span className="mt-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            {user.role}
          </span>
          <p className="text-gray-400 text-sm mt-4 italic">"Productivity is being able to do things that you were never able to do before."</p>
        </div>

        {/* Right Column: Detailed Info & Stats */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-semibold text-gray-700">Personal Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><Mail size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Email Address</p>
                  <p className="text-gray-700 font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><Calendar size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Member Since</p>
                  <p className="text-gray-700 font-medium">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500"><Shield size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Account Security</p>
                  <p className="text-green-600 font-medium text-sm">Verified Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;