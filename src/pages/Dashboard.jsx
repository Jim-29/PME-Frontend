import React, { useState, useEffect } from "react";
import { FiThermometer, FiActivity, FiBarChart } from "react-icons/fi";
import { MdError, MdWarning, MdCheckCircle } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Fonction pour déterminer le niveau de criticité
function getStatus(temperature, vibration, pressure) {
  if (temperature > 100 || vibration > 0.8 || pressure > 1.8) return "rouge";
  if (temperature > 85 || vibration > 0.5 || pressure > 1.4) return "orange";
  return "vert";
}

// Carte affichant les données d’une machine
function MachineCard({ machine }) {
  const colors = {
    vert: "bg-green-500",
    orange: "bg-yellow-500",
    rouge: "bg-red-500",
  };

  const statusIcons = {
    vert: <MdCheckCircle className="inline-block mr-1" />,
    orange: <MdWarning className="inline-block mr-1" />,
    rouge: <MdError className="inline-block mr-1" />,
  };

  return (
    <div className="p-4 bg-white rounded shadow-md border">
      <h3 className="font-bold text-lg mb-2">{machine.name}</h3>
      <p>
        <FiThermometer className="inline mr-1" />
        Température : {machine.temperature} °C
      </p>
      <p>
        <FiActivity className="inline mr-1" />
        Vibration : {machine.vibration}
      </p>
      <p>
        <FiBarChart className="inline mr-1" />
        Pression : {machine.pressure} bar
      </p>
      <span
        className={`inline-flex items-center mt-3 px-3 py-1 rounded text-white font-semibold ${
          colors[machine.status]
        }`}
      >
        {statusIcons[machine.status]}
        {machine.status.toUpperCase()}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [machines, setMachines] = useState([
    {
      id: 1,
      name: "Machine A",
      temperature: 70,
      vibration: 0.3,
      pressure: 1.2,
      status: "vert",
    },
    {
      id: 2,
      name: "Machine B",
      temperature: 90,
      vibration: 0.6,
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

  const [filterMachine, setFilterMachine] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Mise à jour simulée des données toutes les 5 secondes
    const interval = setInterval(() => {
      setMachines((prevMachines) =>
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

  // Filtrer machines selon sélection
  const filteredMachines = machines.filter((m) => {
    return (
      (filterMachine === "all" || m.name === filterMachine) &&
      (filterStatus === "all" || m.status === filterStatus)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Tableau de bord - État des machines
      </h1>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={filterMachine}
          onChange={(e) => setFilterMachine(e.target.value)}
        >
          <option value="all">Toutes les machines</option>
          {machines.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Toutes les criticités</option>
          <option value="vert">Vert</option>
          <option value="orange">Orange</option>
          <option value="rouge">Rouge</option>
        </select>
      </div>

      {/* Graphique température par machine */}
      <div className="mb-10" style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={filteredMachines}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="temperature" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Liste des machines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredMachines.length === 0 ? (
          <p>Aucune machine ne correspond aux filtres sélectionnés.</p>
        ) : (
          filteredMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))
        )}
      </div>
    </div>
  );
}
