import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/adminService";
import { success, error } from "../../utils/toast";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber = 0) => {

    try {

      const res = await getUsers(pageNumber, 10);

      setUsers(res.data.data.content);
      setTotalPages(res.data.data.totalPages);

    } catch (err) {

      console.error(err);
      error("Failed to load users");

    }

  };

  const handleDelete = async (id) => {

    if (currentUser?.role === "ADMIN" && currentUser?.id === id) {
      error("Admin cannot delete their own account");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      success("User deleted successfully");

      fetchUsers(page);

    } catch (err) {

      console.error(err);

      if (err.response?.data?.message) {
        error(err.response.data.message);
      } else {
        error("Failed to delete user");
      }

    }

  };

  return (

    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Manage Users
      </h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">

        <table className="min-w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-700">

            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>

            ) : (

              users.map(user => (

                <tr key={user.id} className="border-t hover:bg-gray-50">

                  <td className="px-4 py-3 font-medium">
                    {user.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">

                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                      {user.role}
                    </span>

                  </td>

                  <td className="px-4 py-3 text-center">

                    <button
                      disabled={currentUser?.role === "ADMIN" && currentUser?.id === user.id}
                      onClick={() => handleDelete(user.id)}
                      className={`text-red-500 hover:text-red-700 ${
                        currentUser?.role === "ADMIN" && currentUser?.id === user.id
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-2 mt-6">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 border rounded ${
              page === i ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>

        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>

  );
}

export default AdminUsers;