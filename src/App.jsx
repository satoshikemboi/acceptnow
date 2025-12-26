import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home.jsx";
import LocalCoinswap from "./components/LocalCoinswap.jsx";
import AdminPage from "./admin/AdminPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/localcoinswap" element={<LocalCoinswap />} /> 
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;


