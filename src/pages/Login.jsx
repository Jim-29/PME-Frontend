import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const usersDB = [
  { username: "admin1", password: "1234", role: "administrateur" },
  { username: "super1", password: "1234", role: "superviseur" },
  { username: "tech1", password: "1234", role: "technicien" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("administrateur");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersDB.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === selectedRole
    );
    if (user) {
      login(user);
      navigate("/dashboard"); // Redirection unique vers dashboard
    } else {
      setError("Identifiants ou rôle invalides");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#24489a]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#24489a]">
          Bienvenue sur PME
          <br />
          Monitoring
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-[#24489a] mb-1">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#24489a]"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-[#24489a] mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#24489a]"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-[#24489a] mb-1">
              Rôle
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#24489a]"
            >
              <option value="administrateur">Administrateur</option>
              <option value="superviseur">Superviseur</option>
              <option value="technicien">Technicien</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#24489a] text-white py-3 rounded font-bold hover:bg-blue-900 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
