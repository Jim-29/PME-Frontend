import React, { useState } from "react";

// Données fictives des utilisateurs
const initialUsers = [
  { id: 1, nom: "Alice", role: "administrateur" },
  { id: 2, nom: "Bob", role: "superviseur" },
  { id: 3, nom: "Charlie", role: "technicien" },
];

// Simuler l'utilisateur connecté
const currentUser = { id: 99, nom: "AdminActuel", role: "administrateur" };

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauRole, setNouveauRole] = useState("technicien");

  const handleAjouter = () => {
    if (!nouveauNom) return;
    const newUser = {
      id: Date.now(),
      nom: nouveauNom,
      role: nouveauRole,
    };
    setUsers([...users, newUser]);
    setNouveauNom("");
  };

  const handleSupprimer = (id) => {
    if (currentUser.role !== "administrateur") {
      alert("Accès refusé : seuls les administrateurs peuvent supprimer.");
      return;
    }
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Nom de l'utilisateur"
          value={nouveauNom}
          onChange={(e) => setNouveauNom(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <select
          value={nouveauRole}
          onChange={(e) => setNouveauRole(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        >
          <option value="technicien">Technicien</option>
          <option value="superviseur">Superviseur</option>
          <option value="administrateur">Administrateur</option>
        </select>
        {currentUser.role === "administrateur" ? (
          <button
            onClick={handleAjouter}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        ) : (
          <span className="text-red-500">
            Seul un administrateur peut ajouter
          </span>
        )}
      </div>

      <table className="w-full table-auto bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Rôle</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-4 py-2">{u.nom}</td>
              <td className="px-4 py-2 capitalize">{u.role}</td>
              <td className="px-4 py-2 text-center">
                {currentUser.role === "administrateur" ? (
                  <button
                    onClick={() => handleSupprimer(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                ) : (
                  <span className="text-gray-400">Aucune action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
