import React from "react";

const fakeData = [
  {
    id: 1,
    machine: "Machine A",
    temperature: 78,
    vibration: 0.5,
    pression: 3.1,
  },
  {
    id: 2,
    machine: "Machine B",
    temperature: 95,
    vibration: 1.2,
    pression: 4.5,
  },
  {
    id: 3,
    machine: "Machine C",
    temperature: 50,
    vibration: 0.2,
    pression: 2.0,
  },
];

function getCriticityColor(value) {
  if (value < 60) return "bg-green-100 text-green-800";
  if (value < 85) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fakeData.map((machine) => (
          <div
            key={machine.id}
            className="bg-white rounded-xl shadow p-5 space-y-3"
          >
            <h2 className="text-xl font-semibold text-blue-800">
              {machine.machine}
            </h2>
            <div className="flex justify-between items-center">
              <span>Température</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getCriticityColor(
                  machine.temperature
                )}`}
              >
                {machine.temperature} °C
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Vibration</span>
              <span className="text-gray-700 font-semibold">
                {machine.vibration} Hz
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pression</span>
              <span className="text-gray-700 font-semibold">
                {machine.pression} bars
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
