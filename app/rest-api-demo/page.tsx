"use client";
import React, { useState } from "react";

const API_BASE = "https://jsonplaceholder.typicode.com";
const USERS_ENDPOINT = `${API_BASE}/users`;

export default function RestApiDemo() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [deleteId, setDeleteId] = useState("");

  // GET users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(USERS_ENDPOINT);
      const data = await res.json();
      setUsers(data);
    } catch (e: any) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  // POST user
  const handleCreate = async () => {
    if (!newUser.name) {
      setError("Please enter a Name");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(USERS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      alert(`Created user: ${JSON.stringify(data)}`);
      setNewUser({ name: "", email: "" });
    } catch (e: any) {
      setError(`Failed to create user: ${e.message}`);
    }
    setLoading(false);
  };

  // PUT user (update)
  const handleUpdate = async () => {
    if (!updateUser.id) {
      setError("Please enter a User ID");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${USERS_ENDPOINT}/${updateUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updateUser.name, email: updateUser.email }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      alert(`Updated user: ${JSON.stringify(data)}`);
      setUpdateUser({ id: "", name: "", email: "" });
    } catch (e: any) {
      setError(`Failed to update user: ${e.message}`);
    }
    setLoading(false);
  };

  // DELETE user
  const handleDelete = async () => {
    if (!deleteId) {
      setError("Please enter a User ID");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${USERS_ENDPOINT}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      alert(`Deleted user with id: ${deleteId}`);
      setDeleteId("");
    } catch (e: any) {
      setError(`Failed to delete user: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">REST API Demo (JSONPlaceholder)</h1>
      <p className="text-sm text-gray-600 mb-4">Using https://jsonplaceholder.typicode.com</p>

      <button onClick={fetchUsers} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Fetch Users</button>
      {loading && <div className="text-blue-600 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Users List</h2>
        <ul className="border rounded">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((u: any) => (
              <li key={u.id} className="border-b py-2 px-3 hover:bg-gray-50">
                <div className="font-semibold">{u.name}</div>
                <div className="text-sm text-gray-600">{u.email}</div>
              </li>
            ))
          ) : (
            <li className="text-zinc-500 py-2 px-3">No users found. Click "Fetch Users" to load data.</li>
          )}
        </ul>
      </div>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-3">Create User</h2>
        <div className="space-y-2 mb-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Create</button>
      </div>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-3">Update User</h2>
        <div className="space-y-2 mb-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="User ID"
            value={updateUser.id}
            onChange={e => setUpdateUser({ ...updateUser, id: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={updateUser.name}
            onChange={e => setUpdateUser({ ...updateUser, name: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            value={updateUser.email}
            onChange={e => setUpdateUser({ ...updateUser, email: e.target.value })}
          />
        </div>
        <button onClick={handleUpdate} className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">Update</button>
      </div>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold text-lg mb-3">Delete User</h2>
        <div className="space-y-2 mb-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="User ID"
            value={deleteId}
            onChange={e => setDeleteId(e.target.value)}
          />
        </div>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
      </div>
    </div>
  );
}
