// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Anomalies from "./pages/Anomalies";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Users from "./pages/Users";
import SuperDashboard from "./pages/superDashboard";
import TechDashboard from "./pages/techDashboard";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import SuperDashboardLayout from "./layouts/SuperDashboardLayout";
import TechDashboardLayout from "./layouts/TechDashboardLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/anomalies" element={<Anomalies />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/history" element={<History />} />
  <Route path="/users" element={<Users />} />
</Route>


        {/* Superviseur */}
        <Route element={<SuperDashboardLayout />}>
          <Route path="/super-dashboard" element={<SuperDashboard />} />
          <Route path="/super-dashboard/anomalies" element={<Anomalies />} />
          <Route path="/super-dashboard/reports" element={<Reports />} />
          <Route path="/super-dashboard/history" element={<History />} />
        </Route>

        {/* Technicien */}
        <Route element={<TechDashboardLayout />}>
          <Route path="/tech-dashboard" element={<TechDashboard />} />
          <Route path="/tech-dashboard/anomalies" element={<Anomalies />} />
          <Route path="/tech-dashboard/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}
