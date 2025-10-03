import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h6>Revisa todos los datos de EduConecta</h6>
        <h2>Dashboard del Administrador</h2>
      </div>
      <div className="main-container">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li>
                <Link to="usuarios">Usuarios</Link>
              </li>
              <li>
                <Link to="cursos">Cursos</Link>
              </li>
              <li>
                <Link to="materias">Materias</Link>
              </li>
              <li>
                <Link to="solicitudes">Solicitudes</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
