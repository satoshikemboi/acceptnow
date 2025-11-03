
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-200 text-gray-800 p-4 shadow-2xl">
      <div className="flex items-center justify-center max-w-6xl mx-auto">

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden flex items-center text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-24 text-lg font-medium ">
          <li><a href="#personal" className="hover:text-white">PERSONAL</a></li>
          <li><a href="#business" className="hover:text-white">BUSINESS</a></li>
          <li><a href="#partnerships" className="hover:text-white">PARTNERSHIPS</a></li>
          <li><a href="#company" className="hover:text-white">COMPANY</a></li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden mt-3 space-y-2 bg-gray-300 rounded-lg p-4">
          <li><a href="#personal" className="block hover:text-white">PERSONAL</a></li>
          <li><a href="#business" className="block hover:text-white">BUSINESS</a></li>
          <li><a href="#partnerships" className="block hover:text-white">PARTNERSHIPS</a></li>
          <li><a href="#company" className="block hover:text-white">COMPANY</a></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
