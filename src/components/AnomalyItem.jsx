// src/components/AnomalyItem.jsx
import React from "react";

function AnomalyItem({ anomaly }) {
  const { machine, type, description, recommandation, date } = anomaly;

  return (
    <div className="bg-white p-6 rounded shadow border-l-4 border-red-500">
      <h2 className="text-xl font-bold mb-2">
        {machine} - {type}
      </h2>
      <p className="mb-2 text-gray-700">{description}</p>
      <p className="mb-2 font-semibold text-red-600">
        Recommandation : {recommandation}
      </p>
      <p className="text-sm text-gray-500">Détectée le : {date}</p>
    </div>
  );
}

export default AnomalyItem;
