import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const machines = [
  {
    id: 1,
    name: "Machine A",
    previous: { temperature: 70, vibration: 0.3, pressure: 1.1 },
    current: { temperature: 85, vibration: 0.6, pressure: 1.4 },
  },
  {
    id: 2,
    name: "Machine B",
    previous: { temperature: 90, vibration: 0.5, pressure: 1.6 },
    current: { temperature: 110, vibration: 0.9, pressure: 2.0 },
  },
];

function generateConseil(prev, curr) {
  const conseils = [];
  if (curr.temperature > prev.temperature + 10)
    conseils.push("⚠️ Température en forte hausse !");
  if (curr.vibration > prev.vibration + 0.2)
    conseils.push("⚠️ Vibration élevée détectée !");
  if (curr.pressure > prev.pressure + 0.3)
    conseils.push("⚠️ Pression en augmentation anormale !");
  if (conseils.length === 0)
    conseils.push("✅ État stable ou amélioration détectée.");
  return conseils;
}

export default function Reports() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedMachine = machines.find((m) => m.id === selectedId);
  const reportRef = useRef(null);

  const exportPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`rapport-${selectedMachine.name}.pdf`);
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        📝 Rapports de diagnostic
      </h1>

      <select
        onChange={(e) => setSelectedId(Number(e.target.value))}
        className="mb-6 p-2 border border-gray-300 rounded"
      >
        <option value="">-- Sélectionnez une machine --</option>
        {machines.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      {selectedMachine && (
        <div ref={reportRef} className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">{selectedMachine.name}</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">État précédent</h3>
              <p>Température : {selectedMachine.previous.temperature} °C</p>
              <p>Vibration : {selectedMachine.previous.vibration}</p>
              <p>Pression : {selectedMachine.previous.pressure} bar</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">État actuel</h3>
              <p>Température : {selectedMachine.current.temperature} °C</p>
              <p>Vibration : {selectedMachine.current.vibration}</p>
              <p>Pression : {selectedMachine.current.pressure} bar</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-red-600">Conseils</h3>
            <ul className="list-disc ml-6">
              {generateConseil(
                selectedMachine.previous,
                selectedMachine.current
              ).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedMachine && (
        <button
          onClick={exportPDF}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📄 Exporter en PDF
        </button>
      )}
    </div>
  );
}
