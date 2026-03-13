import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/adminService";
import { success, error } from "../../utils/toast";
import { Trash2, User as UserIcon } from "lucide-react";

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
      error(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      <div className="bg-white shadow rounded-xl border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      disabled={currentUser?.id === user.id}
                      onClick={() => handleDelete(user.id)}
                      className={`text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all ${
                        currentUser?.id === user.id ? "opacity-20 cursor-not-allowed" : ""
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-100">
          {users.map(user => (
            <div key={user.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{user.role}</span>
                </div>
              </div>
              <button
                disabled={currentUser?.id === user.id}
                onClick={() => handleDelete(user.id)}
                className={`text-red-500 p-2 ${currentUser?.id === user.id ? "opacity-10" : ""}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 pb-10">
        <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-3 py-1.5 border rounded-lg bg-white disabled:opacity-40 text-sm font-medium">Prev</button>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1} className="px-3 py-1.5 border rounded-lg bg-white disabled:opacity-40 text-sm font-medium">Next</button>
      </div>
    </div>
  );
}

export default AdminUsers;