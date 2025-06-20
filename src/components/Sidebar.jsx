import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col gap-6">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `block px-4 py-2 rounded ${
            isActive ? "bg-gray-700" : "hover:bg-gray-700"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/historique"
        className={({ isActive }) =>
          `block px-4 py-2 rounded ${
            isActive ? "bg-gray-700" : "hover:bg-gray-700"
          }`
        }
      >
        Historique
      </NavLink>
    </nav>
  );
}
