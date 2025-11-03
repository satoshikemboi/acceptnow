
import React from "react";

const LocalCoinswap = () => {
  return (
    <div className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center text-white">
      {/* Top Bar */}
      <div className="absolute top-6 left-8 flex items-center space-x-2">
        <img
          src="/logo.png"
          alt="LocalCoinSwap Logo"
          className="w-8 h-8"
        />
        <h1 className="text-lg font-semibold">LocalCoinSwap</h1>
      </div>

      {/* Register Button */}
      <button className="absolute top-6 right-8 bg-gradient-to-b from-orange-400 to-orange-600 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition">
        Register
      </button>

      {/* Login Container */}
      <div className="flex bg-[#0e141f] rounded-xl overflow-hidden w-[70%] max-w-5xl shadow-lg">
        {/* Quote Section */}
        <div className="w-1/2 bg-[#0e141f] p-12 flex flex-col justify-center border-r border-gray-800">
          <div className="text-6xl text-blue-500 mb-6">“</div>
          <p className="text-gray-300 leading-relaxed mb-4">
            The world ultimately will have a single currency. The internet will
            have a single currency. I personally believe that it will be
            Bitcoin.
          </p>
          <div className="mt-6 border-t border-gray-700 pt-3 text-gray-400">
            Jack Dorsey
          </div>
        </div>

        {/* Login Section */}
        <div className="w-1/2 bg-[#0e141f] p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">
            Login to LocalCoinSwap
          </h2>
          <label className="text-gray-400 mb-2 text-sm" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            className="bg-transparent border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-400 mb-6"
          />
          <button className="bg-[#35b6ff] text-white py-2 rounded-full text-lg font-semibold hover:bg-[#4cc4ff] transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalCoinswap;
