import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function UserProfileCard() {

  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white p-5 rounded-lg shadow">

      <h3 className="text-lg font-semibold mb-3">
        Profile
      </h3>

      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-xs text-gray-400">Role: {user?.role}</p>
        </div>

      </div>

    </div>
  );
}

export default UserProfileCard;