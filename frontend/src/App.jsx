import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Materias from "./components/materias/Materias.jsx";
import FormUsuario from "./components/formUsuario/FormUsuario.jsx";
import FormProfesor from "./components/formProfesor/FormProfesor.jsx";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";

import "./components/adminDashboard/AdminDashboard.css";
import "./components/navbar/Navbar.css";
import "./components/materias/Materias.css";
import "./components/alert/Alert.css";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [profesores, setProfesores] = useState([]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="dashboard-grid">
        <Materias />
        <FormUsuario setUsuarios={setUsuarios} />
        <FormProfesor setProfesores={setProfesores} />
      </div>
      <AdminDashboard usuarios={usuarios} profesores={profesores} />
    </div>
  );
}

export default App;
