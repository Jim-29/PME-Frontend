import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Bienvenue sur PME Monitoring
        </h1>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-blue-800 font-semibold mb-1"
            >
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-blue-800 font-semibold mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition cursor-pointer"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
