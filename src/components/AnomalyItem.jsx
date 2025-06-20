// src/components/AnomalyItem.jsx
import React from "react";

export default function AnomalyItem({ anomaly }) {
  const criticiteColors = {
    Rouge: "bg-red-100 text-red-800 border-red-300",
    Orange: "bg-orange-100 text-orange-800 border-orange-300",
    Vert: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <div
      className={`p-4 border rounded-xl shadow-md ${
        criticiteColors[anomaly.criticite]
      }`}
    >
      <h3 className="text-lg font-semibold">{anomaly.machine}</h3>
      <p className="text-sm mt-1">🛠 {anomaly.type}</p>
      <p className="text-sm mt-1">📊 Criticité : {anomaly.criticite}</p>
      <p className="text-sm mt-1 italic">💡 {anomaly.recommandation}</p>
    </div>
  );
}
