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
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  logout();

  alert("✅ Logged out successfully.");

  navigate("/");
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
    <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-green-700 font-bold border-b-2 border-green-700"
      : "hover:text-green-700"
  }
>
  Home
</NavLink>
  </li>

  <li>
    <NavLink
      to="/crop"
      className={({ isActive }) =>
        isActive
          ? "text-green-700 font-bold border-b-2 border-green-700"
          : "hover:text-green-700"
      }
    >
      Crop AI
    </NavLink>
  </li>


  <li>
  <NavLink
    to="/disease"
    className={({ isActive }) =>
      isActive
        ? "text-green-700 font-bold border-b-2 border-green-700"
        : "hover:text-green-700"
    }
  >
    Disease AI
  </NavLink>
</li>

  {loggedIn && (
    <>
      <li>
        <NavLink
      to="/dashboard"
      className={({ isActive }) =>
        isActive
          ? "text-green-700 font-bold border-b-2 border-green-700"
          : "hover:text-green-700"
      }
    >
      Dashboard
    </NavLink>
      </li>


      

      <li>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-green-700 font-bold border-b-2 border-green-700"
              : "hover:text-green-700"
          }
        >
          History
        </NavLink>
      </li>
    </>
  )}

  <li>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive
          ? "text-green-700 font-bold border-b-2 border-green-700"
          : "hover:text-green-700"
      }
    >
      About
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
        isActive
          ? "text-green-700 font-bold border-b-2 border-green-700"
          : "hover:text-green-700"
      }
    >
      Contact
    </NavLink>
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
            <div className="flex gap-3">

            <button
            onClick={() => navigate("/login")}
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800">
            Login
            </button>

            <button
            onClick={() => navigate("/register")}
            className="border border-green-700 text-green-700 px-5 py-2 rounded-lg hover:bg-green-700 hover:text-white transition">
            Register
           </button>

        </div>
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
  to="/crop"
  onClick={() => setMenuOpen(false)}
  className="hover:text-green-700"
>
  Crop AI
</NavLink>

<NavLink
  to="/disease"
  onClick={() => setMenuOpen(false)}
  className="hover:text-green-700"
>
  Disease AI
</NavLink>

{loggedIn && (
  <>
    <NavLink
      to="/dashboard"
      onClick={() => setMenuOpen(false)}
      className="hover:text-green-700"
    >
      Dashboard
    </NavLink>

    <NavLink
      to="/history"
      onClick={() => setMenuOpen(false)}
      className="hover:text-green-700"
    >
      History
    </NavLink>
  </>
)}

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
              <div className="flex flex-col gap-3">

  <button
    onClick={() => {
      navigate("/login");
      setMenuOpen(false);
    }}
    className="bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    Login
  </button>

  <button
    onClick={() => {
      navigate("/register");
      setMenuOpen(false);
    }}
    className="border border-green-700 text-green-700 px-5 py-2 rounded-lg"
  >
    Register
  </button>

</div>
            )}

          </ul>

        </div>
      )}

    </nav>
  );
}

export default Navbar;