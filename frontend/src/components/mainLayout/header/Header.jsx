import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


//FALTA AGREGAR:
// - Cambio cuando el usuario tenga la sesión iniciada (nuevo componente o mismo con condiciones?)
//      - Avatar de usuario
//      - Desplegable cuando se apriete (Mi perfil y Cerrar Sesión)
function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // if we go over 80px down, we activate the sticky menu
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`header-area ${isSticky ? "header-sticky" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <button
                className="logo"
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                EduConecta
              </button>
              <ul className={`nav ${menuOpen ? "active" : ""}`}>
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/");
                      setMenuOpen(false);
                    }}
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/courses");
                      setMenuOpen(false);
                    }}
                  >
                    Cursos
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/teachers");
                      setMenuOpen(false);
                    }}
                  >
                    Docentes
                  </button>
                </li>

                <li className="has-sub">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/applyNow");
                      setMenuOpen(false);
                    }}
                  >
                    Preguntas Frecuentes
                  </button>
                  {/* <ul className="sub-menu">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/meetings");
                          setMenuOpen(false);
                        }}
                      >
                        Upcoming Meetings
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link"
                        onClick={() => {
                          navigate("/meetings");
                          setMenuOpen(false);
                        }}
                      >
                        Meeting Details
                      </button>
                    </li>
                  </ul> */}
                {/* </li> */}
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/contact");
                      setMenuOpen(false);
                    }}
                  >
                    Contacto
                  </button>
                </li>
              </ul>
              <button
                className={`menu-trigger ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <span></span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
