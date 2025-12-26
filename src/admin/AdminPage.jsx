import React, { useEffect, useState } from "react";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const correctPassword = "admin123";

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto-login if saved
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

  // Fetch all users + IP lookup
  const fetchUsers = () => {
    setLoading(true);

    fetch("https://acceptnow.onrender.com/api/users")
      .then((res) => res.json())
      .then(async (data) => {
        const enriched = await Promise.all(
          data.map(async (u) => {
            if (!u.ip) return u;
            try {
              const r = await fetch(`https://ipapi.co/${u.ip}/json/`);
              const ipData = await r.json();
              return {
                ...u,
                ipLocation: ipData.city
                  ? `${ipData.city}, ${ipData.country_name}`
                  : "null",
              };
            } catch {
              return { ...u, ipLocation: "null" };
            }
          })
        );

        setUsers(enriched);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (authenticated) fetchUsers();
  }, [authenticated]);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    await fetch(`https://acceptnow.onrender.com/api/users/${id}`, {
      method: "DELETE",
    });

    fetchUsers();
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-80 text-center">
          <h1 className="text-2xl font-semibold mb-4">🔒 Admin Access</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-white/20 text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
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

  // Loading screen
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-700 text-lg">
        Loading user details...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-8 transition ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

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
      </div>

      {/* User Table */}
      <div
        className={`shadow-xl rounded-xl p-6 overflow-x-auto ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="min-w-full">
          <thead
            className={`text-sm uppercase ${
              theme === "dark"
                ? "bg-blue-900 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            <tr>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Password</th>
              <th className="py-3 px-4 text-left">Code</th>
              <th className="py-3 px-4 text-left">IP</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border-b ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone || "—"}</td>
                <td className="py-3 px-4">{user.word}</td>
                <td className="py-3 px-4 text-blue-600 font-semibold">
                  {user.code}
                </td>
                <td className="py-3 px-4">{user.ip || "Unknown"}</td>
                <td className="py-3 px-4">{user.ipLocation || "Unknown"}</td>
                <td className="py-3 px-4">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm mt-6 opacity-60">
        © {new Date().getFullYear()} Admin Dashboard — Confidential
      </p>
    </div>
  );
}

export default AdminPage;

