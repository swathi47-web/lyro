import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 shadow-md py-6 px-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-white">
        {/* Logo / Home */}
        <Link
          to="/"
          className="text-4xl font-extrabold tracking-wide hover:text-pink-100 transition mb-2 sm:mb-0"
        >
          🐾 Pet<span className="text-yellow-200">Adopt</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 items-center justify-center text-sm font-semibold">
        <Link to="/" className="hover:text-pink-200 transition text-xl">
        🏠 Home
        </Link>
        <Link to="/pets" className="hover:text-pink-200 transition text-xl">
        🐶 Pets
        </Link>
          {user && (
            <Link
              to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
              className="hover:text-pink-200 transition text-xl"
            >
              📋 Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-pink-600 hover:bg-pink-100 px-4 py-1 rounded-full transition text-xl"
            >
              🔓 Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-200 transition text-xl">
                🔐 Login
              </Link>
              <Link to="/register" className="hover:text-pink-200 transition text-xl">
                📝 Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;























