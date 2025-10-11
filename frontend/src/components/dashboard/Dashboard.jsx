import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import Applications from "./applications/Applications.jsx";
import Classes from "./classes/Classes.jsx";
import Subjects from "./subjects/Subjects.jsx";
import Users from "./users/Users.jsx";

function Dashboard() {
  const [toggled, setToggled] = useState(false);
  const [activeSection, setActiveSection] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = (e) => {
    e.preventDefault();
    setToggled(!toggled);
  };

  //If this page is seen in a small screen, the sidebar is closed
  useEffect(() => {
    if (window.innerWidth <= 994) {
      setToggled(true);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h5>Administra todos los datos de EduConecta</h5>
        <h2>PANEL DE CONTROL</h2>
      </div>

      <div className="main-container">
        <aside id="sidebar-wrapper" className={toggled ? "collapsed" : ""}>
          <div className="toggle-btn" onClick={handleToggle}>
            <i className="fa fa-bars"></i>
          </div>

          <ul className="sidebar-nav">
            <li>
              <button
                className={activeSection === "usuarios" ? "active" : ""}
                onClick={() => setActiveSection("usuarios")}
              >
                <i className="fa fa-users"></i>
                <span>Usuarios</span>
              </button>
            </li>
            <li>
              <button
                className={activeSection === "clases" ? "active" : ""}
                onClick={() => setActiveSection("clases")}
              >
                <i className="fa fa-desktop"></i>
                <span>Clases</span>
              </button>
            </li>
            <li>
              <button
                className={activeSection === "materias" ? "active" : ""}
                onClick={() => setActiveSection("materias")}
              >
                <i className="fa fa-book"></i>
                <span>Materias</span>
              </button>
            </li>
            <li>
              <button
                className={activeSection === "solicitudes" ? "active" : ""}
                onClick={() => setActiveSection("solicitudes")}
              >
                <i className="fa fa-graduation-cap"></i>
                <span>Solicitudes</span>
              </button>
            </li>
          </ul>
        </aside>

        <main className="dashboard-content">
          <div className="search-bar mb-3">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {activeSection === "usuarios" && <Users searchTerm={searchTerm} />}
          {activeSection === "clases" && <Classes searchTerm={searchTerm} />}
          {activeSection === "materias" && <Subjects searchTerm={searchTerm} />}
          {activeSection === "solicitudes" && <Applications searchTerm={searchTerm} />}
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
