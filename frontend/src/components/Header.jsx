import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClasses = ({ isActive }) =>
    "px-3 py-2 rounded-md text-sm font-medium " +
    (isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-200");

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto flex items-center gap-6 p-4">

        <div className="text-lg font-semibold text-blue-600">
          ProU • Task Tracker
        </div>
        {user && (
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClasses}>
              Dashboard
            </NavLink>

            <NavLink to="/tasks" className={linkClasses}>
              Tasks
            </NavLink>

            {user.role === "admin" && (
              <NavLink to="/employees" className={linkClasses}>
                Employees
              </NavLink>
            )}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-3">

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
            >
              Login
            </button>
          )}

          {user && (
            <>
              <div className="text-sm text-gray-700">
                {user.name}{" "}
                <span className="text-gray-500">
                  ({user.role})
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
