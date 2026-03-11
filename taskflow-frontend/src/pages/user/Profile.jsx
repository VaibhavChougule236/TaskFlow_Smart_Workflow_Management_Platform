import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await getProfile();

        setUser(res.data.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchProfile();

  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (

    <div className="max-w-xl">

      <h2 className="text-2xl font-semibold mb-6">
        Profile
      </h2>

      <div className="bg-white p-6 rounded shadow space-y-2">

        <p><b>ID:</b> {user.id}</p>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
        <p><b>Created:</b> {user.createdAt}</p>

      </div>

    </div>

  );
}

export default Profile;