import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adapte le chemin selon ton projet

/**
 * Composant pour protéger une route selon l'authentification et les rôles autorisés.
 *
 * @param {ReactNode} children - Composants enfants à rendre si autorisé.
 * @param {Array<string>} allowedRoles - Liste des rôles autorisés à accéder à la route.
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Si pas connecté, rediriger vers la page de login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si rôle non autorisé, rediriger vers page d'erreur ou login
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Sinon afficher le contenu protégé
  return children;
}

export default ProtectedRoute;
