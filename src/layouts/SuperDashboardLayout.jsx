// src/layouts/SuperDashboardLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function SuperDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">PME Superviseur</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          <Link to="/super-dashboard" className="text-blue-600 font-medium">Dashboard</Link>
          <Link to="/super-dashboard/anomalies" className="text-gray-700 hover:text-blue-600">Anomalies</Link>
          <Link to="/super-dashboard/reports" className="text-gray-700 hover:text-blue-600">Rapports</Link>
          <Link to="/super-dashboard/history" className="text-gray-700 hover:text-blue-600">Historique</Link>
          <Link to="/" className="text-red-500 hover:underline mt-auto">Déconnexion</Link>
        </nav>
      </aside>

      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

