import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function UserProfileCard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow border border-transparent dark:border-slate-700 transition-colors duration-300">
      <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
        Profile
      </h3>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-medium text-slate-900 dark:text-slate-200">{user?.name}</p>
          <p className="text-sm text-gray-500 dark:text-slate-400">{user?.email}</p>
          <p className="text-xs text-gray-400 dark:text-slate-500">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;