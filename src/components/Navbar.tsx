import { UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<Boolean>(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Exercise", path: "/exercise" },
    { name: "Progress", path: "/progress" },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="max-w-screen mx-auto px-4 py-4 sticky top-0 bg-gray-200 dark:bg-gray-900/90 z-30 shadow-sm dark:shadow-gray-800">
      <nav className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#0e9453]">
          caliTrack
        </Link>

        {isLoggedIn ? (
          <ul className="hidden md:flex gap-8 items-center">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-[#0e9453]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#0e9453]"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="hidden md:flex gap-8 items-center ml-auto">
            <li>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-[#0e9453] font-bold"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-[#0e9453] font-bold"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}

        <div className="flex items-center gap-4 relative">
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <FaUser
                  size={22}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40">
                  <button
                    onClick={handleLogOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                  >
                    <FaSignOutAlt size={18} />
                    Logout
                  </button>

                  <Link
                    to="/profile"
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                  >
                    <UserPen />
                    profile
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <FaTimes size={22} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaBars size={22} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
          {isLoggedIn ? (
            <>
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
                      isActive
                        ? "text-[#0e9453]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#0e9453]"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-[#0e9453]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-[#0e9453]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
