
import React, { useEffect, useState } from "react";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  const ADMIN_PASSWORD = "admin123";

  /* =========================
      THEME HANDLING
  ========================== */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* =========================
      AUTH HANDLING
  ========================== */
  useEffect(() => {
    const savedAuth = localStorage.getItem("adminAuth");
    if (savedAuth === "true") setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setAuthenticated(true);
    } else {
      alert("❌ Incorrect password");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setAuthenticated(false);
  };

  /* =========================
      FETCH USERS (SAFE)
  ========================== */
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid users response");
      }

      const enrichedUsers = await Promise.all(
        data.map(async (user) => {
          if (!user.ip) {
            return { ...user, ipLocation: "Unknown" };
          }

          try {
            const r = await fetch(`https://ipapi.co/${user.ip}/json/`);
            if (!r.ok) throw new Error();

            const ipData = await r.json();

            return {
              ...user,
              ipLocation: ipData.city
                ? `${ipData.city}, ${ipData.country_name}`
                : "Unknown",
            };
          } catch {
            return { ...user, ipLocation: "Unknown" };
          }
        })
      );

      setUsers(enrichedUsers);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchUsers();
  }, [authenticated]);

  /* =========================
      DELETE USER
  ========================== */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      const res = await fetch(
        `https://acceptnow.onrender.com/api/users/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  /* =========================
      LOGIN SCREEN
  ========================== */
  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-white/10 p-8 rounded-xl shadow-xl w-80 text-center">
          <h1 className="text-2xl font-semibold mb-4">🔒 Admin Login</h1>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-white/20 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-medium"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* =========================
      LOADING STATE
  ========================== */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading users...
      </div>
    );
  }

  /* =========================
      DASHBOARD
  ========================== */
  return (
    <div
      className={`min-h-screen p-8 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        className={`rounded-xl shadow-xl overflow-x-auto ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white text-sm uppercase">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Password</th>
              <th className="p-3 text-left">Code 1</th>
              <th className="p-3 text-left">Code 2</th>
              <th className="p-3 text-left">Code 3</th>
              <th className="p-3 text-left">IP</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className={`border-b ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.word || "—"}</td>
                <td className="p-3 text-blue-400">{user.code || "—"}</td>
                <td className="p-3 text-blue-400">{user.code2 || "—"}</td>
                <td className="p-3 text-blue-400">{user.code3 || "—"}</td>
                <td className="p-3">{user.ip || "Unknown"}</td>
                <td className="p-3 text-xs">{user.ipLocation}</td>
                <td className="p-3 text-xs">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-xs mt-6 opacity-60">
        © {new Date().getFullYear()} Admin Dashboard — Confidential
      </p>
    </div>
  );
}

export default AdminPage;
