// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function getStatus(temperature, vibration, pressure) {
  if (temperature > 100 || vibration > 0.8 || pressure > 1.8) return "rouge";
  if (temperature > 85 || vibration > 0.5 || pressure > 1.4) return "orange";
  return "vert";
}

function MachineStatusCard({ machine }) {
  const statusColors = {
    vert: "bg-green-500",
    orange: "bg-yellow-500",
    rouge: "bg-red-500",
  };

  return (
    <div className="p-4 border rounded shadow mb-4 bg-white">
      <h3 className="font-bold text-lg mb-2">{machine.name}</h3>
      <p>Température : {machine.temperature}°C</p>
      <p>Vibration : {machine.vibration}</p>
      <p>Pression : {machine.pressure} bar</p>
      <span
        className={`inline-block px-3 py-1 text-white rounded mt-2 ${
          statusColors[machine.status] || "bg-gray-400"
        }`}
      >
        {machine.status.toUpperCase()}
      </span>
    </div>
  );
}

function Dashboard() {
  const [role] = useState("administrateur"); // À remplacer par contexte d'authentification réel

  const [machinesData, setMachinesData] = useState([
    {
      id: 1,
      name: "Machine A",
      temperature: 75,
      vibration: 0.3,
      pressure: 1.2,
      status: "vert",
    },
    {
      id: 2,
      name: "Machine B",
      temperature: 90,
      vibration: 0.5,
      pressure: 1.5,
      status: "orange",
    },
    {
      id: 3,
      name: "Machine C",
      temperature: 110,
      vibration: 0.9,
      pressure: 2,
      status: "rouge",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachinesData((prevMachines) =>
        prevMachines.map((machine) => {
          const newTemp = Math.min(
            120,
            Math.max(50, machine.temperature + (Math.random() * 10 - 5))
          );
          const newVib = Math.min(
            1.2,
            Math.max(0, machine.vibration + (Math.random() * 0.2 - 0.1))
          );
          const newPres = Math.min(
            2.5,
            Math.max(0.5, machine.pressure + (Math.random() * 0.3 - 0.15))
          );
          const newStatus = getStatus(newTemp, newVib, newPres);

          return {
            ...machine,
            temperature: parseFloat(newTemp.toFixed(1)),
            vibration: parseFloat(newVib.toFixed(2)),
            pressure: parseFloat(newPres.toFixed(2)),
            status: newStatus,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">PME Monitoring</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          <Link to="/admin" className="text-blue-600 font-medium">
            Dashboard
          </Link>
          <Link to="/anomalie" className="text-gray-700 hover:text-blue-600">
            Anomalies
          </Link>
          <Link to="/superviseur" className="text-gray-700 hover:text-blue-600">
            Superviseur
          </Link>
          <Link to="/" className="text-red-500 hover:underline mt-auto">
            Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Topbar */}
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Tableau de bord - {role.charAt(0).toUpperCase() + role.slice(1)}
          </h1>
        </header>

        {/* Contenu - liste des machines */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {machinesData.length === 0 ? (
            <p>Chargement des données...</p>
          ) : (
            machinesData.map((machine) => (
              <MachineStatusCard key={machine.id} machine={machine} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
