import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Anomalies from "./pages/Anomalies";
import SuperviseurPage from "./pages/SuperviseurPage";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (user === null) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["administrateur"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technicien"
          element={
            <ProtectedRoute allowedRoles={["technicien"]}>
              <Anomalies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superviseur"
          element={
            <ProtectedRoute allowedRoles={["superviseur"]}>
              <SuperviseurPage />
            </ProtectedRoute>
          }
        />

        {/* Redirection automatique si user connecté */}
        {user && (
          <Route
            path="/"
            element={
              <Navigate
                to={
                  user.role === "administrateur"
                    ? "/admin"
                    : user.role === "technicien"
                    ? "/technicien"
                    : user.role === "superviseur"
                    ? "/superviseur"
                    : "/"
                }
                replace
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
