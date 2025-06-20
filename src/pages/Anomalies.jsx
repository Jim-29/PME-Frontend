import React, { useState } from "react";

export default function Anomalies() {
  const [search, setSearch] = useState("");
  const [machineFilter, setMachineFilter] = useState("all");
  const [page, setPage] = useState(1);
  const anomaliesParPage = 5;

  const anomalies = [
    {
      id: 1,
      machine: "Machine A",
      criticite: "critique",
      message: "Température trop élevée",
      recommandation: "Vérifier le système de refroidissement",
      date: "2025-06-20 09:30",
    },
    {
      id: 2,
      machine: "Machine B",
      criticite: "moyenne",
      message: "Vibration anormale détectée",
      recommandation: "Inspecter les roulements",
      date: "2025-06-20 10:00",
    },
    {
      id: 3,
      machine: "Machine C",
      criticite: "faible",
      message: "Pression trop basse",
      recommandation: "Vérifier les tuyaux et vannes",
      date: "2025-06-20 10:45",
    },
    {
      id: 4,
      machine: "Machine A",
      criticite: "critique",
      message: "Surchauffe moteur",
      recommandation: "Arrêter temporairement la machine",
      date: "2025-06-20 11:10",
    },
    {
      id: 5,
      machine: "Machine B",
      criticite: "moyenne",
      message: "Anomalie capteur de vibration",
      recommandation: "Réinitialiser le capteur",
      date: "2025-06-20 11:40",
    },
    {
      id: 6,
      machine: "Machine C",
      criticite: "faible",
      message: "Consommation énergétique anormale",
      recommandation: "Surveiller dans les prochaines heures",
      date: "2025-06-20 12:10",
    },
  ];

  const filtered = anomalies.filter((a) => {
    const matchMachine = machineFilter === "all" || a.machine === machineFilter;
    const matchSearch =
      a.message.toLowerCase().includes(search.toLowerCase()) ||
      a.recommandation.toLowerCase().includes(search.toLowerCase());
    return matchMachine && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / anomaliesParPage);
  const anomaliesAffichees = filtered.slice(
    (page - 1) * anomaliesParPage,
    page * anomaliesParPage
  );

  const uniqueMachines = [...new Set(anomalies.map((a) => a.machine))];
  const criticiteColors = {
    critique: "bg-red-500",
    moyenne: "bg-yellow-400",
    faible: "bg-green-500",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        📋 Anomalies détectées
      </h1>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
        />
        <select
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={machineFilter}
          onChange={(e) => {
            setMachineFilter(e.target.value);
            setPage(1); // reset page
          }}
        >
          <option value="all">Toutes les machines</option>
          {uniqueMachines.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-3">Machine</th>
              <th className="p-3">Message</th>
              <th className="p-3">Recommandation</th>
              <th className="p-3">Criticité</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {anomaliesAffichees.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{a.machine}</td>
                <td className="p-3">{a.message}</td>
                <td className="p-3">{a.recommandation}</td>
                <td className="p-3">
                  <span
                    className={`text-white px-2 py-1 rounded-full text-xs font-semibold ${
                      criticiteColors[a.criticite]
                    }`}
                  >
                    {a.criticite}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          ◀ Précédent
        </button>
        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
}
