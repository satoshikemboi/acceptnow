import React, { useEffect, useState } from "react";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  const ADMIN_PASSWORD = "admin123";

  /* =========================
      THEME & AUTH HANDLING
  ========================== */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    const savedAuth = localStorage.getItem("adminAuth");
    if (savedAuth === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      FETCH USERS (ENRICHED)
  ========================== */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://acceptnow.onrender.com/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response");

      // Enrich users with IP location data
      const enrichedUsers = await Promise.all(
        data.map(async (user) => {
          if (!user.ip || user.ip === "127.0.0.1") {
            return { ...user, ipLocation: "Local/Unknown" };
          }
          try {
            const r = await fetch(`https://ipapi.co/${user.ip}/json/`);
            if (!r.ok) throw new Error();
            const ipData = await r.json();
            return {
              ...user,
              ipLocation: ipData.city 
                ? `${ipData.city}, ${ipData.country_name}` 
                : "Unknown Location",
            };
          } catch {
            return { ...user, ipLocation: "Geo-lookup failed" };
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
      const res = await fetch(`https://acceptnow.onrender.com/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setUsers(users.filter((u) => u._id !== id)); // Immediate UI update
    } catch {
      alert("Failed to delete user");
    }
  };

  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-white/10 p-8 rounded-xl shadow-xl w-80 text-center border border-white/10">
          <h1 className="text-2xl font-semibold mb-4">🔒 Admin Login</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-white/20 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-white"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}>
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="opacity-60 text-sm">Monitoring incoming data in real-time</p>
        </div>

        <div className="flex gap-3">
          <button onClick={fetchUsers} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            🔄 Refresh
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition">
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={logout} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition">
            Logout
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className={`rounded-xl shadow-2xl overflow-hidden border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-blue-600 text-white text-xs uppercase tracking-wider">
                <th className="p-4 text-left font-bold">User / Email</th>
                <th className="p-4 text-left font-bold">Password</th>
                <th className="p-4 text-left font-bold text-yellow-300">Code 1</th>
                <th className="p-4 text-left font-bold text-yellow-300">Code 2</th>
                <th className="p-4 text-left font-bold text-yellow-300">Code 3</th>
                <th className="p-4 text-left font-bold">IP Address</th>
                <th className="p-4 text-left font-bold">Location</th>
                <th className="p-4 text-left font-bold">Time</th>
                <th className="p-4 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan="9" className="p-10 text-center opacity-50 italic">Fetching the latest logs...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-10 text-center opacity-50">No users found in database.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className={`border-b transition-colors ${theme === "dark" ? "border-gray-700 hover:bg-gray-750" : "hover:bg-gray-50"}`}>
                    <td className="p-4 break-all">{user.email}</td>
                    <td className="p-4 font-mono text-pink-500 font-bold">{user.word || "—"}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded ${user.code ? 'bg-green-500/20 text-green-400' : 'opacity-20'}`}>{user.code || "—"}</span></td>
                    <td className="p-4"><span className={`px-2 py-1 rounded ${user.code2 ? 'bg-green-500/20 text-green-400' : 'opacity-20'}`}>{user.code2 || "—"}</span></td>
                    <td className="p-4"><span className={`px-2 py-1 rounded ${user.code3 ? 'bg-green-500/20 text-green-400' : 'opacity-20'}`}>{user.code3 || "—"}</span></td>
                    <td className="p-4 font-mono text-xs">{user.ip || "0.0.0.0"}</td>
                    <td className="p-4 text-xs opacity-80">{user.ipLocation}</td>
                    <td className="p-4 text-xs whitespace-nowrap">{new Date(user.createdAt).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-700 font-bold underline transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;