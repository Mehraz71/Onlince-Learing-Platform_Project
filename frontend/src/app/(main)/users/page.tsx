"use client";
import { useSessionCheck } from "@/components/findcookies";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type USER = {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isVerified: string;
};

export default function USER_MANAGEMENT() {
  useSessionCheck();
  const [users, setUsers] = useState<USER[]>([]);
  const [formUser, setFormUser] = useState<Partial<USER>>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  const API = "http://localhost:3001/users";

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users', { withCredentials: true })

      setUsers(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        ...formUser,
      });
      toast.success("✅ User Created!");
      setShowCreateModal(false);
      setFormUser({});
      fetchUsers();
    } catch (err) {
      toast.error("❌ Create failed. Check fields.");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`${API}/update/profile/${formUser.id}`, formUser);
      toast.success("✅ User Updated!");
      setShowEditModal(false);
      setConfirmUpdate(false);
      setFormUser({});
      fetchUsers();
    } catch (err) {
      toast.error("❌ Update failed.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/delete-user/${id}`);
      toast.success("✅ User Deleted");
      fetchUsers();
    } catch (err) {
      toast.error("❌ Delete failed.");
    }
  };

  return (
    <div className="p-8 text-black max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <button
        onClick={() => {
          setFormUser({});
          setShowCreateModal(true);
        }}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        + Create User
      </button>

      <table className="w-full text-sm bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Password</th>
            <th className="p-2 border">Verified</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.phone}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.password}</td>
              <td className="p-2 border">{u.isVerified}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => {
                    setFormUser(u);
                    setShowEditModal(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      {(showEditModal || showCreateModal) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {showCreateModal ? "Create User" : "Edit User"}
            </h2>

            <input
              type="text"
              className="w-full mb-2 px-3 py-2 border rounded"
              placeholder="Username"
              value={formUser.username || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, username: e.target.value })
              }
            />
            <input
              type="email"
              className="w-full mb-2 px-3 py-2 border rounded"
              placeholder="Email"
              value={formUser.email || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, email: e.target.value })
              }
            />
            <input
              type="number"
              className="w-full mb-2 px-3 py-2 border rounded"
              placeholder="Phone"
              value={formUser.phone || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, phone: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full mb-2 px-3 py-2 border rounded"
              placeholder="Password"
              value={formUser.password || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, password: e.target.value })
              }
            />

            <select
              className="w-full mb-2 px-3 py-2 border rounded"
              value={formUser.role || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="instructor">Instructor</option>
              <option value="manager">Manager</option>
            </select>

            <select
              className="w-full mb-4 px-3 py-2 border rounded"
              value={formUser.isVerified || ""}
              onChange={(e) =>
                setFormUser({ ...formUser, isVerified: e.target.value })
              }
            >
              <option value="">Is Verified?</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <div className="flex justify-end gap-2">
              {showCreateModal ? (
                <button
                  onClick={handleCreate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              ) : (
                <button
                  onClick={() => setConfirmUpdate(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setShowCreateModal(false);
                  setFormUser({});
                }}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      {confirmUpdate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Confirm update of user data?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Yes, update
              </button>
              <button
                onClick={() => setConfirmUpdate(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
