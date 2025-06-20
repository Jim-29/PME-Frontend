import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnomalyItem from "../components/AnomalyItem";

const anomaliesSimulees = [
  {
    id: 1,
    machine: "Machine A",
    type: "Température trop élevée",
    description:
      "La température a dépassé le seuil critique de 100°C pendant 5 minutes.",
    recommandation:
      "Vérifier le système de refroidissement et réduire la charge.",
    date: "2025-06-19 14:30",
  },
  {
    id: 2,
    machine: "Machine B",
    type: "Vibration anormale",
    description:
      "Les vibrations dépassent la norme, signe possible de déséquilibre mécanique.",
    recommandation: "Inspecter les pièces mobiles et équilibrer le rotor.",
    date: "2025-06-19 15:10",
  },
  {
    id: 3,
    machine: "Machine C",
    type: "Pression élevée",
    description:
      "Pression détectée au-dessus de la limite maximale recommandée.",
    recommandation: "Contrôler les valves et la pompe hydraulique.",
    date: "2025-06-19 16:00",
  },
];

function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    setAnomalies(anomaliesSimulees);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">PME Monitoring</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/anomalies" className="text-blue-600 font-medium">
            Alertes
          </Link>
          <Link to="/reports" className="text-gray-700 hover:text-blue-600">
            Rapports
          </Link>
          <Link to="/users" className="text-gray-700 hover:text-blue-600">
            Gestion utilisateurs
          </Link>
          <Link to="/" className="text-red-500 hover:underline mt-auto">
            Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Alertes - Anomalies détectées
          </h1>
        </header>

        {anomalies.length === 0 ? (
          <p>Aucune anomalie détectée.</p>
        ) : (
          <div className="space-y-6">
            {anomalies.map((anomaly) => (
              <AnomalyItem key={anomaly.id} anomaly={anomaly} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AnomaliesPage;
