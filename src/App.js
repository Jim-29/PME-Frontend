import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // à créer
import Anomalies from "./pages/Anomalies"; // à créer
import SuperviseurPage from "./pages/SuperviseurPage"; // à créer

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/technicien" element={<Anomalies />} />
        <Route path="/superviseur" element={<SuperviseurPage />} />
      </Routes>
    </Router>
  );
}

export default App;
