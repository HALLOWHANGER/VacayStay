import React, { useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListUsers = () => {
  const { axios, getToken, user } = useAppContext();
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/find-users");
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const { data } = await axios.post(
        "/api/user/update-role",
        { userId, role },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="User Listings"
        subTitle="View and manage all registered users. Update roles when necessary."
      />

      <p className="text-gray-500 mt-8">Total Users</p>
      <div className="w-full text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Username</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Role</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.username}</td>
                <td className="py-3 px-4 text-gray-400 border-t border-gray-300">{item.email}</td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <select
                    value={item.role}
                    onChange={(e) => updateRole(item._id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                     <option value="Admin">Admin</option>
                     <option value="hotelOwner">HotelOwner</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
