import React, { useState, useMemo } from "react";

const historiqueData = [
  {
    id: 1,
    machine: "Machine A",
    date: "2025-06-19",
    type: "Alerte",
    description: "Température élevée détectée",
  },
  {
    id: 2,
    machine: "Machine B",
    date: "2025-06-18",
    type: "Intervention",
    description: "Réparation vibration excessive",
  },
  {
    id: 3,
    machine: "Machine C",
    date: "2025-06-17",
    type: "Diagnostic",
    description: "Analyse pression normale",
  },
];

const machinesList = [...new Set(historiqueData.map((item) => item.machine))];
const typesList = [...new Set(historiqueData.map((item) => item.type))];

export default function Historique() {
  const [filterMachine, setFilterMachine] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return historiqueData.filter((item) => {
      const matchesMachine =
        filterMachine === "all" || item.machine === filterMachine;
      const matchesType = filterType === "all" || item.type === filterType;
      const matchesDate = !filterDate || item.date === filterDate;
      const matchesSearch =
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.machine.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      return matchesMachine && matchesType && matchesDate && matchesSearch;
    });
  }, [filterMachine, filterType, filterDate, search]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Historique des diagnostics et interventions
      </h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={filterMachine}
          onChange={(e) => setFilterMachine(e.target.value)}
        >
          <option value="all">Toutes les machines</option>
          {machinesList.map((machine) => (
            <option key={machine} value={machine}>
              {machine}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous types</option>
          {typesList.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border rounded p-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <input
          type="text"
          className="border rounded p-2 flex-grow min-w-[200px]"
          placeholder="Recherche libre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Machine</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                Aucun résultat
              </td>
            </tr>
          ) : (
            filteredData.map(({ id, date, machine, type, description }) => (
              <tr key={id} className="hover:bg-gray-100">
                <td className="p-3 border">{date}</td>
                <td className="p-3 border">{machine}</td>
                <td className="p-3 border">{type}</td>
                <td className="p-3 border">{description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
