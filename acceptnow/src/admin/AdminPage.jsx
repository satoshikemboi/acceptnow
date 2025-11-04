import React, { useEffect, useState } from "react";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const correctPassword = "admin123"; // 🔒 Change or load from .env

  // Keep admin logged in locally
  useEffect(() => {
    const saved = localStorage.getItem("adminAuth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("❌ Incorrect password");
    }
  };

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      fetch("http://localhost:5000/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-800 text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-80 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-white">
            🔒 Admin Access
          </h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-white/20 text-white placeholder-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-medium"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-lg">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("adminAuth");
            setAuthenticated(false);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* User Data Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">6-Digit Code</th>
              <th className="py-3 px-4 text-left">Random Word</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4 font-semibold text-blue-600">
                  {user.code}
                </td>
                <td className="py-3 px-4 font-mono text-gray-700">
                  {user.randomWord}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 text-center mt-6">
        © {new Date().getFullYear()} Admin Dashboard — Confidential Access Only
      </p>
    </div>
  );
}

export default AdminPage;
