import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, setDarkMode, setAuthType }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold">
            IM
          </div>
          <div className="font-bold text-xl text-gray-900 dark:text-white">
            InventoryPro
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            {darkMode ? "Light" : "Dark"}
          </button> */}

          <Link to="/login">
            <button
              onClick={() => setAuthType("login")}
              className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Login
            </button>
          </Link>

          {/* <Link to="/register">
            <button
              onClick={() => setAuthType("register")}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Register
            </button>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-6 space-y-3">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button
              onClick={() => setAuthType("login")}
              className="w-full px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Login
            </button>
          </Link>

          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <button
              onClick={() => setAuthType("register")}
              className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
