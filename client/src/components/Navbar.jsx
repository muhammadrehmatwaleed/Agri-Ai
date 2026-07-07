import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import {
  FaLeaf,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = isLoggedIn();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaLeaf className="text-3xl text-green-700 cursor-pointer hover:scale-110 transition duration-300" />
          <h1 className="text-3xl font-bold text-green-700">
            AgriAI
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-semibold">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">

          {loggedIn ? (
            <div className="flex items-center gap-4">

              <span className="font-semibold text-green-700">
              👤 Welcome {JSON.parse(localStorage.getItem("farmer"))?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
            >
              Login
            </button>
          )}

          <FaUserCircle className="text-3xl text-green-700 cursor-pointer" />

        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

            {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 shadow-lg">

          <ul className="flex flex-col gap-5 text-lg">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-700"
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-700"
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-700"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-green-700"
            >
              Contact
            </NavLink>

            {loggedIn ? (
  <>
             <span className="font-semibold text-green-700">
             👤 Welcome {JSON.parse(localStorage.getItem("farmer"))?.name}
             </span>

             <button
             onClick={() => {
             handleLogout();
             setMenuOpen(false);
          }}
             className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700" >
             Logout
             </button>
             </>
) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
              >
                Login
              </button>
            )}

          </ul>

        </div>
      )}

    </nav>
  );
}

export default Navbar;